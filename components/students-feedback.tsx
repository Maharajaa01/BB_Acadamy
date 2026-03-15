"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"

// Complete list of YouTube Links
const youtubeLinks = [
    "https://youtu.be/1QYgntMxIEU",
    "https://youtu.be/TUxfSDnTmBU",
    "https://youtu.be/LsN2IJG25LQ",
    "https://youtu.be/1Ht0dNeTbaI",
    "https://youtu.be/OhCRSBzxqnM",
    "https://youtu.be/EC-CkrqZJyw",
    "https://youtu.be/MQqAtL2z0iA",
    "https://youtu.be/dCwo7F7XAd0",
    "https://youtu.be/sQrJ7qRLDqQ",
    "https://youtu.be/NN2CxlCYwyw",
    "https://youtu.be/hpiBEoRUEEQ",
    "https://youtube.com/shorts/CWi5koVAsyg",
    "https://youtube.com/shorts/g5c_uXnbes4",
    "https://youtube.com/shorts/f5NzQIcRz7Q",
    "https://youtu.be/q6woRK2_dIc",
    "https://youtu.be/Z8tkz22-vrQ",
    "https://youtu.be/kuov_uWyaqY",
    "https://youtu.be/Hr-VIPeDdLg",
    "https://youtu.be/CEYCYGwBKgg",
    "https://youtu.be/Sx-nGl2LLGM",
    "https://youtu.be/HS4SrPk3FZE",
    "https://youtu.be/Y02khMjYJLQ",
    "https://youtu.be/VvRKnaV9d5A",
    "https://youtu.be/1jwxa_2B7N4",
    "https://youtu.be/2G6yBCRgdtw",
    "https://youtu.be/KsiNZxyfpzA",
    "https://youtu.be/6u4firKUJCg",
    "https://youtu.be/pc525bd17jw",
    "https://youtu.be/JQfBWhsh4xk",
    "https://youtu.be/uuEqoKZFqPM",
    "https://youtube.com/shorts/94p-CDnWzVA",
]

// Helper to extract video ID from various YouTube URL formats
function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\/shorts\/)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
}

// Group videos into columns for the Veranda Race masonry layout
// The reference image shows an alternating pattern of columns with 1 or 2 images,
// with some images having a colored pill badge beneath them.
const videoColumns = [
    {
        items: [
            { id: getYouTubeId(youtubeLinks[0])!, isShort: false, badgeColor: "bg-emerald-500", class: "w-[160px] h-[220px]" },
        ],
        className: "pt-32"
    },
    {
        items: [
            { id: getYouTubeId(youtubeLinks[1])!, isShort: false, badgeColor: null, class: "w-[180px] h-[260px]" },
            { id: getYouTubeId(youtubeLinks[2])!, isShort: false, badgeColor: null, class: "w-[180px] h-[220px]" },
        ],
        className: "pt-10 space-y-8"
    },
    {
        items: [
            { id: getYouTubeId(youtubeLinks[3])!, isShort: false, badgeColor: null, class: "w-[200px] h-[300px]" },
            { id: getYouTubeId(youtubeLinks[4])!, isShort: false, badgeColor: null, class: "w-[200px] h-[200px]" },
        ],
        className: "pt-24 space-y-12"
    },
    {
        items: [
            { id: getYouTubeId(youtubeLinks[5])!, isShort: false, badgeColor: "bg-pink-600", class: "w-[220px] h-[320px]" },
        ],
        className: "pt-40"
    },
    {
        items: [
            { id: getYouTubeId(youtubeLinks[6])!, isShort: false, badgeColor: null, class: "w-[190px] h-[280px]" },
            { id: getYouTubeId(youtubeLinks[7])!, isShort: false, badgeColor: null, class: "w-[190px] h-[220px]" },
        ],
        className: "pt-32 space-y-10"
    },
    {
        items: [
            { id: getYouTubeId(youtubeLinks[8])!, isShort: false, badgeColor: "bg-emerald-500", class: "w-[210px] h-[310px]" },
        ],
        className: "pt-24"
    },
    {
        items: [
            { id: getYouTubeId(youtubeLinks[9])!, isShort: false, badgeColor: null, class: "w-[180px] h-[260px]" },
            { id: getYouTubeId(youtubeLinks[10])!, isShort: false, badgeColor: null, class: "w-[180px] h-[220px]" },
        ],
        className: "pt-10 space-y-8"
    }
]

export function StudentsFeedback() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null)

    // Duplicate the columns to create the seamless infinite scroll effect
    const duplicatedColumns = [...videoColumns, ...videoColumns, ...videoColumns]

    return (
        <section id="students-feedback" className="py-24 relative overflow-hidden bg-white">
            {/* Light Grid Background styling matching Veranda Race */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.4]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
          `,
                    backgroundSize: "80px 80px"
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-16 animate-fade-up">
                <h2 className="text-4xl md:text-5xl font-heading text-academy-black mb-4 tracking-tight font-medium">
                    More than 3,000+ Students Trained
                </h2>
                <p className="text-lg text-gray-800 max-w-4xl mx-auto tracking-wide leading-relaxed">
                    More than 3,000+ Students Trained and Secured Excellent Marks in Their Academics
                    Empowering school students with structured coaching, expert guidance, and consistent practice to achieve top scores in board examinations.
                </p>
                <div className="w-0 h-0 bg-transparent mx-auto mt-0"></div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden py-10 min-h-[600px]">
                <div className="flex animate-marquee hover:[animation-play-state:paused] w-max gap-8 md:gap-12 items-start px-6">
                    {duplicatedColumns.map((col, colIndex) => (
                        <div key={colIndex} className={`flex flex-col ${col.className}`}>
                            {col.items.map((item, itemIndex) => {
                                const thumbnailUrl = `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`

                                return (
                                    <div key={`${colIndex}-${itemIndex}`} className="flex flex-col items-center">
                                        <div
                                            onClick={() => setActiveVideo(item.id)}
                                            className={`relative group cursor-pointer overflow-hidden rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.03] flex-shrink-0 bg-gray-100 ${item.class}`}
                                        >
                                            {/* Thumbnail Image */}
                                            <Image
                                                src={thumbnailUrl}
                                                alt={`Student Feedback`}
                                                fill
                                                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 300px, 400px"
                                                loading="lazy"
                                            />

                                            {/* Very Light Dark Overlay on Hover */}
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

                                            {/* Play Button Overlay (Smaller and center matched) */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-black/60 shadow-md">
                                                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Colored pill badge below the card if specified */}
                                        {item.badgeColor && (
                                            <div className={`mt-6 h-3 rounded-full w-3/4 ${item.badgeColor}`} />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
                    <button
                        onClick={() => setActiveVideo(null)}
                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black animate-scale-in relative border border-white/10">
                        <iframe
                            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                </div>
            )}
        </section>
    )
}
