import { motion, useInView } from "motion/react";
import {useRef} from "react";
import SectionLabel from "../components/SectionLabel.tsx";
import HoloCube from "@/components/HoloCube.tsx";

const AboutSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

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
                        <SectionLabel text="About me" />
                        <h2
                            className="text-4xl md:text-5xl font-bold mb-6"
                            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8", lineHeight: 1.1 }}
                        >
                            Code is craft.
                            <br />
                            <span style={{ color: "#7B2FFF" }}>Games are art.</span>
                        </h2>
                        <div
                            className="space-y-4 text-base leading-relaxed"
                            style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                        >
                            <p>
                                I&apos;m a 24-year-old freelance software engineer who lives at the intersection of
                                engineering discipline and creative drive. My specialty is game programming —
                                physics systems, real-time rendering pipelines, gameplay feel — but I thrive
                                across the full spectrum of computer science.
                            </p>
                            <p>
                                Every project starts the same way: understanding what you actually needs,
                                not just what you asked for. Then I build a solution that fits precisely,
                                performs reliably, and ships on time.
                            </p>
                            <p>
                                When I&apos;m not freelancing, I&apos;m usually deep in a personal game project,
                                contributing to open-source tools, or learning more about new technologies I currently
                                have no experience with.
                            </p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {["C++", "Unity", "Unreal", "Rust", "TypeScript", "OpenGL"].map((tag) => (
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
                        {/* Mini holo panel */}
                        <div className="mt-6 max-w-xs">
                            {/*<HoloPanelSmall
                                lines={["> DEGREE: CS Bachelor", "> COFFEE: yes", "> BUG_FOUND: fixing...", "> COMMITS: 2,341"]}
                                color="#7B2FFF"
                            />*/}
                        </div>
                    </div>

                    {/* Right: photo + decorative frame */}
                    <div className="relative flex justify-center">
                        {/* Floating holo cubes */}
                        <div className="absolute -top-8 right-0 opacity-50">
                            <HoloCube size={60} color="#7B2FFF" />
                        </div>
                        <div className="absolute -bottom-4 left-4 opacity-40" style={{ animationDelay: "1.5s" }}>
                            <HoloCube size={44} color="#00D4FF" />
                        </div>

                        <div className="relative w-72 h-80 md:w-80 md:h-96">
                            <div
                                className="absolute inset-0 rounded-sm overflow-hidden"
                                style={{ border: "1px solid rgba(0,212,255,0.2)" }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=640&h=760&fit=crop&auto=format"
                                    alt="Developer at work with code on screens"
                                    className="w-full h-full object-cover"
                                    style={{ filter: "saturate(0.7) brightness(0.85)" }}
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(123,47,255,0.25) 0%, rgba(0,212,255,0.1) 100%)",
                                    }}
                                />
                            </div>
                            {/* Corner accents */}
                            <div
                                className="absolute -top-3 -left-3 w-8 h-8"
                                style={{
                                    borderTop: "2px solid #00D4FF",
                                    borderLeft: "2px solid #00D4FF",
                                }}
                            />
                            <div
                                className="absolute -bottom-3 -right-3 w-8 h-8"
                                style={{
                                    borderBottom: "2px solid #7B2FFF",
                                    borderRight: "2px solid #7B2FFF",
                                }}
                            />
                            {/* Floating badge */}
                            <div
                                className="absolute -bottom-6 -left-6 px-4 py-3"
                                style={{
                                    background: "#0D1130",
                                    border: "1px solid rgba(123,47,255,0.4)",
                                    borderRadius: "4px",
                                }}
                            >
                <span
                    className="text-2xl font-bold block"
                    style={{ color: "#7B2FFF", fontFamily: "'Rajdhani', sans-serif" }}
                >
                  24
                </span>
                                <span
                                    className="text-xs block"
                                    style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
                                >
                  years old
                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutSection;