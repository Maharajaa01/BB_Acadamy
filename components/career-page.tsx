"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Briefcase, MapPin, Clock, Users, FileText, Download, Heart, GraduationCap, Coffee, Shield } from "lucide-react"
import Image from "next/image"
import { JobApplicationForm } from "./job-application-form"

const carouselImages = [
  "/staff_group_photo.jpg",
  "/teachers_making_centum.jpg",
  "/students_group_photo.jpg",
  "/boys_girls_price.jpg",
]

const perks = [
  { icon: <Heart className="w-6 h-6 text-red-500" />, title: "Health & Well-being", description: "Comprehensive coverage and wellness programs to keep you at your best." },
  { icon: <GraduationCap className="w-6 h-6 text-blue-500" />, title: "Learning & Development", description: "Continuous learning opportunities, workshops, and career advancement." },
  { icon: <Coffee className="w-6 h-6 text-yellow-600" />, title: "Great Work Environment", description: "Collaborative, supportive, and dynamic spaces designed for creativity." },
  { icon: <Shield className="w-6 h-6 text-green-500" />, title: "Impact & Security", description: "Secure employment with the opportunity to profoundly impact student lives." },
]

interface Job {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  requiredSkills: string[]
  location: string
  type: string
  experience: string
  salary?: string
  closesOn?: string
  postedDate: string
}

