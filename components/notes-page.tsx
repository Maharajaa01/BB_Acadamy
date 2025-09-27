"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, FileText, BookOpen, Eye, Calendar, GraduationCap } from "lucide-react"

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

const subjectsByStandard = {
  "6": ["Tamil", "English", "Maths", "Science", "Social Science"],
  "7": ["Tamil", "English", "Maths", "Science", "Social Science"],
  "8": ["Tamil", "English", "Maths", "Science", "Social Science"],
  "9": ["Tamil", "English", "Maths", "Science", "Social Science"],
  "10": ["Tamil", "English", "Maths", "Science", "Social Science"],
}

const groups = [
  { value: "science", label: "Science Group" },
  { value: "commerce", label: "Accounts/Commerce Group" },
]

const subjectsByGroup = {
  science: ["English", "Tamil", "Maths", "Physics", "Chemistry", "Computer Science", "Biology"],
  commerce: ["Tamil", "English", "Probability", "Accounts", "Commerce", "Economics"],
}

const examTypes = [
  { value: "quarterly", label: "Quarterly" },
  { value: "half-yearly", label: "Half-Yearly" },
  { value: "annual", label: "Annual" },
]

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= 2015; year--) {
    years.push({ value: year.toString(), label: year.toString() })
  }
  return years
}

