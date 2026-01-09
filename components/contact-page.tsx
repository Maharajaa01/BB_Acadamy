"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactForm {
  name: string
  email: string
  message: string
}

export function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/resource/Contact Message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you as soon as possible.",
        })
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["10, Vivekananda St, MGR Nagar, Nesapakkam, Chennai, Tamil Nadu 600078"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 79045 09575"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["blackbuildingacademy@gmail.com", "admissions@blackbuildingacademy.com"],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 8:00 AM - 8:00 PM", "Saturday: 8:00 AM - 6:00 PM", "Sunday: 9:00 AM - 2:00 PM"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-academy-black mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Get in touch with us for admissions, inquiries, or any questions about our programs
          </p>
          <div className="w-24 h-1 bg-academy-orange mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-academy-black">
                <Send className="h-5 w-5 text-academy-orange" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-4">Thank you for contacting us. We'll get back to you soon.</p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-academy-orange text-academy-orange hover:bg-academy-orange hover:text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-academy-orange focus:border-academy-orange"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-academy-orange focus:border-academy-orange"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-academy-orange focus:border-academy-orange"
                      placeholder="Tell us about your inquiry, questions, or how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-academy-orange hover:bg-orange-600 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-academy-orange transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <info.icon className="h-6 w-6 text-academy-orange" />
                    </div>
                    <div>
                      <h3 className="font-bold text-academy-black mb-2">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Additional Information */}
            <Card className="border-2 border-academy-orange bg-academy-orange/5">
              <CardContent className="p-6">
                <h3 className="font-bold text-academy-black mb-3">Why Choose Black Building Academy?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-academy-orange flex-shrink-0" />
                    100% Pass Guarantee in Board Exams
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-academy-orange flex-shrink-0" />
                    Personalized Learning Approach
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-academy-orange flex-shrink-0" />
                    Expert Faculty with 10+ Years Experience
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-academy-orange flex-shrink-0" />
                    Regular Parent-Teacher Communication
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-16 animate-fade-up delay-200">
          <Card className="border-none shadow-xl overflow-hidden glass p-2">
            <div className="aspect-[21/9] w-full relative rounded-xl overflow-hidden bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0323438565374!2d80.19762627359022!3d13.033612313518686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267639ab02ded%3A0x9824337fb2ea2701!2sBB%20Academy%20-%20Tuition%20Center!5e0!3m2!1sen!2sin!4v1767960903323!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
