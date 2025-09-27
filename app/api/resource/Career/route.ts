import { NextResponse } from "next/server"

// Mock job data - replace with actual database queries
const mockJobs = [
  {
    id: "1",
    title: "Mathematics Teacher",
    shortDescription: "Experienced mathematics teacher for 11th and 12th grade students",
    fullDescription: `We are looking for a passionate and experienced Mathematics Teacher to join our team at Black Building Academy. The ideal candidate will have a strong background in teaching mathematics to 11th and 12th grade students, with expertise in both state board and competitive exam preparation.

Key Responsibilities:
• Teach mathematics concepts to 11th and 12th grade students
• Prepare students for board examinations and competitive exams
• Develop engaging lesson plans and teaching materials
• Assess student progress and provide constructive feedback
• Collaborate with other faculty members to enhance the learning experience
• Participate in parent-teacher meetings and academic events

Requirements:
• Bachelor's or Master's degree in Mathematics or related field
• Minimum 3 years of teaching experience
• Strong communication and interpersonal skills
• Passion for education and student development`,
    requiredSkills: ["Mathematics", "Teaching", "Curriculum Development", "Student Assessment", "Communication"],
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "3+ years",
    postedDate: "2 days ago",
  },
  {
    id: "2",
    title: "Physics Faculty",
    shortDescription: "Dynamic physics teacher for competitive exam preparation",
    fullDescription: `Join our team as a Physics Faculty member and help students excel in their academic journey. We are seeking a dedicated educator with expertise in physics concepts and competitive exam preparation.

Key Responsibilities:
• Deliver high-quality physics lectures to students
• Prepare comprehensive study materials and practice tests
• Guide students in problem-solving techniques
• Monitor student performance and provide personalized guidance
• Stay updated with latest exam patterns and syllabus changes
• Conduct doubt-clearing sessions and workshops

Requirements:
• M.Sc. in Physics or equivalent qualification
• Experience in teaching physics for competitive exams
• Strong analytical and problem-solving skills
• Ability to simplify complex concepts for students`,
    requiredSkills: ["Physics", "Competitive Exams", "Problem Solving", "Analytical Thinking", "Student Mentoring"],
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "2+ years",
    postedDate: "1 week ago",
  },
  {
    id: "3",
    title: "Academic Counselor",
    shortDescription: "Guide students in their academic and career planning",
    fullDescription: `We are looking for an experienced Academic Counselor to provide guidance and support to our students in their academic journey and career planning.

Key Responsibilities:
• Provide academic counseling to students and parents
• Assist students in course selection and career planning
• Conduct orientation programs for new students
• Monitor student academic progress and attendance
• Organize career guidance workshops and seminars
• Maintain student records and documentation
• Collaborate with faculty to address student concerns

Requirements:
• Master's degree in Psychology, Education, or related field
• Experience in academic counseling or student guidance
• Excellent communication and interpersonal skills
• Understanding of various career paths and educational opportunities
• Empathetic and patient approach towards students`,
    requiredSkills: ["Counseling", "Student Guidance", "Communication", "Psychology", "Career Planning"],
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "2+ years",
    postedDate: "3 days ago",
  },
  {
    id: "4",
    title: "Digital Marketing Executive",
    shortDescription: "Drive online presence and student enrollment through digital marketing",
    fullDescription: `We are seeking a creative and results-driven Digital Marketing Executive to enhance our online presence and drive student enrollment through effective digital marketing strategies.

Key Responsibilities:
• Develop and execute digital marketing campaigns across various platforms
• Manage social media accounts and create engaging content
• Optimize website content for search engines (SEO)
• Run and monitor paid advertising campaigns (Google Ads, Facebook Ads)
• Analyze marketing metrics and prepare performance reports
• Create marketing materials and promotional content
• Collaborate with the admissions team to generate leads

Requirements:
• Bachelor's degree in Marketing, Communications, or related field
• Experience in digital marketing and social media management
• Knowledge of SEO, SEM, and analytics tools
• Creative thinking and content creation skills
• Proficiency in design tools like Canva or Adobe Creative Suite`,
    requiredSkills: ["Digital Marketing", "Social Media", "SEO", "Content Creation", "Analytics", "Google Ads"],
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "1+ years",
    postedDate: "5 days ago",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      jobs: mockJobs,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 })
  }
}
