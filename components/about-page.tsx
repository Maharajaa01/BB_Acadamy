"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Award, Heart, History, TrendingUp, UserCheck, ShieldCheck, Target, BarChart, Lightbulb, User } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-academy-black text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-academy-orange/20 via-transparent to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Badge className="mb-6 bg-academy-orange hover:bg-orange-600 text-white border-none px-4 py-1 text-sm animate-fade-up">
                        Since 2016
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-balance animate-fade-up delay-100">
                        Empowering Students to <span className="text-academy-orange">Excel</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty animate-fade-up delay-200">
                        From a humble beginning to Chennai's premier tuition center, driven by passion and a commitment to making learning easy.
                    </p>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative animate-fade-up">
                        <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 relative shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            {/* Placeholder for Founder Image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                                <span className="text-lg">Add Photo: Tamil Selvan</span>
                                {/* User should replace this div with: <Image src="/founder.jpg" alt="Tamil Selvan" fill className="object-cover" /> */}
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs animate-scale-in delay-300 hidden md:block">
                            <p className="font-heading font-bold text-lg text-academy-black">"Education is the most powerful weapon which you can use to change the world."</p>
                        </div>
                    </div>

                    <div className="space-y-6 animate-fade-up delay-200">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black">
                            Meet the Founder<br />
                            <span className="text-academy-orange">Mr. Tamil Selvan</span>
                        </h2>
                        <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                            <p>
                                Started in 2016 with a burning passion for teaching, Mr. Tamil Selvan founded Black Building Academy with a simple mission: <strong>Make Learning Easy</strong>.
                            </p>
                            <p>
                                He believes in motivating students not just through grades, but through appreciation. His unique philosophy includes rewarding students with gifts and constant encouragement.
                            </p>
                            <div className="p-4 bg-orange-50 border-l-4 border-academy-orange rounded-r-lg">
                                <p className="font-medium text-academy-black italic">
                                    "If a student excels in learning, I don't ask for fees. My reward is their success."
                                </p>
                                <div className="mt-2 text-sm text-gray-500">- Tamil Selvan's Philosophy</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Heart className="w-5 h-5" /></div>
                                <span className="font-medium">Passionate Teaching</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600"><Award className="w-5 h-5" /></div>
                                <span className="font-medium">Student Motivation</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><UserCheck className="w-5 h-5" /></div>
                                <span className="font-medium">Personal Attention</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600"><Users className="w-5 h-5" /></div>
                                <span className="font-medium">Community Focus</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-12 animate-fade-up">Our Journey on Video</h2>
                    <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl animate-fade-up delay-100">
                        <div className="aspect-video relative">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/wvW4bf_q-PA?si=ft2uQ_IgKgyrF1u-"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 container mx-auto px-4 bg-white">
                <div className="text-center mb-16 animate-fade-up">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-6">Why Choose BB Academy?</h2>
                    <div className="w-24 h-1.5 bg-academy-orange mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Experienced Faculty */}
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none shadow-lg glass animate-fade-up">
                        <CardContent className="p-8">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-academy-black mb-3">Experienced Faculty</h3>
                            <p className="text-gray-600 leading-relaxed">Our team of qualified educators brings extensive experience and dedication, fostering a supportive and enriching learning environment.</p>
                        </CardContent>
                    </Card>

                    {/* Safe Environment */}
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none shadow-lg glass animate-fade-up delay-100">
                        <CardContent className="p-8">
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-academy-black mb-3">Safe & Supportive</h3>
                            <p className="text-gray-600 leading-relaxed">We prioritize student safety and well-being, creating a nurturing atmosphere that allows students to focus on their academic growth without distractions.</p>
                        </CardContent>
                    </Card>

                    {/* 100% Pass */}
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none shadow-lg glass animate-fade-up delay-200">
                        <CardContent className="p-8">
                            <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 text-yellow-600">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-academy-black mb-3">100% Pass Guarantee</h3>
                            <p className="text-gray-600 leading-relaxed">We are confident in our teaching methods and programs, helping students reach their full potential with a guaranteed pass in public exams.</p>
                        </CardContent>
                    </Card>

                    {/* Performance Tracking */}
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none shadow-lg glass animate-fade-up delay-300">
                        <CardContent className="p-8">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                                <BarChart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-academy-black mb-3">Performance Tracking</h3>
                            <p className="text-gray-600 leading-relaxed">Regular assessments and detailed feedback through our Performance Report Card System enable effective progress monitoring.</p>
                        </CardContent>
                    </Card>

                    {/* Innovative Techniques */}
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none shadow-lg glass animate-fade-up delay-400">
                        <CardContent className="p-8">
                            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-600">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-academy-black mb-3">Innovative Learning</h3>
                            <p className="text-gray-600 leading-relaxed">BB Academy employs modern, competitive learning methods to encourage a healthy competitive spirit, driving students to perform at their best.</p>
                        </CardContent>
                    </Card>

                    {/* Personalized Learning */}
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none shadow-lg glass animate-fade-up delay-500">
                        <CardContent className="p-8">
                            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                                <User className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-academy-black mb-3">Personalized Learning</h3>
                            <p className="text-gray-600 leading-relaxed">Batch-wise coaching and separate classes for boys and girls ensure focused attention tailored to individual needs.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 container mx-auto px-4 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16 animate-fade-up">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-6">Frequently Asked Questions</h2>
                        <p className="text-gray-600 text-lg">Common questions about admissions and our coaching methods.</p>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4 animate-fade-up delay-100">
                        <AccordionItem value="item-1" className="bg-white rounded-xl border px-6 shadow-sm">
                            <AccordionTrigger className="text-lg font-semibold text-academy-black hover:text-academy-orange hover:no-underline">What standards/grades do you cover?</AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                We provide expert coaching for students from 6th to 12th standard, covering State Board curriculum with specialized focus on 10th and 12th board exams.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="bg-white rounded-xl border px-6 shadow-sm">
                            <AccordionTrigger className="text-lg font-semibold text-academy-black hover:text-academy-orange hover:no-underline">Do you offer separate classes for boys and girls?</AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                Yes, we ensure a comfortable learning environment by offering separate batches and classes for boys and girls to provide personalized attention and focus.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="bg-white rounded-xl border px-6 shadow-sm">
                            <AccordionTrigger className="text-lg font-semibold text-academy-black hover:text-academy-orange hover:no-underline">How do you ensure student progress?</AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                We use a comprehensive Performance Tracking System with regular report cards, daily attendance monitoring, and the unique 'Seal System' to track and improve student performance continuously.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {/* Growth Timeline */}
            <section className="py-20 container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-16 text-center animate-fade-up">Our Growth Story</h2>

                <div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px md:before:mx-auto before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">

                    {/* 2016 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fade-up">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-200 group-hover:bg-academy-orange transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                            <History className="w-5 h-5 text-gray-500 group-hover:text-white" />
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 shadow-md hover:shadow-lg transition-all glass">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-2xl text-academy-orange">2016</span>
                                <Badge variant="outline">The Beginning</Badge>
                            </div>
                            <p className="text-gray-700">Started the journey with just <strong className="text-academy-black">3 employees</strong> and <strong className="text-academy-black">12 students</strong>. The vision was clear: Quality education for all.</p>
                        </Card>
                    </div>

                    {/* Growth Phase */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fade-up delay-100">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-200 group-hover:bg-academy-orange transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                            <TrendingUp className="w-5 h-5 text-gray-500 group-hover:text-white" />
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 shadow-md hover:shadow-lg transition-all glass">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-2xl text-academy-orange">Expansion</span>
                                <Badge variant="outline">Growth</Badge>
                            </div>
                            <p className="text-gray-700">The dedication paid off. We grew to <strong className="text-academy-black">50+ students</strong> and expanded our team to <strong className="text-academy-black">10 staff members</strong>.</p>
                        </Card>
                    </div>

                    {/* Present Day */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fade-up delay-200">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-200 group-hover:bg-academy-orange transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                            <Award className="w-5 h-5 text-gray-500 group-hover:text-white" />
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 shadow-md hover:shadow-lg transition-all glass border-academy-orange/20 bg-orange-50/50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-2xl text-academy-orange">Today</span>
                                <Badge className="bg-academy-orange">Milestone</Badge>
                            </div>
                            <p className="text-gray-700">Currently empowering over <strong className="text-academy-black">500+ students</strong> with a dedicated team of <strong className="text-academy-black">50+ staff</strong>. We are now a landmark in education.</p>
                        </Card>
                    </div>

                </div>
            </section>

            {/* Stats Banner */}
            <section className="py-16 bg-academy-black text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-academy-orange/10 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="animate-fade-up">
                        <div className="text-4xl md:text-5xl font-bold text-academy-orange mb-2">500+</div>
                        <div className="text-gray-400">Happy Students</div>
                    </div>
                    <div className="animate-fade-up delay-100">
                        <div className="text-4xl md:text-5xl font-bold text-academy-orange mb-2">50+</div>
                        <div className="text-gray-400">Expert Staff</div>
                    </div>
                    <div className="animate-fade-up delay-200">
                        <div className="text-4xl md:text-5xl font-bold text-academy-orange mb-2">10+</div>
                        <div className="text-gray-400">Years Experience</div>
                    </div>
                    <div className="animate-fade-up delay-300">
                        <div className="text-4xl md:text-5xl font-bold text-academy-orange mb-2">100%</div>
                        <div className="text-gray-400">Success Rate</div>
                    </div>
                </div>
            </section>

        </div>
    )
}
