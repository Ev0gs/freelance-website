import { motion } from "motion/react";
import {useEffect, useRef, useState} from "react";
import {ChevronDown} from "lucide-react";
import { animate, scrambleText } from "animejs";
import {ArrowRightIcon, type ArrowRightIconHandle} from "@/components/ui/arrow-right.tsx";

const ROLES = [
    "Game Developer",
    "Full-Stack Engineer",
    "Problem Solver",
    "CS Freelancer",
    "Software Architect",
];

const HeroSection = () => {
    const roleRef = useRef<HTMLSpanElement>(null);
    const wordIdxRef = useRef(0);
    const [started, setStarted] = useState(false);

    const arrowRef = useRef<ArrowRightIconHandle>(null)

    useEffect(() => {
        if (!roleRef.current) return;

        const playNext = () => {
            if (!roleRef.current) return;

            animate(roleRef.current, {
                innerHTML: scrambleText({
                    text: ROLES[wordIdxRef.current],
                    from: 'left',
                    cursor: '░▒▓█',
                }),
                onComplete: () => {
                    setTimeout(() => {
                        wordIdxRef.current = (wordIdxRef.current + 1) % ROLES.length;
                        playNext();
                    }, 2000);
                },
            });
        };

        // Petit délai avant le premier mot
        const timeout = setTimeout(() => {
            setStarted(true);
            playNext();
        }, 800);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center px-6"
            style={{ zIndex: 1 }}
        >
            <div className="max-w-6xl mx-auto w-full pt-24 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <p
                        className="text-sm tracking-[0.3em] uppercase mb-4"
                        style={{ color: "#00D4FF", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        // Hello, world
                    </p>
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-none"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8" }}
                    >
                        Alex
                        <br />
                        <span
                            style={{
                                WebkitTextStroke: "2px #00D4FF",
                                color: "transparent",
                            }}
                        >
              Mercer
            </span>
                    </h1>

                    {/* Typing effect avec anime.js */}
                    <div
                        className="text-xl md:text-2xl font-medium mb-8 h-8"
                        style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                    >
                        <span style={{ color: "#7B2FFF" }}>_</span>
                        <span ref={roleRef}>
                            {!started ? ROLES[0] : ""}
                        </span>
                    </div>
                    <p
                        className="text-base md:text-lg max-w-xl mb-10 leading-relaxed"
                        style={{ color: "#6B7A9E", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                    >
                        I turn complex problems into elegant code. Whether it's shipping a
                        game mechanic that feels right, or architecting a backend that scales
                        — I build solutions that actually matter to clients.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            className="flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-200"
                            style={{
                                background: "#00D4FF",
                                color: "#07091A",
                                borderRadius: "4px",
                                fontFamily: "'Rajdhani', sans-serif",
                                letterSpacing: "0.1em",
                                fontSize: "0.95rem",
                            }}
                            onClick={() =>
                                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                            }
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#33DDFF";
                                e.currentTarget.style.transform = "translateY(-2px)";
                                arrowRef.current?.startAnimation();
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#00D4FF";
                                e.currentTarget.style.transform = "translateY(0)";
                                arrowRef.current?.stopAnimation();
                            }}
                        >
                            VIEW MY WORK
                            <ArrowRightIcon ref={arrowRef} size={16} />
                        </button>
                        <button
                            className="flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-200"
                            style={{
                                border: "1px solid rgba(123,47,255,0.5)",
                                color: "#A8B4D4",
                                borderRadius: "4px",
                                fontFamily: "'Rajdhani', sans-serif",
                                letterSpacing: "0.1em",
                                fontSize: "0.95rem",
                            }}
                            onClick={() =>
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                            }
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#7B2FFF";
                                e.currentTarget.style.color = "#E2E8F8";
                                e.currentTarget.style.background = "rgba(123,47,255,0.12)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(123,47,255,0.5)";
                                e.currentTarget.style.color = "#A8B4D4";
                                e.currentTarget.style.background = "transparent";
                            }}
                        >
                            GET IN TOUCH
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
          <span
              className="text-xs tracking-widest"
              style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
          >
            SCROLL
          </span>
                    <ChevronDown
                        size={18}
                        className="animate-bounce"
                        style={{ color: "#00D4FF" }}
                    />
                </motion.div>
            </div>

            {/* Decorative floating stat chips */}
            {/*<motion.div
                className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col gap-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                {[
                    { label: "Projects shipped", value: "12+" },
                    { label: "Years coding", value: "6+" },
                    { label: "Happy clients", value: "8" },
                    { label: "Lines written", value: "∞" },
                ].map((s) => (
                    <div
                        key={s.label}
                        className="px-5 py-3 flex flex-col"
                        style={{
                            background: "rgba(13,17,48,0.8)",
                            border: "1px solid rgba(0,212,255,0.15)",
                            borderRadius: "4px",
                            backdropFilter: "blur(8px)",
                        }}
                    >
            <span
                className="text-2xl font-bold"
                style={{ color: "#00D4FF", fontFamily: "'Rajdhani', sans-serif" }}
            >
              {s.value}
            </span>
                        <span
                            className="text-xs"
                            style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
                        >
              {s.label}
            </span>
                    </div>
                ))}
            </motion.div>
            */}
        </section>
    )
}

export default HeroSection