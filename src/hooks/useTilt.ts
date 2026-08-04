import { useMotionValue, useTransform, useSpring } from "motion/react"
import { useRef } from "react"

export function useTilt(intensity = 15) {
    const ref = useRef<HTMLDivElement>(null)

    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)

    // Spring pour adoucir le mouvement
    const x = useSpring(rawX, { stiffness: 150, damping: 20 })
    const y = useSpring(rawY, { stiffness: 150, damping: 20 })

    const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity])
    const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()

        // Position normalisée entre -0.5 et 0.5
        const xPos = (e.clientX - rect.left) / rect.width - 0.5
        const yPos = (e.clientY - rect.top) / rect.height - 0.5

        rawX.set(xPos)
        rawY.set(yPos)
    }

    const handleMouseLeave = () => {
        rawX.set(0)
        rawY.set(0)
    }

    return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave }
}