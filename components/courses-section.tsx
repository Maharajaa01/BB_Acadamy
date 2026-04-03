"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  School,
  Star,
  Trophy,
  Target,
  Sparkles,
  Download,
  Languages,
  BookA,
  MessageCircle,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Monitor,
  BarChart,
  Home,
  Microscope,
  TestTube,
  HeartPulse,
  Leaf,
  TrendingUp,
  Briefcase,
  Landmark,
  Globe,
  PieChart,
  Map as MapIcon,
} from "lucide-react";
import {
  AdmissionFormDialog,
  type AdmissionCategory,
} from "@/components/admission-form";

const subjects = [
  {
    name: "Tamil",
    icon: Languages,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "hover:border-red-300",
  },
  {
    name: "English",
    icon: BookA,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "hover:border-blue-300",
  },
  {
    name: "French",
    icon: Languages,
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "hover:border-purple-300",
  },
  {
    name: "Hindi",
    icon: MessageCircle,
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "hover:border-orange-300",
  },
  {
    name: "Maths",
    icon: Calculator,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    border: "hover:border-indigo-300",
  },
  {
    name: "Physics",
    icon: Atom,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    border: "hover:border-cyan-300",
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "hover:border-emerald-300",
  },
  {
    name: "Biology",
    icon: Dna,
    color: "text-green-500",
    bg: "bg-green-50",
    border: "hover:border-green-300",
  },
  {
    name: "Computer Science",
    icon: Monitor,
    color: "text-sky-500",
    bg: "bg-sky-50",
    border: "hover:border-sky-300",
  },
  {
    name: "Statistics",
    icon: BarChart,
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-50",
    border: "hover:border-fuchsia-300",
  },
  {
    name: "Home Science",
    icon: Home,
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "hover:border-rose-300",
  },
  {
    name: "Micro-Biology",
    icon: Microscope,
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "hover:border-teal-300",
  },
  {
    name: "Bio-Chemistry",
    icon: TestTube,
    color: "text-lime-500",
    bg: "bg-lime-50",
    border: "hover:border-lime-300",
  },
  {
    name: "Zoology",
    icon: HeartPulse,
    color: "text-pink-500",
    bg: "bg-pink-50",
    border: "hover:border-pink-300",
  },
  {
    name: "Botany",
    icon: Leaf,
    color: "text-green-600",
    bg: "bg-green-100",
    border: "hover:border-green-400",
  },
  {
    name: "Economics",
    icon: TrendingUp,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "hover:border-amber-300",
  },
  {
    name: "Commerce",
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "hover:border-blue-400",
  },
  {
    name: "Accountancy",
    icon: Calculator,
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "hover:border-violet-300",
  },
  {
    name: "History",
    icon: Landmark,
    color: "text-amber-600",
    bg: "bg-amber-100",
    border: "hover:border-amber-400",
  },
  {
    name: "Social Science",
    icon: Globe,
    color: "text-cyan-600",
    bg: "bg-cyan-100",
    border: "hover:border-cyan-400",
  },
  {
    name: "Business Mathematics",
    icon: PieChart,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    border: "hover:border-indigo-400",
  },
  {
    name: "Geography",
    icon: MapIcon,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    border: "hover:border-emerald-400",
  },
];

const features = [
  {
    title: "Proven Excellence",
    description:
      "With over 10 years of experience in the education field, BB Academy has a strong track record of delivering high-quality education and consistent results, making us Chennai's No.1 tuition center.",
    icon: <Star className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Personalized Learning",
    description:
      "We tailor our teaching methods to each student's unique learning style and pace, ensuring maximum comprehension and retention.",
    icon: <Sparkles className="w-6 h-6 text-blue-500" />,
  },
];

