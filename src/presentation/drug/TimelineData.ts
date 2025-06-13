import { JSX } from "react/jsx-runtime"

export interface TimelineData {
  date: string
  organization: string
  location: string
  type: string,
  batchID: string,
  icon: JSX.Element
}
