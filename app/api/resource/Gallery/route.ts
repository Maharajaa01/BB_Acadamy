import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const mockImages = [
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
