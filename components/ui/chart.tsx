"use client"

import { useEffect, useRef } from "react"
import { Chart as ChartJS, registerables } from "chart.js"

ChartJS.register(...registerables)

interface ChartProps {
  type: "line" | "bar" | "doughnut" | "pie" | "scatter" | "polarArea"
  data: any
  options?: any
}

export function Chart({ type, data, options }: ChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<ChartJS | null>(null)

  useEffect(() => {
    const chartCanvas = chartRef.current

    if (!chartCanvas) {
      return
    }

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartCanvas.getContext("2d")

    if (!ctx) {
      return
    }

    chartInstance.current = new ChartJS(ctx, {
      type: type,
      data: data,
      options: options,
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [type, data, options])

  return <canvas ref={chartRef} />
}
