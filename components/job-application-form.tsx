"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2 } from "lucide-react"

interface EducationDetail {
    qualification: string
    institution_name: string
    course_department: string
    medium_of_education: string
    marks: string
    percentage: string
    year_of_passing: string
}

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    jobTitle: string
    jobId: string
}

const qualificationsList = [
    "10th STD", "12th STD", "UG", "PG", "B.Ed", "M.Ed", "M.Phil", "PhD", "Other"
]

export function JobApplicationForm({ open, onOpenChange, jobTitle, jobId }: Props) {
    const { toast } = useToast()
    const [submitting, setSubmitting] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        applicant_name: "",
        date_of_birth: "",
        age: "",
        marital_status: "",
        address: "",
        contact_no_1: "",
        contact_no_2: "",
        email_id: "",
        medical_problems: "",
        languages_known: "",
        additional_skills: "",
        hobbies: "",
        positive_points: "",
        experienced: false,
        years_of_experience: "",
        experience_details: "",
        company_name: "",
        job_role: "",
        salary_expectation: "",
        timing: "",
        internship_duration: "",
        internship_stipend: "",
        part_time_salary: "",
        full_time_salary: "",
        joining_date: "",
        referred_by: ""
    })

    const [educationDetails, setEducationDetails] = useState<EducationDetail[]>([
        { qualification: "", institution_name: "", course_department: "", medium_of_education: "", marks: "", percentage: "", year_of_passing: "" }
    ])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleEducationChange = (index: number, field: keyof EducationDetail, value: any) => {
        const newEdu = [...educationDetails]
        newEdu[index] = { ...newEdu[index], [field]: value }
        setEducationDetails(newEdu)
    }

    const addEducationRow = () => {
        setEducationDetails(prev => [...prev, { qualification: "", institution_name: "", course_department: "", medium_of_education: "", marks: "", percentage: "", year_of_passing: "" }])
    }

    const removeEducationRow = (index: number) => {
        setEducationDetails(prev => prev.filter((_, i) => i !== index))
    }

    const getHeaders = () => {
        const headers: Record<string, string> = { "Content-Type": "application/json" }
        const token = process.env.NEXT_PUBLIC_FRAPPE_API_TOKEN
        if (token) headers["Authorization"] = `token ${token}`
        return headers
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            // payload matching Frappe structure precisely
            const payload = {
                ...formData,
                experienced: formData.experienced ? 1 : 0,
                age: formData.age ? parseInt(formData.age) : null,
                years_of_experience: formData.years_of_experience ? parseFloat(formData.years_of_experience) : 0,
                salary_expectation: formData.salary_expectation ? parseFloat(formData.salary_expectation) : 0,
                internship_stipend: formData.internship_stipend ? parseFloat(formData.internship_stipend) : 0,
                part_time_salary: formData.part_time_salary ? parseFloat(formData.part_time_salary) : 0,
                full_time_salary: formData.full_time_salary ? parseFloat(formData.full_time_salary) : 0,
                job_opening: jobId, // link to the job
                status: "Waiting List",
                education_details: educationDetails.filter(e => e.qualification && e.institution_name).map(ed => ({
                    qualification: ed.qualification,
                    institution_name: ed.institution_name,
                    course_department: ed.course_department,
                    medium_of_education: ed.medium_of_education,
                    marks: ed.marks,
                    percentage: ed.percentage ? parseFloat(ed.percentage) : 0,
                    year_of_passing: ed.year_of_passing ? parseInt(ed.year_of_passing) : null,
                }))
            }

            const response = await fetch("/api/resource/Job Application", {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error("Failed to submit application")
            }

            toast({
                title: "Application Submitted!",
                description: "Thank you for applying. We will review your application soon.",
            })

            onOpenChange(false)
        } catch (error) {
            console.error(error)
            toast({
                title: "Submission Error",
                description: "There was a problem submitting your application. Please try again.",
                variant: "destructive",
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-50 p-0">
                <div className="bg-academy-black px-6 py-4 text-white sticky top-0 z-10">
                    <DialogTitle className="text-2xl font-bold">Apply for {jobTitle}</DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Please fill out all relevant details in the form below.
                    </DialogDescription>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Section: Personal Details */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h3 className="text-lg font-bold text-academy-orange border-b pb-2 mb-4">Personal Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Applicant Name *</Label>
                                <Input name="applicant_name" value={formData.applicant_name} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label>Email ID *</Label>
                                <Input type="email" name="email_id" value={formData.email_id} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label>Date of Birth</Label>
                                <Input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Age</Label>
                                <Input type="number" name="age" value={formData.age} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Marital Status</Label>
                                <Select value={formData.marital_status} onValueChange={(val) => handleSelectChange("marital_status", val)}>
                                    <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Married">Married</SelectItem>
                                        <SelectItem value="Unmarried">Unmarried</SelectItem>
                                        <SelectItem value="Widowed">Widowed</SelectItem>
                                        <SelectItem value="Divorced">Divorced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Contact No 1 *</Label>
                                <Input name="contact_no_1" value={formData.contact_no_1} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label>Contact No 2</Label>
                                <Input name="contact_no_2" value={formData.contact_no_2} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Languages Known</Label>
                                <Input name="languages_known" value={formData.languages_known} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <div>
                                <Label>Address</Label>
                                <Textarea name="address" value={formData.address} onChange={handleChange} rows={2} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Medical Problems (if any)</Label>
                                    <Textarea name="medical_problems" value={formData.medical_problems} onChange={handleChange} rows={2} />
                                </div>
                                <div>
                                    <Label>Positive Points (About You)</Label>
                                    <Textarea name="positive_points" value={formData.positive_points} onChange={handleChange} rows={2} />
                                </div>
                                <div>
                                    <Label>Additional Courses / Skills</Label>
                                    <Textarea name="additional_skills" value={formData.additional_skills} onChange={handleChange} rows={2} />
                                </div>
                                <div>
                                    <Label>Hobbies</Label>
                                    <Textarea name="hobbies" value={formData.hobbies} onChange={handleChange} rows={2} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section: Education Details */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4 overflow-hidden">
                        <h3 className="text-lg font-bold text-academy-orange border-b pb-2 mb-4">Education Records</h3>

                        <div className="space-y-4">
                            {educationDetails.map((edu, idx) => (
                                <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative group">
                                    {educationDetails.length > 1 && (
                                        <button type="button" onClick={() => removeEducationRow(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white p-1 rounded-full shadow-sm">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label className="text-xs">Qualification *</Label>
                                            <Select value={edu.qualification} onValueChange={(val) => handleEducationChange(idx, "qualification", val)} required>
                                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                                <SelectContent>
                                                    {qualificationsList.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-xs">Institution Name *</Label>
                                            <Input value={edu.institution_name} onChange={(e) => handleEducationChange(idx, "institution_name", e.target.value)} required />
                                        </div>
                                        <div>
                                            <Label className="text-xs">Course / Department</Label>
                                            <Input value={edu.course_department} onChange={(e) => handleEducationChange(idx, "course_department", e.target.value)} />
                                        </div>
                                        <div>
                                            <Label className="text-xs">Medium of Education</Label>
                                            <Select value={edu.medium_of_education} onValueChange={(val) => handleEducationChange(idx, "medium_of_education", val)}>
                                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="English">English</SelectItem>
                                                    <SelectItem value="Tamil">Tamil</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label className="text-xs">Marks</Label>
                                                <Input value={edu.marks} onChange={(e) => handleEducationChange(idx, "marks", e.target.value)} />
                                            </div>
                                            <div>
                                                <Label className="text-xs">Percentage</Label>
                                                <Input type="number" step="0.01" value={edu.percentage} onChange={(e) => handleEducationChange(idx, "percentage", e.target.value)} />
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="text-xs">Year of Passing</Label>
                                            <Input type="number" value={edu.year_of_passing} onChange={(e) => handleEducationChange(idx, "year_of_passing", e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addEducationRow} className="mt-2 text-xs">
                                <Plus className="w-4 h-4 mr-1" /> Add Education
                            </Button>
                        </div>
                    </div>

                    {/* Section: Experience Details */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center space-x-2 border-b pb-2 mb-4">
                            <Checkbox
                                id="experienced"
                                checked={formData.experienced}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, experienced: !!checked }))}
                            />
                            <label htmlFor="experienced" className="text-lg font-bold text-academy-orange">
                                I am Experienced
                            </label>
                        </div>

                        {formData.experienced && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div>
                                    <Label>Years of Experience</Label>
                                    <Input type="number" step="0.1" name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label>Company Name</Label>
                                    <Input name="company_name" value={formData.company_name} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label>Job Role</Label>
                                    <Input name="job_role" value={formData.job_role} onChange={handleChange} />
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Experience Description</Label>
                                    <Textarea name="experience_details" value={formData.experience_details} onChange={handleChange} rows={3} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Section: Job Requirements & Reference */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h3 className="text-lg font-bold text-academy-orange border-b pb-2 mb-4">Job Expectations & Reference</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <Label>Salary Expectation</Label>
                                <Input type="number" name="salary_expectation" value={formData.salary_expectation} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Timing Availability</Label>
                                <Input name="timing" value={formData.timing} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Joining Date</Label>
                                <Input type="date" name="joining_date" value={formData.joining_date} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Internship Duration (if any)</Label>
                                <Input name="internship_duration" value={formData.internship_duration} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Internship Stipend</Label>
                                <Input type="number" name="internship_stipend" value={formData.internship_stipend} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Part Time Salary</Label>
                                <Input type="number" name="part_time_salary" value={formData.part_time_salary} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Full Time Salary</Label>
                                <Input type="number" name="full_time_salary" value={formData.full_time_salary} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Referred By</Label>
                                <Input name="referred_by" value={formData.referred_by} onChange={handleChange} placeholder="Name of referrer" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 pb-10">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-1/3" disabled={submitting}>
                            Cancel
                        </Button>
                        <Button type="submit" className="w-2/3 bg-academy-orange hover:bg-[#e6a600] text-white" disabled={submitting}>
                            {submitting ? "Submitting Application..." : "Submit Application"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
