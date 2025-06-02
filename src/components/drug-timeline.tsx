import type React from "react"
import { cn } from "@/lib/utils"

type TimelineItem = {
  date: string
  organization: string
  location: string
  type: string
  icon: React.ReactNode
}

type DrugTimelineProps = {
  timeline: TimelineItem[]
}

export default function DrugTimeline({ timeline }: DrugTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[22px] top-2 bottom-2 w-0.5 bg-gray-200 z-0"></div>

      <div className="space-y-8">
        {timeline.map((item, index) => (
          <div key={index} className="relative flex items-start gap-6">
            {/* Timeline dot */}
            <div
              className={cn(
                "z-10 flex items-center justify-center w-11 h-11 rounded-full border-4 border-white shadow-sm",
                item.type === "manufacturer" && "bg-primary/10",
                item.type === "distributor" && "bg-blue-50",
                item.type === "clinic" && "bg-green-50",
              )}
            >
              <div
                className={cn(
                  "text-primary",
                  item.type === "distributor" && "text-blue-500",
                  item.type === "clinic" && "text-green-600",
                )}
              >
                {item.icon}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="text-lg font-medium text-gray-800 mb-1">{item.date}</div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="font-semibold text-gray-800">{item.organization}</div>
                <div className="text-gray-500">{item.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
