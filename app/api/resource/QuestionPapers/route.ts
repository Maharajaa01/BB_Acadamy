import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const standard = searchParams.get("standard")
  const fromYear = searchParams.get("fromYear")
  const toYear = searchParams.get("toYear")
  const examType = searchParams.get("examType")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock question papers data
  const mockQuestionPapers = [
    {
      id: "qp1",
      title: `${standard}th Physics ${examType} ${fromYear}`,
      standard,
      year: fromYear,
      examType,
      subject: "Physics",
      viewUrl: "/mock-question-paper.pdf",
      downloadUrl: "/mock-question-paper.pdf",
    },
    {
      id: "qp2",
      title: `${standard}th Mathematics ${examType} ${toYear}`,
      standard,
      year: toYear,
      examType,
      subject: "Mathematics",
      viewUrl: "/mock-question-paper.pdf",
      downloadUrl: "/mock-question-paper.pdf",
    },
    {
      id: "qp3",
      title: `${standard}th Chemistry ${examType} ${fromYear}`,
      standard,
      year: fromYear,
      examType,
      subject: "Chemistry",
      viewUrl: "/mock-question-paper.pdf",
      downloadUrl: "/mock-question-paper.pdf",
    },
  ]

  return NextResponse.json({
    success: true,
    questionPapers: mockQuestionPapers,
    total: mockQuestionPapers.length,
  })
}