export function CareerPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    fetchJobs()
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 3500)
    return () => clearInterval(interval)
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
        fields: JSON.stringify([
          "name", "job_title", "status", "description",
          "custom_skills", "custom_experience",
          "location", "employment_type",
          "posted_on", "closes_on",
          "currency", "lower_range", "upper_range", "salary_per", "publish_salary_range"
        ]),
        filters: JSON.stringify(filters),
        order_by: "posted_on desc"
      })

      const response = await fetch(`/api/resource/Job Opening?${params}`, {
        headers: getHeaders()
      })
      if (response.ok) {
        const data = await response.json()
        const mappedJobs: Job[] = (data.data || []).map((item: any) => {
          // Parse skills: Try custom_skills first, then standard skills
          let skills: string[] = []
          const sourceSkills = item.custom_skills || item.skills
          if (sourceSkills) {
            // Handle newline or comma separation
            skills = sourceSkills.split(/[,\n]+/).map((s: string) => s.trim()).filter(Boolean)
          }

          // Format Salary
          let salary = ""
          if (item.publish_salary_range && item.lower_range && item.upper_range) {
            const currency = item.currency || "INR" // Default or from item
            // Simple formatter - can be improved
            const format = (n: number) => n.toLocaleString('en-IN', { style: 'currency', currency: currency, maximumFractionDigits: 0 })
            salary = `${format(item.lower_range)} - ${format(item.upper_range)} / ${item.salary_per || 'Month'}`
          }
          return {
            id: item.name,
            title: item.job_title,
            shortDescription: item.short_description || item.description?.replace(/<[^>]*>/g, '').substring(0, 100) + "..." || "",
            fullDescription: item.description, // HTML content
            requiredSkills: skills,
            location: item.location || item.city || "Remote",
            type: item.employment_type || item.job_type || "Full Time",
            experience: item.custom_experience || item.experience || "",
            salary: salary,
            closesOn: item.closes_on,
            postedDate: item.posted_on
          }
        })
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

  // Old File change and submission handlers removed - now handled by JobApplicationForm

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
      <section className="relative py-20 overflow-hidden bg-academy-black text-white flex flex-col justify-center items-center">
        {/* Carousel Background Images */}
        {carouselImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-30" : "opacity-0"
              }`}
          >
            <Image
              src={image}
              alt={`Career Slide ${index + 1}`}
              fill
              className="object-cover object-center w-full h-full"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Background ambient light */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-academy-orange rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-balance animate-fade-up delay-100">
            Join Our <span className="text-academy-orange">Team</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty animate-fade-up delay-200 mb-8">
            Build your career with Black Building Academy and help shape the future of education.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10 animate-fade-up delay-300">
            <a
              href="/staff_.pdf"
              download="BB_Academy_Staff_Brochure.pdf"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-academy-orange rounded-xl hover:bg-[#e6a600] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] focus:ring-4 focus:ring-orange-100 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Staff Brochure
            </a>
          </div>

          <div className="flex flex-wrap gap-6 justify-center items-center text-sm md:text-base text-white font-medium animate-fade-up delay-300">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              <Users className="h-5 w-5 text-academy-orange" />
              <span>Growing Team</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              <MapPin className="h-5 w-5 text-academy-orange" />
              <span>Core Locations</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              <Briefcase className="h-5 w-5 text-academy-orange" />
              <span>Career Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hear from our team Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-academy-orange/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-4">
              Hear from <span className="text-academy-orange">Our Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what it's like to work with us from the people who know it best.
            </p>
            <div className="w-24 h-1.5 bg-academy-orange mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-8">
            {[
              {
                name: "Priya Sharma",
                role: "Senior Physics Teacher",
                quote: "Working at BB Academy has been incredibly fulfilling. The support from management and the enthusiasm of students make every day rewarding.",
                image: "/testimonial_1.png"
              },
              {
                name: "Rajesh Kumar",
                role: "Academic Coordinator",
                quote: "The emphasis on continuous learning and innovation here is what sets us apart. We don't just teach, we inspire students to excel.",
                image: "/testimonial_2.png"
              },
              {
                name: "Anjali Desai",
                role: "Student Counselor",
                quote: "I love the collaborative culture. Everyone is genuinely invested in the well-being and success of our students and each other.",
                image: "/testimonial_3.png"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-xl hover:shadow-2xl transition-all duration-500 relative bg-white group animate-fade-up hover:-translate-y-2" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="pt-16 pb-8 px-8 text-center relative z-10">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden relative group-hover:scale-110 transition-transform duration-500">
                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="text-academy-orange/20 mb-6 flex justify-center group-hover:text-academy-orange/40 transition-colors duration-500">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 italic mb-8 leading-relaxed">"{testimonial.quote}"</p>
                  <h4 className="font-bold text-xl text-academy-black mb-1">{testimonial.name}</h4>
                  <p className="text-sm text-academy-orange font-semibold tracking-wide uppercase">{testimonial.role}</p>
                </CardContent>
                {/* Decorative bottom border */}
                <div className="h-1.5 w-full bg-gray-100 absolute bottom-0 left-0">
                  <div className="h-full bg-academy-orange w-0 transition-all duration-500 group-hover:w-full"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Culture & Perks Section */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-academy-orange/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-4">
              Work Culture & <span className="text-academy-orange">Perks</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We care about our team. Discover the benefits and environment that make working with us a rewarding experience.
            </p>
            <div className="w-24 h-1.5 bg-academy-orange mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Image */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-fade-up group">
              <Image src="/work_culture.png" alt="Work Culture at BB Academy" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-academy-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-12 h-1 bg-academy-orange mb-4 rounded-full"></div>
                <h3 className="text-3xl font-bold mb-3 text-white">Empowering Environment</h3>
                <p className="text-white/90 text-lg">A collaborative space where innovative ideas thrive and every educator is valued.</p>
              </div>
            </div>

            {/* Right side: Perks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {perks.map((perk, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white group animate-fade-up h-full"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6 text-left flex flex-col h-full">
                    <div className="inline-flex p-3 rounded-2xl bg-gray-50 mb-5 group-hover:scale-110 group-hover:bg-orange-50 transition-all duration-500 shadow-sm border border-gray-100 self-start">
                      {perk.icon}
                    </div>
                    <h3 className="text-lg font-bold text-academy-black mb-2">{perk.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed text-pretty flex-grow">
                      {perk.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fun at work Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-4">
              <span className="text-academy-orange">#Fun</span> at Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Life at BB Academy is about more than just teaching. It's about celebrating success, building connections, and creating lasting memories.
            </p>
            <div className="w-24 h-1.5 bg-academy-orange mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
            {[
              { src: "/staff_group_photo.jpg", span: "col-span-2 row-span-2", alt: "Staff Group" },
              { src: "/teachers_making_centum.jpg", span: "col-span-2 md:col-span-1 row-span-1", alt: "Teachers Celebrating" },
              { src: "/students_group_photo.jpg", span: "col-span-2 md:col-span-1 row-span-2", alt: "Students" },
              { src: "/bb_academy.jpg", span: "col-span-2 md:col-span-1 row-span-1", alt: "BB Academy" },
              { src: "/boys_girls_price.jpg", span: "col-span-2 md:col-span-2 row-span-1", alt: "Prize Distribution" },
              { src: "/infrastructe.jpg", span: "col-span-2 md:col-span-2 row-span-1", alt: "Infrastructure" },
            ].map((img, index) => (
              <div key={index} className={`relative rounded-3xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 ${img.span} animate-fade-up`} style={{ animationDelay: `${index * 100}ms` }}>
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="font-semibold text-lg drop-shadow-md">{img.alt}</span>
                </div>
              </div>
            ))}
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

                      {job.salary && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-semibold text-academy-black">{job.salary}</span>
                        </div>
                      )}
                      {job.closesOn && (
                        <div className="text-xs text-red-500 mt-2">
                          Closes on {job.closesOn}
                        </div>
                      )}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-academy-orange hover:bg-[#FFB902] text-white"
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
                            <div
                              className="text-gray-700 leading-relaxed max-w-none space-y-4 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-academy-black [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-3 [&_strong]:font-semibold"
                              dangerouslySetInnerHTML={{ __html: job.fullDescription }}
                            />
                          </div>

                          {job.requiredSkills.length > 0 && (
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
                          )}

                          <Button
                            className="w-full bg-academy-orange hover:bg-[#FFB902] text-white"
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
      {selectedJob && (
        <JobApplicationForm
          open={showApplicationForm}
          onOpenChange={setShowApplicationForm}
          jobTitle={selectedJob.title}
          jobId={selectedJob.id}
        />
      )}
    </div>
  )
}