export function NotesPage() {
  const [selectedStandard, setSelectedStandard] = useState<string>("")
  const [selectedGroup, setSelectedGroup] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([])
  const [qpStandard, setQpStandard] = useState<string>("")
  const [qpFromYear, setQpFromYear] = useState<string>("")
  const [qpToYear, setQpToYear] = useState<string>("")
  const [qpExamType, setQpExamType] = useState<string>("")
  const [qpLoading, setQpLoading] = useState(false)

  const getAvailableSubjects = () => {
    if (!selectedStandard) return []

    if (selectedStandard === "11" || selectedStandard === "12") {
      if (!selectedGroup) return []
      return subjectsByGroup[selectedGroup as keyof typeof subjectsByGroup] || []
    }

    return subjectsByStandard[selectedStandard as keyof typeof subjectsByStandard] || []
  }

  const handleStandardChange = (value: string) => {
    setSelectedStandard(value)
    setSelectedGroup("")
    setSelectedSubject("")
  }

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value)
    setSelectedSubject("")
  }

  const fetchNotes = async () => {
    if (!selectedStandard || !selectedSubject) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        standard: selectedStandard,
        subject: selectedSubject,
        ...(selectedGroup && { group: selectedGroup }),
      })

      const response = await fetch(`/api/resource/Notes?${params}`)

      if (!response.ok) {
        throw new Error("Failed to fetch notes")
      }

      const data = await response.json()
      setNotes(data.notes || [])
    } catch (err) {
      setError("Failed to load notes. Please try again.")
      console.error("Error fetching notes:", err)
      // Mock data for demonstration
      setNotes([
        {
          id: "1",
          title: `Chapter 1: Introduction to ${selectedSubject}`,
          subject: selectedSubject,
          standard: selectedStandard,
          group: selectedGroup,
          downloadUrl: "#",
          description: `Comprehensive notes covering basic ${selectedSubject.toLowerCase()} concepts and problem-solving techniques.`,
        },
        {
          id: "2",
          title: `Chapter 2: Advanced ${selectedSubject}`,
          subject: selectedSubject,
          standard: selectedStandard,
          group: selectedGroup,
          downloadUrl: "#",
          description: `Detailed explanation of advanced topics with practical examples and applications.`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchQuestionPapers = async () => {
    if (!qpStandard || !qpFromYear || !qpToYear || !qpExamType) return

    setQpLoading(true)

    try {
      const params = new URLSearchParams({
        standard: qpStandard,
        fromYear: qpFromYear,
        toYear: qpToYear,
        examType: qpExamType,
      })

      const response = await fetch(`/api/resource/QuestionPapers?${params}`)
      const data = await response.json()
      setQuestionPapers(data.questionPapers || [])
    } catch (err) {
      console.error("Error fetching question papers:", err)
      // Mock data for demonstration
      setQuestionPapers([
        {
          id: "1",
          title: `${qpStandard}th Physics ${qpExamType} ${qpFromYear}`,
          standard: qpStandard,
          year: qpFromYear,
          examType: qpExamType,
          subject: "Physics",
          viewUrl: "#",
          downloadUrl: "#",
        },
        {
          id: "2",
          title: `${qpStandard}th Mathematics ${qpExamType} ${qpToYear}`,
          standard: qpStandard,
          year: qpToYear,
          examType: qpExamType,
          subject: "Mathematics",
          viewUrl: "#",
          downloadUrl: "#",
        },
      ])
    } finally {
      setQpLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [selectedStandard, selectedSubject, selectedGroup])

  useEffect(() => {
    fetchQuestionPapers()
  }, [qpStandard, qpFromYear, qpToYear, qpExamType])

  const handleDownload = (item: Note | QuestionPaper, type: string) => {
    console.log(`Downloading ${type}:`, item.title)
    alert(`Downloading: ${item.title}`)
  }

  const availableSubjects = getAvailableSubjects()
  const requiresGroup = selectedStandard === "11" || selectedStandard === "12"

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-academy-black mb-4">Study Materials</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Access comprehensive study materials, notes, and question papers for all subjects and standards
          </p>
          <div className="w-24 h-1 bg-academy-orange mx-auto mt-4"></div>
        </div>

        {/* Notes Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-academy-black mb-6 sm:mb-8 text-center">Study Notes</h2>

          {/* Notes Filters */}
          <Card className="mb-6 sm:mb-8 border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-academy-black text-lg sm:text-xl">
                <BookOpen className="h-5 w-5 text-academy-orange" />
                Select Your Course
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Standard Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Standard</label>
                  <Select value={selectedStandard} onValueChange={handleStandardChange}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Choose your standard" />
                    </SelectTrigger>
                    <SelectContent>
                      {standards.map((standard) => (
                        <SelectItem key={standard.value} value={standard.value}>
                          {standard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Group Selection (for 11th and 12th only) */}
                {requiresGroup && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Group</label>
                    <Select value={selectedGroup} onValueChange={handleGroupChange}>
                      <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder="Choose your group" />
                      </SelectTrigger>
                      <SelectContent>
                        {groups.map((group) => (
                          <SelectItem key={group.value} value={group.value}>
                            {group.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                    disabled={!selectedStandard || (requiresGroup && !selectedGroup)}
                  >
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Choose your subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubjects.map((subject) => (
                        <SelectItem key={subject.toLowerCase().replace(" ", "-")} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Content */}
          {loading && (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-academy-orange"></div>
              <p className="mt-4 text-gray-600">Loading notes...</p>
            </div>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50 mb-6">
              <CardContent className="p-4 sm:p-6 text-center">
                <p className="text-red-600 text-sm sm:text-base">{error}</p>
                <Button onClick={fetchNotes} className="mt-4 bg-transparent" variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {!loading && !error && notes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {notes.map((note) => (
                <Card
                  key={note.id}
                  className="border-2 border-gray-200 hover:border-academy-orange hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-start gap-3 text-base sm:text-lg">
                      <FileText className="h-5 w-5 text-academy-orange flex-shrink-0 mt-1" />
                      <span className="text-academy-black text-balance leading-tight">{note.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">Subject:</span>
                        <span>{note.subject}</span>
                      </div>
                      {note.description && (
                        <p className="text-sm text-gray-600 text-pretty line-clamp-2">{note.description}</p>
                      )}
                      <Button
                        onClick={() => handleDownload(note, "note")}
                        className="w-full bg-academy-orange hover:bg-orange-600 text-white h-10 sm:h-11"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading &&
            !error &&
            notes.length === 0 &&
            selectedStandard &&
            selectedSubject &&
            (!requiresGroup || selectedGroup) && (
              <Card className="border-gray-200">
                <CardContent className="p-8 sm:p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Notes Available</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    No study notes are currently available for the selected criteria.
                  </p>
                </CardContent>
              </Card>
            )}

          {(!selectedStandard || !selectedSubject || (requiresGroup && !selectedGroup)) && (
            <Card className="border-gray-200">
              <CardContent className="p-8 sm:p-12 text-center">
                <BookOpen className="h-12 w-12 text-academy-orange mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select Your Course</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Please select all required fields to view available notes.
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Question Papers Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-academy-black mb-6 sm:mb-8 text-center">
            Question Papers
          </h2>

          {/* Question Papers Filters */}
          <Card className="mb-6 sm:mb-8 border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-academy-black text-lg sm:text-xl">
                <GraduationCap className="h-5 w-5 text-academy-orange" />
                Filter Question Papers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Standard</label>
                  <Select value={qpStandard} onValueChange={setQpStandard}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select standard" />
                    </SelectTrigger>
                    <SelectContent>
                      {standards.map((standard) => (
                        <SelectItem key={standard.value} value={standard.value}>
                          {standard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Year</label>
                  <Select value={qpFromYear} onValueChange={setQpFromYear}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="From year" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateYearOptions().map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Year</label>
                  <Select value={qpToYear} onValueChange={setQpToYear}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="To year" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateYearOptions().map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                  <Select value={qpExamType} onValueChange={setQpExamType}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      {examTypes.map((examType) => (
                        <SelectItem key={examType.value} value={examType.value}>
                          {examType.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Papers Content */}
          {qpLoading && (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-academy-orange"></div>
              <p className="mt-4 text-gray-600">Loading question papers...</p>
            </div>
          )}

          {!qpLoading && questionPapers.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {questionPapers.map((paper) => (
                <Card
                  key={paper.id}
                  className="border-2 border-gray-200 hover:border-academy-orange hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-start gap-3 text-base sm:text-lg">
                      <Calendar className="h-5 w-5 text-academy-orange flex-shrink-0 mt-1" />
                      <span className="text-academy-black text-balance leading-tight">{paper.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded">{paper.subject}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{paper.year}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded capitalize">{paper.examType}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 h-10 sm:h-11 bg-transparent">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                            <DialogHeader>
                              <DialogTitle>{paper.title}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                              <p className="text-gray-600">Question paper preview would appear here</p>
                              <p className="text-sm text-gray-500 mt-2">PDF or image preview functionality</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          onClick={() => handleDownload(paper, "question paper")}
                          className="flex-1 bg-academy-orange hover:bg-orange-600 text-white h-10 sm:h-11"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!qpLoading && questionPapers.length === 0 && qpStandard && qpFromYear && qpToYear && qpExamType && (
            <Card className="border-gray-200">
              <CardContent className="p-8 sm:p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Question Papers Found</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  No question papers are available for the selected criteria.
                </p>
              </CardContent>
            </Card>
          )}

          {(!qpStandard || !qpFromYear || !qpToYear || !qpExamType) && (
            <Card className="border-gray-200">
              <CardContent className="p-8 sm:p-12 text-center">
                <GraduationCap className="h-12 w-12 text-academy-orange mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Filter Question Papers</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Please select all filter criteria to view available question papers.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
