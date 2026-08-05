import { useTranslation } from "react-i18next"

const LangSwitcher = () => {
    const { i18n } = useTranslation()
    const current = i18n.language.startsWith("fr") ? "fr" : "en"

    return (
        <button
            onClick={() => i18n.changeLanguage(current === "fr" ? "en" : "fr")}
            className="text-xs px-3 py-1 transition-colors duration-200"
            style={{
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00D4FF",
                borderRadius: "4px",
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,212,255,0.1)"
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
            }}
        >
            {current === "fr" ? "EN" : "FR"}
        </button>
    )
}

export default LangSwitcher