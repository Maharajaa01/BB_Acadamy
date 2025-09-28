export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const jobId = formData.get("jobId") as string
    const jobTitle = formData.get("jobTitle") as string
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const resume = formData.get("resume") as File | null

    // Validate required fields
    if (!jobId || !jobTitle || !name || !email || !phone) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))) {
      return NextResponse.json({ success: false, error: "Invalid phone number format" }, { status: 400 })
    }

    // Process resume file if provided
    let resumeInfo = null
    if (resume && resume.size > 0) {
      // Validate file size (max 5MB)
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json({ success: false, error: "Resume file size exceeds 5MB limit" }, { status: 400 })
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(resume.type)) {
        return NextResponse.json(
          { success: false, error: "Invalid file type. Please upload PDF, DOC, or DOCX files only" },
          { status: 400 },
        )
      }

      resumeInfo = {
        name: resume.name,
        size: resume.size,
        type: resume.type,
      }

      // In a real application, you would save the file to a storage service
      // For now, we'll just log the file information
      console.log("Resume uploaded:", resumeInfo)
    }

    // Create application record
    const application = {
      id: Date.now().toString(),
      jobId,
      jobTitle,
      applicantName: name,
      email,
      phone,
      resume: resumeInfo,
      appliedAt: new Date().toISOString(),
      status: "pending",
    }

    // In a real application, you would save this to a database
    console.log("New job application:", application)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Send confirmation email (in real app)
    // await sendConfirmationEmail(email, name, jobTitle)

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: application.id,
    })
  } catch (error) {
    console.error("Error processing job application:", error)
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 })
  }
}
