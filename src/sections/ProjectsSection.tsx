import {useRef, useState} from "react";
import {motion, useInView} from "motion/react";
import {ArrowRight, BookMarked, ExternalLink, Zap} from "lucide-react";
import SectionLabel from "../components/SectionLabel.tsx";
import HoloScan from "@/components/HoloScan.tsx";
import {useTilt} from "@/hooks/useTilt.ts";

const PROJECTS = [
    {
        title: "VoidEngine",
        type: "Game Engine",
        tag: "C++ / OpenGL",
        tagColor: "#7B2FFF",
        desc: "A custom 2D/3D game engine built from scratch in C++17 with an OpenGL renderer, entity-component system, scene editor, and integrated Lua scripting for gameplay logic.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&h=420&fit=crop&auto=format",
        links: { github: "#", live: null },
        featured: true,
    },
    {
        title: "NeonCity Runners",
        type: "Indie Game",
        tag: "Unity / C#",
        tagColor: "#00D4FF",
        desc: "A cyberpunk endless runner with procedurally generated city blocks, dynamic obstacle patterns, and a real-time lighting system using Unity's HDRP pipeline.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&h=420&fit=crop&auto=format",
        links: { github: "#", live: "#" },
        featured: true,
    },
    {
        title: "ClientSync CRM",
        type: "Web App",
        tag: "TypeScript / React",
        tagColor: "#00FF9C",
        desc: "A client relationship manager built for a small consulting firm. Features pipeline tracking, contract management, invoice generation, and Slack integration.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=420&fit=crop&auto=format",
        links: { github: "#", live: "#" },
        featured: false,
    },
    {
        title: "RustNet",
        type: "Networking Library",
        tag: "Rust",
        tagColor: "#FFB800",
        desc: "A lightweight game networking library in Rust implementing reliable UDP, client prediction, lag compensation, and server reconciliation for multiplayer games.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&h=420&fit=crop&auto=format",
        links: { github: "#", live: null },
        featured: false,
    },
    {
        title: "ShaderLab",
        type: "Tool",
        tag: "WebGL / GLSL",
        tagColor: "#FF3B5C",
        desc: "An in-browser GLSL shader playground with live editing, uniform sliders, texture upload support, and one-click export to Unity-compatible shader code.",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=700&h=420&fit=crop&auto=format",
        links: { github: "#", live: "#" },
        featured: false,
    },
    {
        title: "LogicForge",
        type: "Game Jam Entry",
        tag: "Godot / GDScript",
        tagColor: "#7B2FFF",
        desc: "48-hour game jam entry — a puzzle platformer where you reprogram the level's logic mid-run. Placed 3rd in the Ludum Dare 54 Compo category.",
        image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=700&h=420&fit=crop&auto=format",
        links: { github: "#", live: "#" },
        featured: false,
    },
];

interface Project {
    title: string
    type: string
    tag: string
    tagColor: string
    desc: string
    image: string
    links: { github: string; live: string | null }
    featured: boolean
}

function ProjectCard({ project, delay, index }: { project: Project; delay: number; index: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    const [hovered, setHovered] = useState(false)
    const { ref: tiltRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(12)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="h-full" // ← ajoute ici
        >
            <div style={{ perspective: "800px" }} className="h-full"> // ← et ici
                <motion.div
                    ref={tiltRef}
                    className="h-full" // ← et ici
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => {
                        handleMouseLeave()
                        setHovered(false)
                    }}
                >
                    <HoloScan
                        color={project.tagColor}
                        duration={3 + index * 0.4}
                        className="flex flex-col h-full"
                        style={{
                            background: "#0D1130",
                            border: `1px solid ${hovered ? project.tagColor + "44" : "rgba(0,212,255,0.1)"}`,
                            borderRadius: "6px",
                            transition: "border-color 0.3s, box-shadow 0.3s",
                            boxShadow: hovered ? `0 0 30px ${project.tagColor}18` : "none",
                        }}
                    >
                        <div className="relative h-44 overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500"
                                style={{
                                    filter: "saturate(0.6) brightness(0.7)",
                                    transform: hovered ? "scale(1.05)" : "scale(1)",
                                }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(to bottom, transparent 40%, #0D1130 100%)" }}
                            />
                            {project.featured && (
                                <div
                                    className="absolute top-3 right-3 text-xs px-2 py-1 flex items-center gap-1"
                                    style={{
                                        background: "rgba(0,212,255,0.15)",
                                        border: "1px solid rgba(0,212,255,0.4)",
                                        color: "#00D4FF",
                                        borderRadius: "3px",
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}
                                >
                                    <Zap size={10} /> featured
                                </div>
                            )}
                            <span
                                className="absolute bottom-3 left-4 text-xs px-2 py-0.5 rounded"
                                style={{
                                    background: `${project.tagColor}20`,
                                    color: project.tagColor,
                                    border: `1px solid ${project.tagColor}40`,
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}
                            >
                      {project.tag}
                    </span>
                        </div>

                        <div className="flex flex-col flex-1 p-5">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p
                                        className="text-xs mb-1"
                                        style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
                                    >
                                        {project.type}
                                    </p>
                                    <h3
                                        className="text-xl font-bold"
                                        style={{ color: "#E2E8F8", fontFamily: "'Rajdhani', sans-serif" }}
                                    >
                                        {project.title}
                                    </h3>
                                </div>
                            </div>
                            <p
                                className="text-sm leading-relaxed mb-5 flex-1"
                                style={{ color: "#6B7A9E", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                            >
                                {project.desc}
                            </p>
                            <div className="flex gap-3 mt-auto">
                                <a
                                    href={project.links.github}
                                    className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-[#00D4FF]"
                                    style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    <BookMarked size={14} /> Source
                                </a>
                                {project.links.live && (
                                    <a
                                        href={project.links.live}
                                        className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-[#00D4FF]"
                                        style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        <ExternalLink size={14} /> Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </HoloScan>
                </motion.div>
            </div>
        </motion.div>
    );
}

const ProjectsSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="projects" className="relative py-28 px-6" style={{ zIndex: 1 }}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <SectionLabel text="Selected work" />
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-14"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8" }}
                    >
                        Projects that{" "}
                        <span style={{ color: "#7B2FFF" }}>shipped</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.title} project={p} delay={i * 0.08} index={i} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-16 flex justify-center"
                >
                    <a
                        href="#"
                        className="flex items-center gap-2 text-sm transition-all duration-200 hover:gap-3"
                        style={{ color: "#00D4FF", fontFamily: "'DM Sans', sans-serif" }}
                    >
                        View all projects on GitHub <ArrowRight size={15} />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default ProjectsSection;