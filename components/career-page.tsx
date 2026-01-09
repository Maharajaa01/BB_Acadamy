"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Briefcase, MapPin, Clock, Users, FileText, Upload, X } from "lucide-react"

interface Job {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  requiredSkills: string[]
  location: string
  type: string
  experience: string
  postedDate: string
}

interface ApplicationForm {
  name: string
  email: string
  phone: string
  resume: File | null
}

export function CareerPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationForm, setApplicationForm] = useState<ApplicationForm>({
    name: "",
    email: "",
    phone: "",
    resume: null,
  })
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchJobs()
  }, [])

  // Helper function to build headers
  const getHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    const token = process.env.NEXT_PUBLIC_FRAPPE_API_TOKEN
    if (token) {
      headers["Authorization"] = `token ${token}`
    }
    return headers
  }

  const fetchJobs = async () => {
    try {
      const filters = [["status", "=", "Open"]]
      const params = new URLSearchParams({
        fields: JSON.stringify(["name", "title", "short_description", "description", "skills", "location", "job_type", "experience", "posted_date"]),
        filters: JSON.stringify(filters),
        order_by: "posted_date desc"
      })

      const response = await fetch(`/api/resource/Job Opening?${params}`, {
        headers: getHeaders()
      })

      if (response.ok) {
        const data = await response.json()
        const mappedJobs: Job[] = (data.data || []).map((item: any) => ({
          id: item.name,
          title: item.title,
          shortDescription: item.short_description,
          fullDescription: item.description,
          requiredSkills: item.skills ? item.skills.split(",").map((s: string) => s.trim()) : [],
          location: item.location,
          type: item.job_type,
          experience: item.experience,
          postedDate: item.posted_date
        }))
        setJobs(mappedJobs)
      } else {
        throw new Error("Failed to fetch jobs")
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
      toast({
        title: "Error",
        description: "Failed to load job listings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      // Check file type
      const allowedTypes = [".pdf", ".doc", ".docx"]
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
      if (!allowedTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive",
        })
        return
      }

      setApplicationForm((prev) => ({ ...prev, resume: file }))
    }
  }

  const removeFile = () => {
    setApplicationForm((prev) => ({ ...prev, resume: null }))
  }

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedJob) return

    setSubmitting(true)
    try {
      let fileUrl = ""

      // 1. Upload Resume if exists
      if (applicationForm.resume) {
        const formData = new FormData()
        formData.append("file", applicationForm.resume)
        formData.append("is_private", "1") // Keep resumes private ideally

        // Note: Do not rely on getHeaders() for FormData as browser sets Content-Type boundary automatically
        const uploadHeaders: Record<string, string> = {}
        const token = process.env.NEXT_PUBLIC_FRAPPE_API_TOKEN
        if (token) uploadHeaders["Authorization"] = `token ${token}`

        const uploadRes = await fetch("/api/method/upload_file", {
          method: "POST",
          headers: uploadHeaders,
          body: formData,
        })

        if (!uploadRes.ok) throw new Error("Resume upload failed")
        const uploadData = await uploadRes.json()
        fileUrl = uploadData.message.file_url
      }

      // 2. Create Job Applicant
      const payload = {
        applicant_name: applicationForm.name,
        email_id: applicationForm.email,
        phone: applicationForm.phone,
        job_opening: selectedJob.id,
        resume_attachment: fileUrl
      }

      const response = await fetch("/api/resource/Job Applicant", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest. We'll get back to you soon.",
        })
        setShowApplicationForm(false)
        setApplicationForm({ name: "", email: "", phone: "", resume: null })
        setSelectedJob(null)
      } else {
        throw new Error("Failed to submit application")
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-academy-black text-white py-16 lg:py-24 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-academy-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-balance animate-fade-up">
            Join Our <span className="text-academy-orange">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto text-pretty animate-fade-up delay-100">
            Build your career with Black Building Academy and help shape the future of education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-300 animate-fade-up delay-200">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-academy-orange" />
              <span>Growing Team</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-academy-orange" />
              <span>Multiple Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-academy-orange" />
              <span>Career Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-academy-black mb-4">
              Current <span className="text-academy-orange">Openings</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exciting opportunities to grow your career with us
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Current Openings</h3>
              <p className="text-gray-500">Check back soon for new opportunities!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <Card
                  key={job.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 glass animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-heading font-bold text-academy-black group-hover:text-academy-orange transition-colors">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">{job.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-academy-orange" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-academy-orange" />
                        <span>
                          {job.type} • {job.experience}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4 text-academy-orange" />
                        <span>Posted {job.postedDate}</span>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-academy-orange hover:bg-orange-600 text-white"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-academy-black">{job.title}</DialogTitle>
                          <DialogDescription className="text-gray-600">
                            {job.location} • {job.type} • {job.experience}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-academy-black mb-3">Job Description</h3>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.fullDescription}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-academy-black mb-3">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {job.requiredSkills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-academy-orange/10 text-academy-orange rounded-full text-sm font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <Button
                            className="w-full bg-academy-orange hover:bg-orange-600 text-white"
                            onClick={() => setShowApplicationForm(true)}
                          >
                            I'm Interested
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-academy-black">Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription className="text-gray-600">
              Fill out the form below to submit your application
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-academy-black">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={applicationForm.name}
                onChange={(e) => setApplicationForm((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-academy-black">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={applicationForm.email}
                onChange={(e) => setApplicationForm((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-academy-black">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={applicationForm.phone}
                onChange={(e) => setApplicationForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-1"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <Label htmlFor="resume" className="text-sm font-medium text-academy-black">
                Resume (Optional)
              </Label>
              <div className="mt-1">
                {applicationForm.resume ? (
                  <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-academy-orange" />
                      <span className="text-sm text-gray-700 truncate">{applicationForm.resume.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="resume"
                      className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-academy-orange transition-colors"
                    >
                      <Upload className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Upload Resume (PDF, DOC, DOCX - Max 5MB)</span>
                    </Label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowApplicationForm(false)}
                className="flex-1"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-academy-orange hover:bg-orange-600 text-white"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
