export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const mockImages = [
  {
    id: "1",
    title: "Public Exam Prepartion Remainder",
    url: "/dash_board.jpg",
    thumbnail: "/dash_board.jpg",
    description: "Motivating Students Through the ",
    date: "2024-03-15",
    category: "Events",
  },
  {
    id: "2",
    title: "Top Rank Holders Recognition",
    url: "/boys_girls_price.jpg",
    thumbnail: "/boys_girls_price.jpg",
    description: "Recognizing our top-performing students in board examinations",
    date: "2024-05-20",
    category: "Achievements",
  },
  {
    id: "3",
    title: "Staff Meetings",
    url: "/staff_group_photo.jpg",
    thumbnail: "/staff_group_photo.jpg",
    description: "Behind Every Great Education Is🔥✨ A Team Like Ours",
    date: "2024-02-10",
    category: "Academic",
  },
  {
    id: "4",
    title: "Teachers Making Centum Preparation",
    url: "/teachers_making_centum.jpg",
    thumbnail: "/teachers_making_centum.jpg",
    description: "Teachers Training Today For Tomorrow’s Successful Students📚",
    date: "2024-01-25",
    category: "Competition",
  },
  {
    id: "5",
    title: "Students' Achievements and Recognition",
    url: "/2025_12th_girls.jpeg",
    thumbnail: "/2025_12th_girls.jpeg",
    description: "Celebrating exceptional academic achievement, this award honors students who have consistently excelled and demonstrated outstanding dedication to their studies.",
    date: "2024-04-08",
    category: "Achievements",
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
    title: "Game Activity",
    url: "/8th_standard_stationary.jpg",
    thumbnail: "/8th_standard_stationary.jpg",
    description: "AUGUST MONTH GAME CARD 🎯 Stationery வெல்லு!!✏️📚 Mark-அ அல்லு!!✅📌BB Academy 🎓",
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
    url: "/2025_12th_students.jpeg",
    thumbnail: "/2025_12th_students.jpeg",
    description: "Celebrating our graduating students' achievements",
    date: "2024-05-30",
    category: "Graduation",
  },
]

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json({
      success: true,
      images: mockImages,
      total: mockImages.length,
    })
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
