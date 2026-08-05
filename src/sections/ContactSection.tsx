import {motion, useInView} from "motion/react";
import SectionLabel from "../components/SectionLabel.tsx";
import {useEffect, useRef, useState} from "react";
import {MailboxIcon, type MailboxIconHandle} from "@/components/ui/mailbox.tsx";
import {GithubIcon, type GithubIconHandle} from "@/components/ui/github.tsx";
import {LinkedinIcon, type LinkedinIconHandle} from "@/components/ui/linkedin.tsx";
import {ZapIcon, type ZapHandle} from "@/components/ui/zap.tsx";

const ContactSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    const inputStyle = {
        background: "rgba(13,17,48,0.8)",
        border: "1px solid rgba(0,212,255,0.15)",
        borderRadius: "4px",
        color: "#E2E8F8",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.9rem",
        width: "100%",
        padding: "0.75rem 1rem",
        outline: "none",
        transition: "border-color 0.2s",
    };

    const mailboxRef = useRef<MailboxIconHandle>(null);
    const githubRef = useRef<GithubIconHandle>(null);
    const linkedinRef = useRef<LinkedinIconHandle>(null);
    const zapRef = useRef<ZapHandle>(null);

    useEffect(() => {
        if (sent) {
            // Petit délai pour laisser le temps au composant de s'afficher
            setTimeout(() => {
                zapRef.current?.startAnimation();
            }, 100);
        }
    }, [sent]);

    return (
        <section id="contact" className="relative py-28 px-6" style={{ zIndex: 1 }}>
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(123,47,255,0.1) 0%, transparent 70%)",
                }}
            />
            <div className="max-w-4xl mx-auto relative">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <SectionLabel text="Let's work together" />
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8" }}
                    >
                        Have a project{" "}
                        <span style={{ color: "#00D4FF" }}>in mind?</span>
                    </h2>
                    <p
                        className="text-base max-w-md mx-auto"
                        style={{ color: "#6B7A9E", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                    >
                        Whether it&apos;s a game, a web app, or something entirely new — I&apos;m open to
                        interesting work. Let&apos;s talk.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-5 gap-10"
                >
                    {/* Contact info */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <div>
                            <p
                                className="text-xs tracking-widest uppercase mb-4"
                                style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                Direct contact
                            </p>
                            <a
                                href="mailto:pierrelat33@gmail.com"
                                className="flex items-center gap-3 group"
                                onMouseEnter={() => {mailboxRef.current?.startAnimation()}}
                                onMouseLeave={() => {mailboxRef.current?.stopAnimation()}}
                            >
                                <div
                                    className="w-9 h-9 flex items-center justify-center rounded"
                                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
                                >
                                    <MailboxIcon ref={mailboxRef} size={16} style={{ color: "#00D4FF" }} />
                                </div>
                                <span
                                    className="text-sm group-hover:text-[#00D4FF] transition-colors"
                                    style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                                >
                                  pierrelat33@gmail.com
                                </span>
                            </a>
                        </div>

                        <div>
                            <p
                                className="text-xs tracking-widest uppercase mb-4"
                                style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                Find me online
                            </p>
                            <div className="flex flex-col gap-3">
                                {[
                                    { icon: GithubIcon, label: "github.com/Evogs", href: "https://github.com/Ev0gs", iconRef:githubRef },
                                    { icon: LinkedinIcon, label: "linkedin.com/in/pierre-latorse", href: "https://www.linkedin.com/in/pierre-latorse-968242171/", iconRef:linkedinRef },
                                ].map(({ icon: Icon, label, href, iconRef }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 group"
                                        onMouseEnter={() => {iconRef.current?.startAnimation()}}
                                        onMouseLeave={() => {iconRef.current?.stopAnimation()}}
                                    >
                                        <div
                                            className="w-9 h-9 flex items-center justify-center rounded"
                                            style={{
                                                background: "rgba(123,47,255,0.1)",
                                                border: "1px solid rgba(123,47,255,0.2)",
                                            }}
                                        >
                                            <Icon ref={iconRef} size={16} style={{ color: "#7B2FFF" }} />
                                        </div>
                                        <span
                                            className="text-sm group-hover:text-[#7B2FFF] transition-colors"
                                            style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                                        >
                      {label}
                    </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div
                            className="mt-auto p-4"
                            style={{
                                background: "rgba(0,212,255,0.05)",
                                border: "1px solid rgba(0,212,255,0.15)",
                                borderRadius: "4px",
                            }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <div
                                    className="w-2 h-2 rounded-full animate-pulse"
                                    style={{ background: "#00FF9C" }}
                                />
                                <span
                                    className="text-xs"
                                    style={{ color: "#00FF9C", fontFamily: "'JetBrains Mono', monospace" }}
                                >
                  Available for projects
                </span>
                            </div>
                            <p
                                className="text-xs"
                                style={{ color: "#6B7A9E", fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Currently accepting new clients — typical response within 24 hours.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-3">
                        {sent ? (
                            <div
                                className="h-full flex flex-col items-center justify-center p-10 text-center"
                                style={{
                                    background: "rgba(13,17,48,0.7)",
                                    border: "1px solid rgba(0,212,255,0.2)",
                                    borderRadius: "6px",
                                }}
                            >
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                                    style={{ background: "rgba(0,255,156,0.1)", border: "1px solid rgba(0,255,156,0.3)" }}
                                >
                                    <ZapIcon ref={zapRef} size={24} style={{ color: "#00FF9C" }} />
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-2"
                                    style={{ color: "#E2E8F8", fontFamily: "'Rajdhani', sans-serif" }}
                                >
                                    Message sent!
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: "#6B7A9E", fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    I&apos;ll get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    style={inputStyle}
                                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.5)")}
                                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.15)")}
                                />
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    style={inputStyle}
                                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.5)")}
                                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.15)")}
                                />
                                <textarea
                                    placeholder="Tell me about your project..."
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    style={{ ...inputStyle, resize: "none" }}
                                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.5)")}
                                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.15)")}
                                />
                                <button
                                    type="submit"
                                    className="py-3 font-semibold text-sm tracking-widest uppercase transition-all duration-200"
                                    style={{
                                        background: "linear-gradient(135deg, #00D4FF 0%, #7B2FFF 100%)",
                                        color: "#E2E8F8",
                                        borderRadius: "4px",
                                        fontFamily: "'Rajdhani', sans-serif",
                                        fontSize: "0.9rem",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = "0.9";
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = "1";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    Send message
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ContactSection;