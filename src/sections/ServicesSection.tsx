import {useRef, useState} from "react";
import {motion, useInView} from "motion/react";
import SectionLabel from "@/components/SectionLabel.tsx";
import {Gamepad2} from "lucide-react";
import {ArrowRightIcon, type ArrowRightIconHandle} from "@/components/ui/arrow-right.tsx";
import { CpuIcon, type CpuIconHandle } from "@/components/ui/cpu.tsx"
import { EarthIcon, type EarthIconHandle } from "@/components/ui/earth.tsx"
import { WrenchIcon, type WrenchIconHandle } from "@/components/ui/wrench.tsx"
import { LayersIcon, type LayersIconHandle } from "@/components/ui/layers.tsx"
import { FlaskIcon, type FlaskIconHandle } from "@/components/ui/flask.tsx"
import { BotIcon, type BotIconHandle } from "@/components/ui/bot.tsx"
import { useTranslation } from "react-i18next"

type AnyIconHandle = CpuIconHandle | EarthIconHandle | WrenchIconHandle | LayersIconHandle | FlaskIconHandle

// Composant icône par index de service
function ServiceIcon({ index, color, iconRef }: { index: number; color: string; iconRef: React.Ref<AnyIconHandle> }) {
    const props = { size: 22, style: { color } }
    switch (index) {
        case 0:
            // Gamepad2 n'a pas d'icône animée — lucide-react classique
            return <Gamepad2 size={22} style={{ color }} />
        case 1:
            return <CpuIcon ref={iconRef as React.Ref<CpuIconHandle>} {...props} />
        case 2:
            return <EarthIcon ref={iconRef as React.Ref<EarthIconHandle>} {...props} />
        case 3:
            return <WrenchIcon ref={iconRef as React.Ref<WrenchIconHandle>} {...props} />
        case 4:
            return <LayersIcon ref={iconRef as React.Ref<LayersIconHandle>} {...props} />
        case 5:
            return <FlaskIcon ref={iconRef as React.Ref<FlaskIconHandle>} {...props} />
        default:
            return null
    }
}

interface Service {
    title: string
    subtitle: string
    color: string
    description: string
    tags: string[]
}

