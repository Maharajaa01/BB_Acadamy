"use client"                     // Marks this as a client component
export const dynamic = "force-dynamic"  // Forces dynamic rendering, disables static generation

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, FileText, BookOpen, Eye, Calendar as CalendarIcon, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

// ...rest of your code remains the same


interface Note {
  id: string
  title: string
  subject: string
  standard: string
  group?: string
  downloadUrl: string
  description?: string
}

interface QuestionPaper {
  id: string
  title: string
  standard: string
  year: string
  examType: string
  subject: string
  viewUrl: string
  downloadUrl: string
}

const standards = [
  { value: "6", label: "6th Standard" },
  { value: "7", label: "7th Standard" },
  { value: "8", label: "8th Standard" },
  { value: "9", label: "9th Standard" },
  { value: "10", label: "10th Standard" },
  { value: "11", label: "11th Standard" },
  { value: "12", label: "12th Standard" },
]

const groups = [
  { value: "science", label: "Science Group" },
  { value: "commerce", label: "Accounts/Commerce Group" },
]



const examTypes = [
  { value: "quarterly", label: "Quarterly" },
  { value: "half-yearly", label: "Half-Yearly" },
  { value: "annual", label: "Annual" },
]

const generateYearOptions = () => {
  const years = []
  for (let year = 2026; year >= 2017; year--) {
    years.push({ value: year.toString(), label: year.toString() })
  }
  return years
}

