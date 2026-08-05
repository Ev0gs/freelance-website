const ROW1: { name: string; symbol: string; color: string }[] = [
    { name: "C++",        symbol: "C++", color: "#00599C" },
    { name: "Rust",       symbol: "Rs",  color: "#CE422B" },
    { name: "Python",     symbol: "Py",  color: "#FFD43B" },
    { name: "TypeScript", symbol: "TS",  color: "#3178C6" },
    { name: "Unity",      symbol: "Un",  color: "#CCCCCC" },
    { name: "Unreal",     symbol: "UE",  color: "#AAAAAA" },
    { name: "React",      symbol: "Re",  color: "#61DAFB" },
    { name: "Node.js",    symbol: "No",  color: "#339933" },
    { name: "OpenGL",     symbol: "GL",  color: "#5586A4" },
    { name: "PostgreSQL", symbol: "PG",  color: "#4169E1" },
    { name: "Docker",     symbol: "Dk",  color: "#2496ED" },
    { name: "Git",        symbol: "Gt",  color: "#F05032" },
    { name: "Lua",        symbol: "Lu",  color: "#6666CC" },
    { name: "CMake",      symbol: "Cm",  color: "#064F8C" },
    { name: "Java",       symbol: "Jv",  color: "#F89820" },
    { name: ".NET",       symbol: ".N",  color: "#512BD4" },
]

const ROW2: { name: string; symbol: string; color: string }[] = [
    { name: "C#",            symbol: "C#",  color: "#68217A" },
    { name: "Godot",         symbol: "Gd",  color: "#478CBF" },
    { name: "GLSL",          symbol: "GLS", color: "#7B2FFF" },
    { name: "WebGL",         symbol: "WGL", color: "#990000" },
    { name: "Three.js",      symbol: "3js", color: "#DDDDDD" },
    { name: "Next.js",       symbol: "Nx",  color: "#E2E8F8" },
    { name: "Tailwind",      symbol: "Tw",  color: "#06B6D4" },
    { name: "Linux",         symbol: "Lx",  color: "#FCC624" },
    { name: "Bash",          symbol: ">_",  color: "#4EAA25" },
    { name: "GraphQL",       symbol: "GQL", color: "#E10098" },
    { name: "Vulkan",        symbol: "Vk",  color: "#AC162C" },
    { name: "Blender",       symbol: "Bl",  color: "#F5792A" },
    { name: "MongoDB",       symbol: "Mg",  color: "#47A248" },
    { name: "Redis",         symbol: "Rd",  color: "#FF4438" },
    { name: "Spring",        symbol: "Sp",  color: "#6DB33F" },
    { name: "Angular",       symbol: "Ng",  color: "#DD0031" },
]
function TechChip({ name, symbol, color }: { name: string; symbol: string; color: string }) {
    return (
        <div
            className="flex items-center gap-2.5 mx-3 px-4 py-2.5 select-none"
            style={{
                background: `${color}0D`,
                border: `1px solid ${color}28`,
                borderRadius: 6,
                whiteSpace: "nowrap",
                transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${color}60`
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${color}28`
            }}
        >
            {/* Logo mark */}
            <div
                className="flex items-center justify-center font-bold"
                style={{
                    width: 30,
                    height: 30,
                    background: `${color}18`,
                    border: `1px solid ${color}35`,
                    borderRadius: 5,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: symbol.length > 2 ? "0.58rem" : "0.7rem",
                    color,
                    letterSpacing: "-0.02em",
                    flexShrink: 0,
                }}
            >
                {symbol}
            </div>
            <span
                style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: "#A8B4D4",
                    letterSpacing: "0.04em",
                }}
            >
        {name}
      </span>
        </div>
    )
}

const LogoCloud = () => {
    return (
        <div className="py-10 -mx-6 overflow-hidden">

            {/* Ligne 1 — défile vers la gauche */}
            <div className="marquee-fade mb-3">
                <div
                    style={{
                        display: "flex",
                        width: "max-content",
                        animation: "marqueeLeft 40s linear infinite",
                    }}
                >
                    {[...ROW1, ...ROW1].map((t, i) => (
                        <TechChip key={i} {...t} />
                    ))}
                </div>
            </div>

            {/* Ligne 2 — défile vers la droite */}
            <div className="marquee-fade">
                <div
                    style={{
                        display: "flex",
                        width: "max-content",
                        animation: "marqueeRight 34s linear infinite",
                    }}
                >
                    {[...ROW2, ...ROW2].map((t, i) => (
                        <TechChip key={i} {...t} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LogoCloud