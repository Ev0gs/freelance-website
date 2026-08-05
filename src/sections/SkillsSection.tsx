import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Gamepad2, Cpu, Globe, Terminal } from "lucide-react"
import SectionLabel from "../components/SectionLabel"
import HoloScan from "../components/HoloScan"
import HoloCube from "../components/HoloCube"
import LogoCloud from "@/components/LogoCloud.tsx";

const SKILLS = [
    {
        category: "Game Development",
        icon: Gamepad2,
        color: "#7B2FFF",
        items: [
            { name: "Unity / C#", level: 90 },
            { name: "Unreal Engine / C++", level: 80 },
            { name: "OpenGL / GLSL", level: 75 },
            { name: "Game Physics", level: 80 },
            { name: "Gameplay Systems", level: 92 },
        ],
    },
    {
        category: "Systems & Backend",
        icon: Cpu,
        color: "#00D4FF",
        items: [
            { name: "Java", level: 78 },
            { name: "Python", level: 85 },
            { name: "Node.js / Express", level: 80 },
            { name: "PostgreSQL", level: 72 },
            { name: "Docker / DevOps", level: 68 },
        ],
    },
    {
        category: "Web & Frontend",
        icon: Globe,
        color: "#00FF9C",
        items: [
            { name: "TypeScript / React", level: 85 },
            { name: "WebGL / Three.js", level: 70 },
            { name: "Next.js", level: 76 },
            { name: "TailwindCSS", level: 88 },
            { name: "REST / GraphQL", level: 80 },
        ],
    },
    {
        category: "Tools & Workflow",
        icon: Terminal,
        color: "#FFB800",
        items: [
            { name: "Git / GitHub", level: 95 },
            { name: "Linux / Bash", level: 82 },
            { name: "CMake / Build Systems", level: 74 },
            { name: "CI/CD Pipelines", level: 70 },
            { name: "Agile / Scrum", level: 78 },
        ],
    },
]

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-40px" })

    return (
        <div ref={ref} className="mb-3">
            <div className="flex justify-between mb-1">
        <span
            className="text-xs"
            style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
        >
          {name}
        </span>
                <span
                    className="text-xs"
                    style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
                >
          {level}%
        </span>
            </div>
            <div
                className="h-1 w-full rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
            >
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
            </div>
        </div>
    )
}

const SkillsSection = () => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <section id="skills" className="relative py-28 px-6" style={{ zIndex: 1 }}>
            <div className="absolute inset-0" style={{ background: "rgba(13,17,48,0.4)" }} />
            <div className="max-w-6xl mx-auto relative">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <SectionLabel text="Skills & expertise" />
                    <div className="flex items-end justify-between mb-6">
                        <h2
                            className="text-4xl md:text-5xl font-bold"
                            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8" }}
                        >
                            What I bring{" "}
                            <span style={{ color: "#00D4FF" }}>to the table</span>
                        </h2>
                        <div className="hidden md:block opacity-60">
                            <HoloCube size={70} color="#00D4FF" delay={0.5} />
                        </div>
                    </div>
                </motion.div>

                <LogoCloud/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {SKILLS.map((group, i) => {
                        const Icon = group.icon
                        return (
                            <motion.div
                                key={group.category}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.12 }}
                            >
                                <HoloScan
                                    color={group.color}
                                    duration={3.5 + i * 0.5}
                                    className="h-full"
                                    style={{
                                        background: "rgba(13,17,48,0.7)",
                                        border: `1px solid ${group.color}22`,
                                        borderRadius: "6px",
                                        backdropFilter: "blur(8px)",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = `${group.color}55`
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = `${group.color}22`
                                    }}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-5">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center rounded"
                                                style={{ background: `${group.color}18` }}
                                            >
                                                <Icon size={18} style={{ color: group.color }} />
                                            </div>
                                            <span
                                                className="text-sm font-semibold tracking-wide"
                                                style={{
                                                    color: group.color,
                                                    fontFamily: "'Rajdhani', sans-serif",
                                                }}
                                            >
                        {group.category}
                      </span>
                                        </div>
                                        {group.items.map((skill) => (
                                            <SkillBar key={skill.name} {...skill} color={group.color} />
                                        ))}
                                    </div>
                                </HoloScan>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SkillsSection