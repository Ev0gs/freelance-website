import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { animate, scrambleText } from "animejs";
import { ArrowRightIcon, type ArrowRightIconHandle } from "@/components/ui/arrow-right.tsx";
import { useTranslation } from "react-i18next"

const ROLES = [
    "Game Developer",
    "Full-Stack Engineer",
    "Problem Solver",
    "CS Freelancer",
    "Software Architect",
];

const HeroSection = () => {
    const { t } = useTranslation()
    const roleRef = useRef<HTMLSpanElement>(null);
    const wordIdxRef = useRef(0);
    const [started, setStarted] = useState(false);
    const arrowRef = useRef<ArrowRightIconHandle>(null);

    useEffect(() => {
        if (!roleRef.current) return;

        const playNext = () => {
            if (!roleRef.current) return;

            animate(roleRef.current, {
                innerHTML: scrambleText({
                    text: ROLES[wordIdxRef.current],
                    from: "left",
                    cursor: "░▒▓█",
                }),
                onComplete: () => {
                    setTimeout(() => {
                        wordIdxRef.current = (wordIdxRef.current + 1) % ROLES.length;
                        playNext();
                    }, 2000);
                },
            });
        };

        const timeout = setTimeout(() => {
            setStarted(true);
            playNext();
        }, 800);

        return () => clearTimeout(timeout);
    }, []);

    const holoLabels = [
        { text: t("hero.statusOnline"), top: "8%", right: "0%", color: "#00FF9C", delay: 0 },
        { text: t("SYS: v2.4.1"),   top: "45%", left: "0%", color: "#00D4FF", delay: 1.5 },
        { text: t("MODE: FREELANCE"), bottom: "25%", right: "0%", color: "#7B2FFF", delay: 3 },
    ]

    const holoEffects = (
        <>
            {/* Scanlines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.06) 3px, rgba(0,212,255,0.06) 4px)",
                }}
            />

            {/* Sweep */}
            <motion.div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                    height: "40%",
                    background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.12) 30%, rgba(0,212,255,0.18) 50%, rgba(0,212,255,0.12) 70%, transparent)",
                }}
                animate={{ top: ["-40%", "110%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Overlay holo */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(123,47,255,0.12) 0%, rgba(0,212,255,0.08) 100%)",
                }}
            />

            {/* Fondu bas */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, transparent 60%, #07091A 100%)",
                }}
            />
        </>
    )

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center px-6"
            style={{ zIndex: 1 }}
        >
            <div className="max-w-6xl mx-auto w-full pt-24 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Colonne gauche — texte */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <p
                            className="text-sm tracking-[0.3em] uppercase mb-4"
                            style={{ color: "#00D4FF", fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            {t("hero.hello")}
                        </p>
                        <h1
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-none"
                            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8" }}
                        >
                            Pierre
                            <br />
                            <span style={{ WebkitTextStroke: "2px #00D4FF", color: "transparent" }}>
                                Latorse
                            </span>
                        </h1>

                        {/* Typing effect */}
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
                            {t("hero.description")}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                className="flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-200 cursor-pointer"
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
                                {t("hero.viewWork")}
                                <ArrowRightIcon ref={arrowRef} size={16} />
                            </button>
                            <button
                                className="flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-200 cursor-pointer"
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
                                {t("hero.getInTouch")}
                            </button>
                        </div>
                    </motion.div>

                    {/* Colonne droite — photo */}
                    <motion.div
                        className="flex justify-center items-center"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    >
                        {/* Version mobile */}
                        <div className="block lg:hidden relative w-full h-[400px]">
                            <div
                                className="absolute inset-0"
                                style={{
                                    maskImage: "url('/photo-mobile.webp')",
                                    maskSize: "contain",
                                    maskRepeat: "no-repeat",
                                    maskPosition: "center bottom",
                                    WebkitMaskImage: "url('/photo-mobile.webp')",
                                    WebkitMaskSize: "contain",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center bottom",
                                }}
                            >
                                <picture>
                                    <source srcSet="/photo-mobile.webp" type="image/webp" />
                                    <img
                                        src="/photo-mobile.png"
                                        alt="Pierre Latorse — Freelance Software Engineer"
                                        fetchPriority="high"
                                        className="w-full h-full object-contain object-bottom"
                                        style={{ filter: "saturate(0.8) brightness(0.85)" }}
                                    />
                                </picture>
                                {holoEffects}
                            </div>

                            {/* Labels holographiques mobile */}
                            {[
                                { text: t("hero.statusOnline"),  top: "5%",   right: "5%", color: "#00FF9C", delay: 0   },
                                { text: t("hero.sysVersion"),    top: "40%",  left: "2%",  color: "#00D4FF", delay: 1.5 },
                                { text: t("hero.modeFreelance"), bottom: "30%", right: "2%", color: "#7B2FFF", delay: 3  },
                            ].map((label, i) => (
                                <motion.div
                                    key={label.text}
                                    className="absolute text-xs px-2 py-1 whitespace-nowrap"
                                    style={{
                                        top: label.top,
                                        bottom: (label as any).bottom,
                                        left: (label as any).left,
                                        right: label.right,
                                        color: label.color,
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: "0.55rem",
                                        background: `${label.color}10`,
                                        border: `1px solid ${label.color}30`,
                                        borderRadius: 3,
                                        zIndex: 4,
                                    }}
                                    animate={{
                                        y: [0, -10, 0],
                                        opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.4, 1, 0.6, 1],
                                        filter: [
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 1px ${label.color})`,
                                            `drop-shadow(0 0 6px ${label.color})`,
                                            `drop-shadow(0 0 5px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                        ],
                                    }}
                                    transition={{
                                        y: {
                                            duration: 4 + i * 0.8,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: label.delay,
                                        },
                                        opacity: {
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: label.delay,
                                            times: [0, 0.70, 0.75, 0.80, 0.85, 0.88, 0.90, 0.91, 0.92, 0.93, 0.95, 0.97, 1],
                                        },
                                        filter: {
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: label.delay,
                                            times: [0, 0.70, 0.75, 0.80, 0.85, 0.88, 0.90, 0.91, 0.92, 0.93, 0.95, 0.97, 1],
                                        },
                                    }}
                                >
                                    {label.text}
                                </motion.div>
                            ))}
                        </div>

                        {/* Version desktop */}
                        <div className="hidden lg:block relative w-full min-h-[700px]">
                            <div
                                className="absolute inset-0"
                                style={{
                                    maskImage: "url('/photo.webp')",
                                    maskSize: "cover",
                                    maskRepeat: "no-repeat",
                                    maskPosition: "center",
                                    WebkitMaskImage: "url('/photo.webp')",
                                    WebkitMaskSize: "cover",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center",
                                }}
                            >
                                <picture>
                                    <source srcSet="/photo.webp" type="image/webp" />
                                    <img
                                        src="/photo.png"
                                        alt="Pierre Latorse — Freelance Software Engineer"
                                        fetchPriority="high"
                                        className="w-full h-full object-cover"
                                        style={{ filter: "saturate(0.8) brightness(0.85)" }}
                                    />
                                </picture>
                                {holoEffects}

                                {/* Fondu gauche — desktop uniquement */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(to right, #07091A 0%, transparent 30%)",
                                    }}
                                />
                            </div>

                            {/* Labels holographiques desktop */}
                            {holoLabels.map((label, i) => (
                                <motion.div
                                    key={label.text}
                                    className="absolute text-xs px-2 py-1 whitespace-nowrap"
                                    style={{
                                        top: label.top,
                                        bottom: (label as any).bottom,
                                        left: (label as any).left,
                                        right: label.right,
                                        color: label.color,
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: "0.6rem",
                                        background: `${label.color}10`,
                                        border: `1px solid ${label.color}30`,
                                        borderRadius: 3,
                                        zIndex: 4,
                                    }}
                                    animate={{
                                        y: [0, -10, 0],
                                        opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.4, 1, 0.6, 1],
                                        filter: [
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                            `drop-shadow(0 0 1px ${label.color})`,
                                            `drop-shadow(0 0 6px ${label.color})`,
                                            `drop-shadow(0 0 5px ${label.color})`,
                                            `drop-shadow(0 0 3px ${label.color})`,
                                        ],
                                    }}
                                    transition={{
                                        y: {
                                            duration: 4 + i * 0.8,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: label.delay,
                                        },
                                        opacity: {
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: label.delay,
                                            times: [0, 0.70, 0.75, 0.80, 0.85, 0.88, 0.90, 0.91, 0.92, 0.93, 0.95, 0.97, 1],
                                        },
                                        filter: {
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: label.delay,
                                            times: [0, 0.70, 0.75, 0.80, 0.85, 0.88, 0.90, 0.91, 0.92, 0.93, 0.95, 0.97, 1],
                                        },
                                    }}
                                >
                                    {label.text}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll indicator */}
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
        </section>
    )
}

export default HeroSection