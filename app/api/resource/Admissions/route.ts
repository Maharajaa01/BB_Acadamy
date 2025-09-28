export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Basic shape check; extend as needed
    const { fullName, email, phone, standard } = body || {}
    if (!fullName || !email || !phone || !standard) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
    }

    // In a real app, save to DB or send an email here
    console.log("[v0] New Admission Application:", body)

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.log("[v0] Admissions API error:", e?.message)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
