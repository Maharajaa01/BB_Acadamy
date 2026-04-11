"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

const stats = [
  { number: 50, label: "Expert team members", suffix: "+" },
  { number: 250, label: "No of interns trained", suffix: "+" },
  { number: 10, label: "Year of experience", suffix: "+" },
  { number: 2500, label: "No of students trained", suffix: "+" },
  { number: 300, label: "No of students at present", suffix: "+" },
]

function CountUpNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const duration = 2000 // 2 seconds animation

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = (currentTime - startTime) / duration

      if (progress < 1) {
        setCount(Math.floor(progress * target))
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(animate)
  }, [target])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 bg-academy-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-transparent border-academy-orange border-2 hover:bg-academy-orange/10 transition-colors duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-academy-orange mb-2">
                  <CountUpNumber target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-sm md:text-base text-white text-balance">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
