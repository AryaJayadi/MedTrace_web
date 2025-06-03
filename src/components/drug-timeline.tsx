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
      <div className="absolute left-[22px] top-2 bottom-2 w-0.5 bg-border z-0" aria-hidden="true"></div>

      <div className="space-y-8">
        {timeline.map((item, index) => (
          <div key={index} className="relative flex items-start gap-x-4 sm:gap-x-6"> {/* Added gap-x for responsiveness */}
            <div
              className={"z-10 flex flex-shrink-0 items-center justify-center w-11 h-11 rounded-full border-4 shadow-sm border-background bg-accent"}
            >
              <div
                className={"text-primary text-muted-foreground"}
              >
                {item.icon}
              </div>
            </div>

            <div className="flex-1 pt-1 min-w-0"> {/* Added min-w-0 for flex truncation if needed */}
              <div className="text-base font-medium text-foreground mb-1">{item.date}</div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <div className="font-semibold text-foreground">{item.organization}</div>
                <div className="text-sm text-muted-foreground">{item.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}
