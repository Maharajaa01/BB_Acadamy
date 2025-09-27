"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, ImageIcon, Calendar, Eye } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: string
  title: string
  url: string
  thumbnail: string
  description?: string
  date?: string
  category?: string
}

export function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchImages = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/resource/Gallery")

      if (!response.ok) {
        throw new Error("Failed to fetch gallery images")
      }

      const data = await response.json()
      setImages(data.images || [])
    } catch (err) {
      setError("Failed to load gallery images. Please try again.")
      console.error("Error fetching gallery:", err)
      // Mock data for demonstration
      setImages([
        {
          id: "1",
          title: "Annual Day Celebration 2024",
          url: "/students-celebrating-annual-day.jpg",
          thumbnail: "/students-celebrating-annual-day.jpg",
          description: "Students showcasing their talents during our annual day celebration",
          date: "2024-03-15",
          category: "Events",
        },
        {
          id: "2",
          title: "Top Rank Holders Recognition",
          url: "/students-receiving-awards-ceremony.jpg",
          thumbnail: "/students-receiving-awards-ceremony.jpg",
          description: "Recognizing our top-performing students in board examinations",
          date: "2024-05-20",
          category: "Achievements",
        },
        {
          id: "3",
          title: "Science Exhibition",
          url: "/students-science-fair-projects.jpg",
          thumbnail: "/students-science-fair-projects.jpg",
          description: "Students presenting innovative science projects",
          date: "2024-02-10",
          category: "Academic",
        },
        {
          id: "4",
          title: "Mathematics Competition",
          url: "/students-math-competition-classroom.jpg",
          thumbnail: "/students-math-competition-classroom.jpg",
          description: "Inter-class mathematics competition winners",
          date: "2024-01-25",
          category: "Competition",
        },
        {
          id: "5",
          title: "Cultural Program",
          url: "/students-cultural-dance-performance.jpg",
          thumbnail: "/students-cultural-dance-performance.jpg",
          description: "Students performing traditional dance during cultural program",
          date: "2024-04-08",
          category: "Cultural",
        },
        {
          id: "6",
          title: "Study Group Session",
          url: "/students-group-study-session-classroom.jpg",
          thumbnail: "/students-group-study-session-classroom.jpg",
          description: "Collaborative learning session in progress",
          date: "2024-06-12",
          category: "Academic",
        },
        {
          id: "7",
          title: "Sports Day Activities",
          url: "/students-sports-day-running-track.jpg",
          thumbnail: "/students-sports-day-running-track.jpg",
          description: "Annual sports day with various athletic competitions",
          date: "2024-02-28",
          category: "Sports",
        },
        {
          id: "8",
          title: "Parent-Teacher Meeting",
          url: "/parents-teachers-meeting-classroom-discussion.jpg",
          thumbnail: "/parents-teachers-meeting-classroom-discussion.jpg",
          description: "Productive discussion between parents and teachers",
          date: "2024-07-05",
          category: "Meetings",
        },
        {
          id: "9",
          title: "Graduation Ceremony",
          url: "/students-graduation-ceremony-caps-gowns.jpg",
          thumbnail: "/students-graduation-ceremony-caps-gowns.jpg",
          description: "Celebrating our graduating students' achievements",
          date: "2024-05-30",
          category: "Graduation",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-academy-black mb-4">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Explore moments from our academy life, achievements, and memorable events
          </p>
          <div className="w-24 h-1 bg-academy-orange mx-auto mt-4"></div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-academy-orange"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-600">{error}</p>
              <Button onClick={fetchImages} className="mt-4 bg-transparent" variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Gallery Grid */}
        {!loading && !error && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <Card
                key={image.id}
                className="group border-2 border-gray-200 hover:border-academy-orange transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={image.thumbnail || "/placeholder.svg"}
                    alt={image.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-academy-orange/0 group-hover:bg-academy-orange/20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {image.category && (
                    <div className="absolute top-2 left-2 bg-academy-orange text-white px-2 py-1 rounded text-xs font-medium">
                      {image.category}
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-academy-black mb-2 text-balance">{image.title}</h3>
                  {image.description && <p className="text-sm text-gray-600 mb-2 text-pretty">{image.description}</p>}
                  {image.date && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(image.date).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && images.length === 0 && (
          <Card className="border-gray-200">
            <CardContent className="p-12 text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Images Available</h3>
              <p className="text-gray-600">Gallery images will be displayed here once they are uploaded.</p>
            </CardContent>
          </Card>
        )}

        {/* Image Preview Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            {selectedImage && (
              <>
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-xl font-bold text-academy-black text-balance">
                    {selectedImage.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <div className="relative mb-4">
                    <Image
                      src={selectedImage.url || "/placeholder.svg"}
                      alt={selectedImage.title}
                      width={800}
                      height={600}
                      className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                    />
                  </div>
                  {selectedImage.description && (
                    <p className="text-gray-600 mb-4 text-pretty">{selectedImage.description}</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {selectedImage.category && (
                      <span className="bg-academy-orange/10 text-academy-orange px-2 py-1 rounded">
                        {selectedImage.category}
                      </span>
                    )}
                    {selectedImage.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(selectedImage.date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={closeModal} variant="ghost" size="sm" className="absolute top-4 right-4 h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