export function NotesPage() {
  const [selectedStandard, setSelectedStandard] = useState<string>("")
  const [selectedGroup, setSelectedGroup] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")

  // Notes State
  const [notes, setNotes] = useState<Note[]>([])
  const [loadingNotes, setLoadingNotes] = useState(false)
  const [errorNotes, setErrorNotes] = useState<string | null>(null)

  // Subject State
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([])

  // Question Papers State
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([])
  const [qpStandard, setQpStandard] = useState<string>("")
  const [qpFromYear, setQpFromYear] = useState<string>("")
  const [qpToYear, setQpToYear] = useState<string>("")
  const [qpExamType, setQpExamType] = useState<string>("")
  const [qpLoading, setQpLoading] = useState(false)
  const [errorQP, setErrorQP] = useState<string | null>(null)

  // Pagination State
  const [notesPage, setNotesPage] = useState(1)
  const [qpPage, setQpPage] = useState(1)
  const ITEMS_PER_PAGE = 9

  const handleStandardChange = (value: string) => {
    setSelectedStandard(value)
    setSelectedGroup("")
    setSelectedSubject("")
  }

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value)
    setSelectedSubject("")
  }

  // Helper function to build headers
  const getHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    // Using environment variable for token if available
    const token = process.env.NEXT_PUBLIC_FRAPPE_API_TOKEN
    if (token) {
      headers["Authorization"] = `token ${token}`
    }
    return headers
  }



  useEffect(() => {
    fetchSubjects()
  }, [selectedStandard]) // Re-fetch subjects when standard changes

  useEffect(() => {
    fetchNotes()
  }, [selectedStandard, selectedSubject, selectedGroup, notesPage]) // Add notesPage dependency

  useEffect(() => {
    fetchQuestionPapers()
  }, [qpStandard, qpExamType, qpFromYear, qpToYear, qpPage]) // Add qpPage dependency

  async function fetchSubjects() {
    if (!selectedStandard) {
      setAvailableSubjects([])
      return
    }
    try {
      // Fetch subjects filtered by standard
      const filters = [["standard", "=", selectedStandard]]
      const params = new URLSearchParams({
        fields: JSON.stringify(["subject_name"]), // Fetch subject_name
        filters: JSON.stringify(filters),
        limit_page_length: "100"
      })

      const response = await fetch(`/api/resource/Subject?${params}`, {
        headers: getHeaders()
      })
      if (response.ok) {
        const data = await response.json()
        const subjects = (data.data || []).map((item: any) => item.subject_name)
        setAvailableSubjects(subjects)
      }
    } catch (error) {
      console.error("Failed to fetch subjects:", error)
    }
  }

  // Reset page when filters change
  useEffect(() => {
    setNotesPage(1)
  }, [selectedStandard, selectedSubject, selectedGroup])

  useEffect(() => {
    setQpPage(1)
  }, [qpStandard, qpExamType, qpFromYear, qpToYear])


  async function fetchNotes() {
    setLoadingNotes(true)
    setErrorNotes(null)
    try {
      const filters = [
        ["type", "=", "Note"],
        ["is_published", "=", 1]
      ]

      if (selectedStandard) {
        filters.push(["standard", "=", selectedStandard])
      }

      if (selectedSubject) {
        filters.push(["subject", "=", selectedSubject])
      }

      if (selectedGroup) {
        filters.push(["group", "=", selectedGroup])
      }

      const params = new URLSearchParams({
        fields: JSON.stringify(["name", "title", "subject", "standard", "group", "file_url", "description"]),
        filters: JSON.stringify(filters),
        limit_page_length: ITEMS_PER_PAGE.toString(),
        limit_start: ((notesPage - 1) * ITEMS_PER_PAGE).toString(),
        order_by: "creation desc"
      })

      const response = await fetch(`/api/resource/Study Material?${params}`, {
        headers: getHeaders()
      })

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Unauthorized: Please check your API token")
        }
        throw new Error("Failed to fetch notes")
      }

      const data = await response.json()
      // Map Frappe response to Note interface
      const fetchedNotes: Note[] = (data.data || []).map((item: any) => ({
        id: item.name,
        title: item.title,
        subject: item.subject,
        standard: item.standard,
        group: item.group,
        downloadUrl: item.file_url, // Construct full URL if needed
        description: item.description
      }))

      setNotes(fetchedNotes)
    } catch (err: any) {
      console.error("Error fetching notes:", err)
      setErrorNotes(err.message)
      // Fallback for dev/demo if API fails
      if (process.env.NODE_ENV === "development") {
        // setNotes(mockNotes) // Uncomment to use mock data
      }
    } finally {
      setLoadingNotes(false)
    }
  }

  async function fetchQuestionPapers() {
    if (!qpStandard || !qpFromYear || !qpToYear || !qpExamType) {
      setQuestionPapers([])
      return
    }

    setQpLoading(true)
    setErrorQP(null)
    try {
      const filters = [
        ["type", "=", "Question Paper"],
        ["standard", "=", qpStandard],
        ["exam_type", "=", qpExamType], // Note: Frappe fieldname 'exam_type'
        ["year", ">=", qpFromYear],
        ["year", "<=", qpToYear],
        ["is_published", "=", 1]
      ]

      const params = new URLSearchParams({
        fields: JSON.stringify(["name", "title", "standard", "year", "exam_type", "subject", "file_url"]),
        filters: JSON.stringify(filters),
        limit_page_length: ITEMS_PER_PAGE.toString(),
        limit_start: ((qpPage - 1) * ITEMS_PER_PAGE).toString(),
        order_by: "year desc"
      })

      const response = await fetch(`/api/resource/Study Material?${params}`, {
        headers: getHeaders()
      })

      if (!response.ok) throw new Error("Failed to fetch question papers")

      const data = await response.json()

      const fetchedQPs: QuestionPaper[] = (data.data || []).map((item: any) => ({
        id: item.name,
        title: item.title,
        subject: item.subject,
        standard: item.standard,
        year: item.year,
        examType: item.exam_type,
        downloadUrl: item.file_url
      }))

      setQuestionPapers(fetchedQPs)
    } catch (err: any) {
      console.error("Error fetching QPs:", err)
      setErrorQP(err.message)
    } finally {
      setQpLoading(false)
    }
  }

  const handleDownload = (url: string, title: string) => {
    console.log(`Downloading: ${title} from ${url}`)
    // In a real application, you might open the URL in a new tab or trigger a download
    window.open(url, '_blank')
  }

  const requiresGroup = selectedStandard === "11" || selectedStandard === "12"

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-academy-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-academy-orange/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 animate-fade-up">Study Materials</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-up delay-100">
            Access our comprehensive collection of notes and question papers to excel in your studies.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-14 bg-white shadow-xl rounded-full p-1 mb-12 animate-fade-up delay-200">
            <TabsTrigger
              value="notes"
              className="rounded-full text-base font-medium data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 transition-all duration-300"
            >
              Notes
            </TabsTrigger>
            <TabsTrigger
              value="question-papers"
              className="rounded-full text-base font-medium data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 transition-all duration-300"
            >
              Question Papers
            </TabsTrigger>
          </TabsList>

          {/* NOTES TAB */}
          <TabsContent value="notes" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Filters */}
            <Card className="bg-white/80 backdrop-blur-md border-none shadow-lg sticky top-20 z-30">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Standard</Label>
                    <Select value={selectedStandard} onValueChange={setSelectedStandard}>
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Select Standard" />
                      </SelectTrigger>
                      <SelectContent>
                        {standards.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {(selectedStandard === "11" || selectedStandard === "12") && (
                    <div className="space-y-2 animate-in zoom-in-50 duration-300">
                      <Label>Group</Label>
                      <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select Group" />
                        </SelectTrigger>
                        <SelectContent>
                          {groups.map((g) => (
                            <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSubjects.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Grid */}
            {loadingNotes ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-48 animate-pulse bg-gray-100 border-none" />
                ))}
              </div>
            ) : errorNotes ? (
              <div className="text-center py-20">
                <p className="text-red-500">{errorNotes}</p>
                <Button variant="outline" onClick={fetchNotes} className="mt-4">Retry</Button>
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-academy-orange/10 text-academy-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No notes found</h3>
                <p className="text-gray-500">Try changing your filters to see more results.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes.map((note, idx) => (
                    <Card key={note.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-none shadow-md overflow-hidden glass" style={{ animationDelay: `${idx * 100}ms` }}>
                      <CardHeader className="bg-gradient-to-br from-orange-50 to-white border-b border-orange-100 p-6">
                        <div className="flex justify-between items-start">
                          <Badge variant="secondary" className="bg-white/80 backdrop-blur text-academy-orange hover:bg-white shadow-sm border-orange-100">
                            {note.subject}
                          </Badge>
                          <FileText className="h-5 w-5 text-gray-400 group-hover:text-academy-orange transition-colors" />
                        </div>
                        <CardTitle className="mt-4 text-xl line-clamp-2 group-hover:text-academy-orange transition-colors">
                          {note.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-sm text-gray-500 mb-6 line-clamp-3">
                          {note.description || "Comprehensive update for standard " + note.standard}
                        </p>
                        <Button
                          className="w-full bg-academy-black group-hover:bg-academy-orange text-white transition-all duration-300 shadow-lg group-hover:shadow-orange-200"
                          onClick={() => handleDownload(note.downloadUrl, note.title)}
                        >
                          <Download className="mr-2 h-4 w-4" /> Download PDF
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls for Notes */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setNotesPage(p => Math.max(1, p - 1))}
                    disabled={notesPage === 1}
                    className="border-academy-orange text-academy-orange hover:bg-orange-50"
                  >
                    Previous
                  </Button>
                  <span className="text-sm font-medium text-gray-600">Page {notesPage}</span>
                  <Button
                    variant="outline"
                    onClick={() => setNotesPage(p => p + 1)}
                    disabled={notes.length < ITEMS_PER_PAGE}
                    className="border-academy-orange text-academy-orange hover:bg-orange-50"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          {/* QUESTION PAPERS TAB */}
          <TabsContent value="question-papers" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Filters */}
            <Card className="bg-white/80 backdrop-blur-md border-none shadow-lg sticky top-20 z-30">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label>Standard</Label>
                    <Select value={qpStandard} onValueChange={setQpStandard}>
                      <SelectTrigger className="glass-input"><SelectValue /></SelectTrigger>
                      <SelectContent>{standards.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Exam Type</Label>
                    <Select value={qpExamType} onValueChange={setQpExamType}>
                      <SelectTrigger className="glass-input"><SelectValue /></SelectTrigger>
                      <SelectContent>{examTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>From Year</Label>
                    <Select value={qpFromYear} onValueChange={setQpFromYear}>
                      <SelectTrigger className="glass-input"><SelectValue placeholder="Pick a year" /></SelectTrigger>
                      <SelectContent>
                        {generateYearOptions().map(year => (
                          <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>To Year</Label>
                    <Select value={qpToYear} onValueChange={setQpToYear}>
                      <SelectTrigger className="glass-input"><SelectValue placeholder="Pick a year" /></SelectTrigger>
                      <SelectContent>
                        {generateYearOptions().map(year => (
                          <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QP List */}
            {qpLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}
              </div>
            ) : errorQP ? (
              <p className="text-red-500 text-center">{errorQP}</p>
            ) : questionPapers.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
                <p className="text-gray-500">No question papers found.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  {questionPapers.map((qp, idx) => (
                    <Card key={qp.id} className="group hover:shadow-lg transition-all duration-300 border-none shadow-sm glass overflow-hidden" style={{ animationDelay: `${idx * 100}ms` }}>
                      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-academy-orange group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-academy-black group-hover:text-academy-orange transition-colors">{qp.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{qp.standard}</Badge>
                              <Badge variant="outline" className="text-xs">{qp.subject}</Badge>
                              <Badge variant="outline" className="text-xs">{qp.year}</Badge>
                              <Badge className="bg-academy-black text-xs">{qp.examType}</Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="hover:bg-orange-50 text-academy-orange w-full md:w-auto"
                          onClick={() => handleDownload(qp.downloadUrl, qp.title)}
                        >
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls for QP */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setQpPage(p => Math.max(1, p - 1))}
                    disabled={qpPage === 1}
                    className="border-academy-orange text-academy-orange hover:bg-orange-50"
                  >
                    Previous
                  </Button>
                  <span className="text-sm font-medium text-gray-600">Page {qpPage}</span>
                  <Button
                    variant="outline"
                    onClick={() => setQpPage(p => p + 1)}
                    disabled={questionPapers.length < ITEMS_PER_PAGE}
                    className="border-academy-orange text-academy-orange hover:bg-orange-50"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>


      </div>
    </div>
  )
}
