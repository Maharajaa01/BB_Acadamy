"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, ImageIcon, Calendar, Eye } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Audience = "All" | "Students" | "Teachers";

const flowOptions = {
  Students: [
    "Winners Meeting",
    "Students Meetings",
    "100+ Advantages",
    "Competition",
    "Students Speech",
    "Wheel Contest",
  ],
  Teachers: [
    "KPI WRM",
    "Competition",
    "Celebration",
    "Spin Wheel Contest",
    "Teachers Top Performer Photo",
    "Testimonial",
  ],
} as const;

interface GalleryImage {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  description?: string;
  date?: string;
  category?: string;
  audience?: Exclude<Audience, "All">;
  flow?: string;
}

function classifyImage(image: GalleryImage, index: number) {
  const text =
    `${image.title} ${image.description ?? ""} ${image.category ?? ""}`.toLowerCase();

  const teacherSignals = [
    "teacher",
    "staff",
    "mentor",
    "kpi",
    "wrm",
    "testimonial",
  ];
  const studentSignals = [
    "student",
    "public exam",
    "rank",
    "speech",
    "study",
    "winner",
  ];

  const isTeacher = teacherSignals.some((word) => text.includes(word));
  const isStudent = studentSignals.some((word) => text.includes(word));

  const audience: Exclude<Audience, "All"> = isTeacher
    ? "Teachers"
    : isStudent
      ? "Students"
      : index % 3 === 0
        ? "Teachers"
        : "Students";

  const studentFlowMap: Array<{ flow: string; keys: string[] }> = [
    {
      flow: "Winners Meeting",
      keys: ["winner", "rank", "recognition", "achievement", "prize"],
    },
    { flow: "Students Meetings", keys: ["meeting", "group", "session"] },
    { flow: "100+ Advantages", keys: ["advantages", "benefit", "support"] },
    { flow: "Competition", keys: ["competition", "contest"] },
    { flow: "Students Speech", keys: ["speech", "presentation"] },
    { flow: "Wheel Contest", keys: ["wheel", "spin"] },
  ];

  const teacherFlowMap: Array<{ flow: string; keys: string[] }> = [
    { flow: "KPI WRM", keys: ["kpi", "wrm", "review", "performance"] },
    { flow: "Competition", keys: ["competition", "contest"] },
    { flow: "Celebration", keys: ["celebration", "event", "ceremony"] },
    { flow: "Spin Wheel Contest", keys: ["spin", "wheel"] },
    {
      flow: "Teachers Top Performer Photo",
      keys: ["top", "performer", "staff"],
    },
    { flow: "Testimonial", keys: ["testimonial", "feedback"] },
  ];

  const activeMap = audience === "Students" ? studentFlowMap : teacherFlowMap;
  const detected = activeMap.find((entry) =>
    entry.keys.some((key) => text.includes(key)),
  );
  const fallback =
    audience === "Students" ? flowOptions.Students[1] : flowOptions.Teachers[0];

  return {
    audience,
    flow: detected?.flow ?? fallback,
  };
}

