"use client"

import { useEffect } from "react"

export function AnimatedBackground() {
  useEffect(() => {
    const bgAnimation = document.getElementById("bgAnimation")

    if (bgAnimation) {
      // Clear existing boxes if component remounts
      bgAnimation.querySelectorAll(".colorBox").forEach((box) => box.remove())

      const numberOfColorBoxes = 400

      for (let i = 0; i < numberOfColorBoxes; i++) {
        const colorBox = document.createElement("div")
        colorBox.classList.add("colorBox")
        bgAnimation.append(colorBox)
      }
    }

    return () => {
      // Cleanup function
      const bgAnimation = document.getElementById("bgAnimation")
      if (bgAnimation) {
        bgAnimation.querySelectorAll(".colorBox").forEach((box) => box.remove())
      }
    }
  }, [])

  return (
    <div className="bgAnimation" id="bgAnimation">
      <div className="backgroundAnim"></div>
    </div>
  )
}
