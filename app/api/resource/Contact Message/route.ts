import { type NextRequest, NextResponse } from "next/server"

interface ContactMessage {
  name: string
  email: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactMessage = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real application, you would:
    // 1. Save the message to a database
    // 2. Send an email notification to the academy
    // 3. Send a confirmation email to the user
    // 4. Log the contact attempt

    console.log("Contact message received:", {
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    // Simulate successful processing
    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
      id: `msg_${Date.now()}`,
    })
  } catch (error) {
    console.error("Error processing contact message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