export function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState<Audience>("All");
  const [selectedFlow, setSelectedFlow] = useState<string>("All");

  const filteredImages = images.filter((img) => {
    const matchAudience =
      selectedAudience === "All" || img.audience === selectedAudience;
    const matchFlow = selectedFlow === "All" || img.flow === selectedFlow;
    return matchAudience && matchFlow;
  });

  const showNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const showPrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiBase =
        typeof window !== "undefined" ? window.location.origin : "";
      const response = await fetch(`${apiBase}/api/resource/Gallery`);

      if (!response.ok) {
        throw new Error("Failed to fetch gallery images");
      }

      const data = await response.json();
      const normalized = (data.images || []).map(
        (img: GalleryImage, index: number) => ({
          ...img,
          ...classifyImage(img, index),
        }),
      );
      setImages(normalized);
    } catch (err) {
      setError("Failed to load gallery images. Please try again.");
      console.error("Error fetching gallery:", err);
      // Mock data for demonstration
      const mockData: GalleryImage[] = [
        {
          id: "1",
          title: "Motivation For Public Exam",
          url: "/dash_board.jpg",
          thumbnail: "/dash_board.jpg",
          description: "Public Exam Preparation",
          date: "2024-03-15",
          category: "Events",
        },
        {
          id: "2",
          title: "Top Rank Holders Recognition",
          url: "/boys_girls_price.jpg",
          thumbnail: "/boys_girls_price.jpg",
          description:
            "Recognizing our top-performing students in board examinations",
          date: "2024-05-20",
          category: "Achievements",
        },
        {
          id: "3",
          title: "Staff",
          url: "/staff_group_photo.jpg",
          thumbnail: "/staff_group_photo.jpg",
          description: "Students presenting innovative science projects",
          date: "2024-02-10",
          category: "Academic",
        },
        {
          id: "4",
          title: "Mathematics Competition",

          url: "/teachers_making_centum.jpg",
          thumbnail: "/teachers_making_centum.jpg",
          description: "Inter-class mathematics competition winners",
          date: "2024-01-25",
          category: "Competition",
        },
        {
          id: "5",
          title: "Cultural Program",
          url: "/2025_12th_girls.jpeg",
          thumbnail: "/2025_12th_girls.jpeg",
          description:
            "Students performing traditional dance during cultural program",
          date: "2024-04-08",
          category: "Cultural",
        },
        {
          id: "6",
          title: "Study Group Session",
          url: "/students_group_photo.jpg",
          thumbnail: "/students_group_photo.jpg",
          description: "Collaborative learning session in progress",
          date: "2024-06-12",
          category: "Academic",
        },
        {
          id: "7",
          title: "Students Activities",
          url: "/8th_standard_stationary.jpg",
          thumbnail: "/8th_standard_stationary.jpg",
          description: "Every day with various Learning competitions",
          date: "2024-02-28",
          category: "Sports",
        },
        {
          id: "8",
          title: "Graduation Ceremony",

          url: "/2025_12th_students.jpeg",
          thumbnail: "/2025_12th_students.jpeg",
          description: "Celebrating our graduating students' achievements",
          date: "2024-05-30",
          category: "Graduation",
        },
      ];

      setImages(
        mockData.map((img, index) => ({
          ...img,
          ...classifyImage(img, index),
        })),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const activeFlowOptions =
    selectedAudience === "All"
      ? Array.from(new Set(images.map((img) => img.flow).filter(Boolean)))
      : flowOptions[selectedAudience];

  const audienceCounts = {
    Students: images.filter((img) => img.audience === "Students").length,
    Teachers: images.filter((img) => img.audience === "Teachers").length,
  };

  return (
    <div className="relative min-h-screen bg-gray-50 py-10 overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-academy-orange/15 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-academy-orange/10 blur-3xl"
        animate={{ x: [0, -26, 0], y: [0, -16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-academy-black mb-3 tracking-tight">
            Gallery Rework
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto text-balance">
            Interactive flow view for Students and Teachers — designed for quick
            exploration of meetings, winners, competitions, celebrations,
            speeches, KPI WRM and testimonials.
          </p>
          <div className="w-24 h-1 bg-academy-orange mx-auto mt-4"></div>
        </motion.div>

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
              <Button
                onClick={fetchImages}
                className="mt-4 bg-transparent"
                variant="outline"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Audience Flow Selector */}
        {!loading && !error && images.length > 0 && (
          <div className="mb-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(
                [
                  { label: "All", count: images.length },
                  { label: "Students", count: audienceCounts.Students },
                  { label: "Teachers", count: audienceCounts.Teachers },
                ] as Array<{ label: Audience; count: number }>
              ).map((audience) => (
                <motion.button
                  key={audience.label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedAudience(audience.label);
                    setSelectedFlow("All");
                  }}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                    selectedAudience === audience.label
                      ? "border-academy-orange bg-academy-orange/10"
                      : "border-gray-200 bg-white hover:border-academy-orange/50"
                  }`}
                >
                  <p className="text-sm text-gray-500">{audience.label}</p>
                  <p className="font-heading text-2xl font-bold text-academy-black">
                    {audience.count}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Button
                onClick={() => setSelectedFlow("All")}
                variant={selectedFlow === "All" ? "default" : "outline"}
                className={
                  selectedFlow === "All"
                    ? "bg-academy-orange hover:bg-academy-orange/90 text-white border-academy-orange"
                    : "border-academy-orange text-academy-orange hover:bg-academy-orange/10"
                }
              >
                All Flows
              </Button>

              {activeFlowOptions.map((flow) => (
                <Button
                  key={flow}
                  onClick={() => setSelectedFlow(flow as string)}
                  variant={selectedFlow === flow ? "default" : "outline"}
                  className={
                    selectedFlow === flow
                      ? "bg-academy-orange hover:bg-academy-orange/90 text-white border-academy-orange"
                      : "border-academy-orange text-academy-orange hover:bg-academy-orange/10"
                  }
                >
                  {flow}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
              >
                <Card
                  className="group border-2 border-gray-200 hover:border-academy-orange transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => openModal(image)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={image.thumbnail || "/placeholder.svg"}
                      alt={image.title}
                      width={400}
                      height={300}
                      className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-academy-orange/0 group-hover:bg-academy-orange/20 transition-all duration-300 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute top-2 left-2 flex gap-2">
                      {image.audience && (
                        <span className="bg-academy-orange text-white px-2 py-1 rounded text-xs font-semibold">
                          {image.audience}
                        </span>
                      )}
                      {image.flow && (
                        <span className="bg-black/65 text-white px-2 py-1 rounded text-xs">
                          {image.flow}
                        </span>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-heading font-bold text-academy-black mb-2 text-balance">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 mb-2 text-pretty">
                        {image.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      {image.category ? (
                        <span>{image.category}</span>
                      ) : (
                        <span>Academy Moment</span>
                      )}
                      {image.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(image.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredImages.length === 0 && (
          <Card className="border-gray-200">
            <CardContent className="p-12 text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Images in This Flow
              </h3>
              <p className="text-gray-600">
                Try changing audience or flow to view available photos.
              </p>
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
                    <p className="text-gray-600 mb-4 text-pretty">
                      {selectedImage.description}
                    </p>
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
                {/* Previous Button */}
                <Button
                  onClick={showPrevImage}
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2 h-12 w-12 rounded-full bg-white/70 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-transform"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </Button>

                {/* Next Button */}
                <Button
                  onClick={showNextImage}
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-4 -translate-y-1/2 h-12 w-12 rounded-full bg-white/70 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-transform"
                >
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </Button>
                {/* Close Button */}
                <Button
                  onClick={closeModal}
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 h-8 w-8 p-0 z-10 bg-white/70 backdrop-blur-md rounded-full shadow hover:bg-white"
                >
                  <X className="h-4 w-4 text-gray-800" />
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