function ServiceCard({ service, delay, inView, index }: {
    service: Service
    delay: number
    inView: boolean
    index: number
}) {
    const [hovered, setHovered] = useState(false)
    const iconRef = useRef<AnyIconHandle>(null)

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="service-card relative flex flex-col p-6 overflow-hidden"
            style={{
                background: hovered ? `${service.color}0A` : "rgba(13,17,48,0.65)",
                border: `1px solid ${hovered ? service.color + "45" : service.color + "18"}`,
                borderRadius: 8,
                backdropFilter: "blur(8px)",
                transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                boxShadow: hovered ? `0 0 40px ${service.color}14, inset 0 0 40px ${service.color}06` : "none",
                cursor: "default",
            }}
            onMouseEnter={() => {
                setHovered(true)
                iconRef.current?.startAnimation()
            }}
            onMouseLeave={() => {
                setHovered(false)
                iconRef.current?.stopAnimation()
            }}
        >
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.013) 3px, rgba(0,212,255,0.013) 4px)", borderRadius: 8 }} />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none" style={{ borderTop: `1px solid ${service.color}60`, borderLeft: `1px solid ${service.color}60`, borderTopLeftRadius: 8 }} />
            <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none" style={{ borderBottom: `1px solid ${service.color}30`, borderRight: `1px solid ${service.color}30`, borderBottomRightRadius: 8 }} />

            {/* Icône animée */}
            <div
                className="service-icon-wrap mb-5 w-12 h-12 flex items-center justify-center"
                style={{
                    background: `${service.color}15`,
                    border: `1px solid ${service.color}35`,
                    borderRadius: 8,
                    boxShadow: hovered ? `0 0 20px ${service.color}30` : "none",
                    transition: "transform 0.3s, box-shadow 0.3s",
                }}
            >
                <ServiceIcon index={index} color={service.color} iconRef={iconRef} />
            </div>

            {/* Text */}
            <p className="text-xs mb-1" style={{ color: service.color, fontFamily: "'JetBrains Mono', monospace", opacity: 0.8 }}>
                {service.subtitle}
            </p>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8" }}>
                {service.title}
            </h3>
            <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#7A8BB0", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                {service.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs px-2 py-0.5"
                        style={{ background: `${service.color}0F`, color: service.color, border: `1px solid ${service.color}22`, borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", opacity: 0.85 }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    )
}

const ServicesSection = () => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-80px" })
    const { t } = useTranslation()

    const arrowRightIconRef = useRef<ArrowRightIconHandle>(null)
    const botIconRef = useRef<BotIconHandle>(null)

    const SERVICES = [
        {
            id: "game-dev",
            title: t("services.items.gameDev.title"),
            subtitle: t("services.items.gameDev.subtitle"),
            color: "#7B2FFF",
            description: t("services.items.gameDev.description"),
            tags: ["C++", "Unreal", "Unity", "OpenGL", "Gameplay", "Shaders", "Physics"],
        },
        {
            id: "systems",
            title: t("services.items.systems.title"),
            subtitle: t("services.items.systems.subtitle"),
            color: "#00D4FF",
            description: t("services.items.systems.description"),
            tags: ["C++", "C#", ".NET", "Rust", "Networking", "Embedded", "Optimization", "Concurrency"],
        },
        {
            id: "web",
            title: t("services.items.web.title"),
            subtitle: t("services.items.web.subtitle"),
            color: "#00FF9C",
            description: t("services.items.web.description"),
            tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Next.js", "Docker"],
        },
        {
            id: "tools",
            title: t("services.items.tools.title"),
            subtitle: t("services.items.tools.subtitle"),
            color: "#FFB800",
            description: t("services.items.tools.description"),
            tags: ["Bash", "Python", "CMake", "CI/CD", "Git Hooks", "DevOps"],
        },
        {
            id: "architecture",
            title: t("services.items.architecture.title"),
            subtitle: t("services.items.architecture.subtitle"),
            color: "#FF3B5C",
            description: t("services.items.architecture.description"),
            tags: ["System Design", "Code Review", "Refactoring", "API Design", "Consulting"],
        },
        {
            id: "rnd",
            title: t("services.items.rnd.title"),
            subtitle: t("services.items.rnd.subtitle"),
            color: "#00D4FF",
            description: t("services.items.rnd.description"),
            tags: ["Algorithms", "AI/ML", "Simulations", "Procedural", "Math", "Anything CS"],
        },
    ]

    return (
        <section id="services" className="relative py-28 px-6" style={{ zIndex: 1 }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)" }} />

            <div className="max-w-6xl mx-auto relative">
                <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                    <SectionLabel text={t("services.label")} />
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
                        <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8", lineHeight: 1.1 }}>
                            {t("services.title")}<br />
                            <span style={{ color: "#7B2FFF" }}>{t("services.titleHighlight")}</span>
                        </h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {SERVICES.map((s, i) => (
                        <ServiceCard key={s.id} service={s} delay={i * 0.1} inView={inView} index={i} />
                    ))}
                </div>

                {/* Bottom CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mt-12 p-6 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden holo-card-scan"
                    style={{ background: "rgba(13,17,48,0.7)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 8, backdropFilter: "blur(8px)" }}
                    onMouseEnter={()=> {botIconRef.current?.startAnimation()}}
                    onMouseLeave={()=> {botIconRef.current?.stopAnimation()}}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}>
                            <BotIcon ref={botIconRef} size={20} style={{ color: "#00D4FF" }} />
                        </div>
                        <div>
                            <p className="font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8", fontSize: "1rem" }}>{t("services.cta")}</p>
                            <p className="text-sm" style={{ color: "#6B7A9E", fontFamily: "'DM Sans', sans-serif" }}>{t("services.ctaDesc")}</p>
                        </div>
                    </div>
                    <button
                        className="flex items-center gap-2 px-5 py-2.5 font-semibold text-sm whitespace-nowrap transition-all duration-200 cursor-pointer"
                        style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.35)", color: "#00D4FF", borderRadius: 5, fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.08em" }}
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(0,212,255,0.22)"
                            arrowRightIconRef.current?.startAnimation()
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(0,212,255,0.12)"
                            arrowRightIconRef.current?.stopAnimation()
                        }}
                    >
                        {t("services.ctaBtn")} <ArrowRightIcon ref={arrowRightIconRef} size={15} />
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

export default ServicesSection