import {motion, useMotionValue, useTransform, animate, useInView} from "motion/react"
import {useEffect, useRef} from "react"

interface HoloCubeProps {
    size?: number
    color?: string
    delay?: number
    style?: React.CSSProperties
}

const HoloCube = ({ size = 80, color = "#00D4FF", delay = 0, style }: HoloCubeProps) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: false })

    // Particule orbitante via useMotionValue
    const progress = useMotionValue(0)
    const cx = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [20, 40, 60, 40, 20])
    const cy = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [25, 12, 25, 65, 25])

    useEffect(() => {
        const controls = animate(progress, 1, {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay,
        })
        return () => controls.stop()
    }, [])

    // Scanlines via useMotionValue
    const scanOpacity = useMotionValue(0.1)

    useEffect(() => {
        const controls = animate(scanOpacity, [0.1, 0.4, 0.1], {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
        })
        return () => controls.stop()
    }, [])

    return (
        <motion.div
            ref={ref}
            style={{ width: size, height: size, position: "relative", ...style }}
            animate={inView ? { y: [0, -14, 0] } : false}
            transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        >
            <motion.svg
                width={size}
                height={size}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.4, 1, 0.6, 1],
                    filter: [
                        `drop-shadow(0 0 4px ${color})`,
                        `drop-shadow(0 0 4px ${color})`,
                        `drop-shadow(0 0 4px ${color})`,
                        `drop-shadow(0 0 4px ${color})`,
                        `drop-shadow(0 0 4px ${color})`,
                        `drop-shadow(0 0 4px ${color})`,
                        `drop-shadow(0 0 4px ${color})`,
                        `drop-shadow(0 0 4px ${color})`,
                        `drop-shadow(0 0 4px ${color})`,
                        `drop-shadow(0 0 2px ${color})`,
                        `drop-shadow(0 0 8px ${color})`,
                        `drop-shadow(0 0 6px ${color})`,
                        `drop-shadow(0 0 4px ${color})`,
                    ],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay,
                    times: [0, 0.70, 0.75, 0.80, 0.85, 0.88, 0.90, 0.91, 0.92, 0.93, 0.95, 0.97, 1],
                }}
            >
                {/* Face avant */}
                <motion.polygon
                    points="20,25 60,25 60,65 20,65"
                    stroke={color} strokeWidth="1" fill={`${color}07`}
                    animate={{ opacity: [0.8, 0.4, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
                />
                {/* Face haut */}
                <motion.polygon
                    points="20,25 35,12 75,12 60,25"
                    stroke={color} strokeWidth="1" fill={`${color}05`}
                    animate={{ opacity: [0.7, 0.3, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 0.3 }}
                />
                {/* Face droite */}
                <motion.polygon
                    points="60,25 75,12 75,52 60,65"
                    stroke={color} strokeWidth="1" fill={`${color}04`}
                    animate={{ opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
                />

                {/* Inner edges — SVG statiques, pas de motion */}
                <line x1="20" y1="25" x2="35" y2="12" stroke={color} strokeWidth="0.5" opacity="0.4" />
                <line x1="60" y1="25" x2="75" y2="12" stroke={color} strokeWidth="0.5" opacity="0.4" />
                <line x1="75" y1="12" x2="75" y2="52" stroke={color} strokeWidth="0.5" opacity="0.4" />

                {/* Scanlines — SVG statiques avec motion.line uniquement sur opacity */}
                {[35, 45, 55].map((y, i) => (
                    <motion.line
                        key={y}
                        x1="20" y1={y} x2="60" y2={y}
                        stroke={color} strokeWidth="0.5"
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: delay + i * 0.2 }}
                    />
                ))}

                {/* Particule orbitante via useMotionValue */}
                <motion.circle
                    r="2.5"
                    fill={color}
                    style={{ cx, cy, filter: `drop-shadow(0 0 4px ${color})` }}
                />
            </motion.svg>
        </motion.div>
    )
}

export default HoloCube;