export function CoursesSection() {
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [admissionCategory, setAdmissionCategory] =
    useState<AdmissionCategory>("All");

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-white via-orange-50/45 to-white section-shell">
      {/* Decorative blob */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 -z-10 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 -z-10 animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Courses We Offer */}
        <div className="text-center mb-9 md:mb-10 animate-fade-up">
          <p className="text-academy-orange font-semibold text-sm uppercase tracking-widest mb-2">
            Programs
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-3">
            Courses We Offer
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
            At BB Academy, we offer a wide range of courses designed to help
            students from 5th to 12th standard excel in their academics.
          </p>
          <div className="w-20 h-1 bg-academy-orange mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:mb-12">
          {/* Foundation Category Card */}
          <Card className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 bg-gradient-to-br from-blue-50 to-blue-100/50 animate-fade-up rounded-3xl border-0">
            <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/5 transition-colors duration-500" />
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 pointer-events-none">
              <BookOpen className="w-48 h-48 text-blue-600" />
            </div>
            <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between relative z-10">
              <div>
                <div className="mb-6 inline-flex p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <School className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                  Foundation
                </h3>
                <p className="text-base md:text-lg font-medium text-blue-600 mb-3">
                  (Classes 6–9)
                </p>
                <p className="text-gray-600 text-base leading-relaxed max-w-sm mb-8">
                  Strong academic base for middle and high school students.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-auto">
                <button
                  onClick={() => {
                    setAdmissionCategory("Foundation");
                    setAdmissionOpen(true);
                  }}
                  className="inline-flex items-center justify-center w-max px-6 py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-100 shadow-lg shadow-blue-200 group-hover:shadow-blue-300"
                >
                  Explore Program
                </button>
                <a
                  href="/about_bb_academy.pdf"
                  download="BB_Academy_Brochure.pdf"
                  className="inline-flex items-center justify-center w-max px-6 py-3 font-semibold text-blue-600 bg-white/90 rounded-xl hover:bg-blue-50 transition-colors focus:ring-4 focus:ring-blue-100 shadow-sm"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Brochure
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Public Exam Category Card */}
          <Card className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 bg-gradient-to-br from-orange-50 to-red-50/60 animate-fade-up delay-100 rounded-3xl border-0">
            <div className="absolute inset-0 bg-orange-400/0 group-hover:bg-orange-400/5 transition-colors duration-500" />
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 pointer-events-none">
              <Trophy className="w-48 h-48 text-orange-600" />
            </div>
            <CardContent className="p-6 md:p-8 flex flex-col h-full justify-between relative z-10">
              <div>
                <div className="mb-6 inline-flex p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <GraduationCap className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                  Public Exam
                </h3>
                <p className="text-base md:text-lg font-medium text-orange-600 mb-3">
                  (Classes 10–12)
                </p>
                <p className="text-gray-600 text-base leading-relaxed max-w-sm mb-8">
                  Focused coaching for Board & Higher Secondary Exams.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-auto">
                <button
                  onClick={() => {
                    setAdmissionCategory("Public Exam");
                    setAdmissionOpen(true);
                  }}
                  className="inline-flex items-center justify-center w-max px-6 py-3 font-semibold text-white bg-academy-orange rounded-xl hover:bg-[#e6a600] transition-colors focus:ring-4 focus:ring-orange-100 shadow-lg shadow-orange-200 group-hover:shadow-orange-300"
                >
                  Explore Program
                </button>
                <a
                  href="/about_bb_academy.pdf"
                  download="BB_Academy_Brochure.pdf"
                  className="inline-flex items-center justify-center w-max px-6 py-3 font-semibold text-academy-orange bg-white/90 rounded-xl hover:bg-orange-50 transition-colors focus:ring-4 focus:ring-orange-100 shadow-sm"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Brochure
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subjects We Offer Section */}
        <div className="mb-10 md:mb-12 animate-fade-up delay-200">
          <div className="text-center mb-7 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-academy-black mb-4">
              Subjects We Offer
            </h3>
            <div className="w-16 h-1 bg-academy-orange mx-auto rounded-full"></div>
          </div>

          <div className="relative flex overflow-hidden group py-5 rounded-3xl bg-white/75 p-3 md:p-4 shadow-lg">
            {/* Gradient Masks for smooth fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-gray-50/90 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-gray-50/90 to-transparent z-10 pointer-events-none"></div>

            {/* Marquee Content Container */}
            <div className="flex animate-marquee hover:[animation-play-state:paused] w-max gap-3 md:gap-4 whitespace-nowrap">
              {/* Duplicate array for seamless infinite scroll */}
              {[...subjects, ...subjects].map((subject, index) => {
                const Icon = subject.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2.5 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-white/95 ${subject.border} rounded-full shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-default group`}
                  >
                    <div
                      className={`p-2 rounded-full ${subject.bg} ${subject.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold text-sm md:text-base group-hover:text-academy-orange transition-colors pr-1">
                      {subject.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Our Teaching & Features */}
        <div className="text-center mb-8 md:mb-9 animate-fade-up">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-academy-black mb-4">
            Our Teaching Features
          </h2>
          <div className="w-16 h-1 bg-academy-orange mx-auto rounded-full"></div>
        </div>

        {/* YouTube Video Section */}
        <div className="mb-8 md:mb-10 flex justify-center animate-fade-up">
          <div className="w-full max-w-4xl">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/dBiQcvPAKjg?si=L65SqT4yyp7yJF5X"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="soft-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-up rounded-2xl"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 flex flex-col sm:flex-row gap-4 items-start">
                <div className="p-4 bg-academy-orange/10 rounded-2xl shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-academy-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-pretty text-base">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <AdmissionFormDialog
          open={admissionOpen}
          onOpenChange={setAdmissionOpen}
          category={admissionCategory}
        />
      </div>
    </section>
  );
}
