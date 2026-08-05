const Footer = () => {
    return (
        <footer
            className="relative py-8 px-6 text-center"
            style={{
                borderTop: "1px solid rgba(0,212,255,0.08)",
                zIndex: 1,
            }}
        >
            <p
                className="text-xs"
                style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
            >
                <span style={{ color: "#7B2FFF" }}>&lt;</span>
                built by Pierre Latorse
                <span style={{ color: "#7B2FFF" }}> /&gt;</span>
                {" "}— 2025
            </p>
        </footer>
    )
}

export default Footer;