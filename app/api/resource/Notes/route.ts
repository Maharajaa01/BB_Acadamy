import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const mockNotes = [
  {
    id: "1",
    title: "Fundamentals of Mathematics",
    subject: "mathematics",
    standard: "10",
    downloadUrl: "/notes/math-fundamentals.pdf",
    description: "Complete guide to mathematical concepts for Class 10 students.",
  },
  {
    id: "2",
    title: "English Grammar Essentials",
    subject: "english",
    standard: "10",
    downloadUrl: "/notes/english-grammar.pdf",
    description: "Comprehensive grammar rules and exercises for better English proficiency.",
  },
  {
    id: "3",
    title: "Science Concepts and Experiments",
    subject: "science",
    standard: "10",
    downloadUrl: "/notes/science-concepts.pdf",
    description: "Detailed explanations of scientific principles with practical examples.",
  },
  {
    id: "4",
    title: "Tamil Literature and Grammar",
    subject: "tamil",
    standard: "10",
    downloadUrl: "/notes/tamil-literature.pdf",
    description: "Tamil language fundamentals and literary analysis.",
  },
  {
    id: "5",
    title: "Social Science - History",
    subject: "social-science",
    standard: "10",
    downloadUrl: "/notes/social-science-history.pdf",
    description: "Important historical events and their significance.",
  },
  {
    id: "6",
    title: "Advanced Physics Concepts",
    subject: "physics",
    standard: "12",
    downloadUrl: "/notes/physics-advanced.pdf",
    description: "Complex physics theories explained in simple terms.",
  },
  {
    id: "7",
    title: "Organic Chemistry Basics",
    subject: "chemistry",
    standard: "11",
    downloadUrl: "/notes/chemistry-organic.pdf",
    description: "Introduction to organic chemistry with reaction mechanisms.",
  },
  {
    id: "8",
    title: "Biology - Human Anatomy",
    subject: "biology",
    standard: "11",
    downloadUrl: "/notes/biology-anatomy.pdf",
    description: "Detailed study of human body systems and functions.",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const standard = searchParams.get("standard")
    const subject = searchParams.get("subject")

    if (!standard || !subject) {
      return NextResponse.json({ error: "Standard and subject are required" }, { status: 400 })
    }

    // Filter notes based on standard and subject
    const filteredNotes = mockNotes.filter((note) => note.standard === standard && note.subject === subject)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      notes: filteredNotes,
      total: filteredNotes.length,
    })
  } catch (error) {
    console.error("Error fetching notes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
