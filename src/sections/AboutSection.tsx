// src/sections/AboutSection.tsx
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import SectionLabel from "../components/SectionLabel.tsx";
import HoloCube from "@/components/HoloCube.tsx";
import { useTranslation } from "react-i18next"

type ConsoleLine =
    | { type: "typing"; text: string }
    | { type: "done"; cmd: string; out: string }

function useConsoleEffect(commands: {cmd: string; out: string}[]){
    const [lines, setLines] = useState<ConsoleLine[]>([])
    const [cmdIndex, setCmdIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [phase, setPhase] = useState<"typing" | "output" | "pause">("typing")
    const consoleRef = useRef<HTMLDivElement>(null)

    // Auto-scroll vers le bas
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight
        }
    }, [lines])

    useEffect(() => {
        const current = commands[cmdIndex % commands.length]

        if (phase === "typing") {
            if (charIndex < current.cmd.length) {
                const timeout = setTimeout(() => {
                    setLines((prev) => {
                        const next = [...prev]
                        // Remplace ou ajoute la ligne en cours de frappe
                        if (next.length > 0 && next[next.length - 1].type === "typing") {
                            next[next.length - 1] = { type: "typing", text: current.cmd.slice(0, charIndex + 1) }
                        } else {
                            next.push({ type: "typing", text: current.cmd.slice(0, charIndex + 1) })
                        }
                        return next
                    })
                    setCharIndex((c) => c + 1)
                }, 60 + Math.random() * 40) // légère variation pour effet naturel
                return () => clearTimeout(timeout)
            } else {
                // Commande finie — affiche l'output après un délai
                const timeout = setTimeout(() => {
                    setPhase("output")
                }, 200)
                return () => clearTimeout(timeout)
            }
        }

        if (phase === "output") {
            const timeout = setTimeout(() => {
                setLines((prev) => {
                    const next = [...prev]
                    // Transforme la ligne typing en done
                    if (next.length > 0 && next[next.length - 1].type === "typing") {
                        next[next.length - 1] = { type: "done", cmd: current.cmd, out: current.out }
                    }
                    return next
                })
                setPhase("pause")
            }, 150)
            return () => clearTimeout(timeout)
        }

        if (phase === "pause") {
            const timeout = setTimeout(() => {
                setCmdIndex((i) => (i + 1) % commands.length)
                setCharIndex(0)
                setPhase("typing")
            }, 800)
            return () => clearTimeout(timeout)
        }
    }, [phase, charIndex, cmdIndex, commands])

    return { lines, consoleRef }
}

const AboutSection = () => {
    const { t } = useTranslation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-80px" })

    const COMMANDS = [
        { cmd: "whoami",              out: t("about.console.whoami") },
        { cmd: "cat status.txt",      out: t("about.console.status") },
        { cmd: "cat location.txt",    out: t("about.console.location") },
        { cmd: "cat experience.txt",  out: t("about.console.experience") },
        { cmd: "cat degree.txt",      out: t("about.console.degree") },
        { cmd: "cat coffee.log",      out: t("about.console.coffee") },
        { cmd: "git log --oneline -1",out: t("about.console.git") },
        { cmd: "cat bugs.txt",        out: t("about.console.bugs") },
        { cmd: "uptime",              out: t("about.console.uptime") },
        { cmd: "cat languages.txt",   out: t("about.console.languages") },
        { cmd: "ping clients",        out: t("about.console.ping") },
        { cmd: "cat motto.txt",       out: t("about.console.motto") },
    ]

    const { lines, consoleRef } = useConsoleEffect(COMMANDS)

    return (
        <section id="about" className="relative py-28 px-6" style={{ zIndex: 1 }}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Left: text */}
                    <div>
                        <SectionLabel text={t("about.label")} />
                        <h2
                            className="text-4xl md:text-5xl font-bold mb-6"
                            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8", lineHeight: 1.1 }}
                        >
                            {t("about.title1")}
                            <br />
                            <span style={{ color: "#7B2FFF" }}>
                                {t("about.title2")}
                            </span>
                        </h2>
                        <div
                            className="space-y-4 text-base leading-relaxed"
                            style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                        >
                            <p>
                                {t("about.p1")}
                            </p>
                            <p>
                                {t("about.p2")}
                            </p>
                            <p>
                                {t("about.p3")}
                            </p>
                        </div>
                        {/*
                        <div className="mt-8 flex flex-wrap gap-3">
                            {["C++", "Unity", "Unreal", ".NET", "TypeScript", "OpenGL"].map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-3 py-1"
                                    style={{
                                        border: "1px solid rgba(0,212,255,0.25)",
                                        color: "#00D4FF",
                                        borderRadius: "3px",
                                        fontFamily: "'JetBrains Mono', monospace",
                                        background: "rgba(0,212,255,0.05)",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        */}
                    </div>

                    {/* Right: console holographique */}
                    <div className="relative flex justify-center items-center">
                        {/* Cubes décoratifs */}
                        <div className="absolute -top-8 right-0 opacity-50">
                            <HoloCube size={60} color="#7B2FFF" />
                        </div>
                        <div className="absolute -bottom-4 left-4 opacity-40">
                            <HoloCube size={44} color="#00D4FF" />
                        </div>

                        {/* Console */}
                        <div
                            className="w-full max-w-sm relative overflow-hidden"
                            style={{
                                background: "rgba(7,9,26,0.95)",
                                border: "1px solid rgba(0,212,255,0.2)",
                                borderRadius: 6,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            {/* Barre de titre */}
                            <div
                                className="flex items-center gap-2 px-4 py-3"
                                style={{
                                    borderBottom: "1px solid rgba(0,212,255,0.1)",
                                    background: "rgba(0,212,255,0.05)",
                                }}
                            >
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
                                <span className="text-xs ml-2" style={{ color: "#6B7A9E" }}>
                                    system.sh
                                </span>
                            </div>

                            {/* Contenu console */}
                            <div
                                ref={consoleRef}
                                className="px-4 py-4 overflow-hidden"
                                style={{ height: 280 }}
                            >
                                {lines.map((line, i) => (
                                    <div key={i} className="mb-3">
                                        {line.type === "typing" ? (
                                            <div className="flex items-center gap-2">
                                                <span style={{ color: "#7B2FFF" }}>›</span>
                                                <span style={{ color: "#00D4FF", fontSize: "0.7rem" }}>
                                                    {line.text}
                                                </span>
                                                {/* Curseur clignotant sur la ligne en cours */}
                                                <span
                                                    className="inline-block w-1.5 h-3.5 animate-pulse"
                                                    style={{ background: "#00D4FF" }}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <span style={{ color: "#7B2FFF" }}>›</span>
                                                    <span style={{ color: "#00D4FF", fontSize: "0.7rem" }}>
                                                        {line.cmd}
                                                    </span>
                                                </div>
                                                <div
                                                    className="ml-4"
                                                    style={{ color: "#A8B4D4", fontSize: "0.68rem", opacity: 0.8 }}
                                                >
                                                    {line.out}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Scanlines */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.02) 3px, rgba(0,212,255,0.02) 4px)",
                                }}
                            />

                            {/* Coins décoratifs */}
                            <div
                                className="absolute -top-3 -left-3 w-6 h-6 pointer-events-none"
                                style={{ borderTop: "2px solid #00D4FF", borderLeft: "2px solid #00D4FF" }}
                            />
                            <div
                                className="absolute -bottom-3 -right-3 w-6 h-6 pointer-events-none"
                                style={{ borderBottom: "2px solid #7B2FFF", borderRight: "2px solid #7B2FFF" }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutSection