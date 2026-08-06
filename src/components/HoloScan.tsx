import { motion } from "motion/react"
import React from "react"

interface HoloScanProps {
    color?: string
    duration?: number
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
}

const HoloScan = ({
                      color = "#00D4FF",
                      duration = 3,
                      children,
                      style,
                      className,
                      onMouseEnter,
                      onMouseLeave,
                  }: HoloScanProps) => {
    return (
        <div
            className={`relative overflow-hidden ${className ?? ""}`}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}

            {/* Scanlines statiques */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            ${color}05 3px,
            ${color}05 4px
          )`,
                    zIndex: 2,
                }}
            />

            {/* Sweep lumineux animé */}
            <motion.div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                    willChange: "transform",
                    top: 0,
                    height: "35%",
                    background: `linear-gradient(
                        to bottom,
                        transparent,
                        ${color}08 30%,
                        ${color}14 50%,
                        ${color}08 70%,
                        transparent
                      )`,
                    zIndex: 3,
                }}
                animate={{ y: ["-135%", "210%"] }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    )
}

export default HoloScan