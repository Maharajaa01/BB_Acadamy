"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const standards = ["8th", "9th", "10th", "11th", "12th"] as const
const groups = ["Science", "Commerce", "Arts"] as const

export function AdmissionFormDialog({ open, onOpenChange }: Props) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [standard, setStandard] = useState<string>("")
  const [group, setGroup] = useState<string>("")
  const [message, setMessage] = useState("")

  const showGroup = useMemo(() => standard === "11th" || standard === "12th", [standard])

  useEffect(() => {
    if (!showGroup) setGroup("")
  }, [showGroup])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fullName || !email || !phone || !standard) {
      toast({ description: "Please fill in all required fields.", variant: "destructive" as any })
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/resource/Admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, standard, group, message }),
      })
      if (!res.ok) throw new Error("Failed to submit")
      toast({ description: "Application submitted successfully. We'll contact you soon!" })
      // reset form
      setFullName("")
      setEmail("")
      setPhone("")
      setStandard("")
      setGroup("")
      setMessage("")
      onOpenChange(false)
    } catch (err: any) {
      console.log("[v0] Admission submit error:", err?.message)
      toast({ description: "Something went wrong. Please try again.", variant: "destructive" as any })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] sm:w-full bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-pretty">Admission Form</DialogTitle>
          <DialogDescription className="text-pretty">
            Fill in your details and our team will get back to you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Standard</Label>
              <Select value={standard} onValueChange={setStandard}>
                <SelectTrigger>
                  <SelectValue placeholder="Select standard" />
                </SelectTrigger>
                <SelectContent>
                  {standards.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showGroup && (
              <div className="grid gap-2">
                <Label>Group</Label>
                <Select value={group} onValueChange={setGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your goals..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-24"
            />
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" className="bg-academy-orange hover:bg-orange-600 text-white" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
