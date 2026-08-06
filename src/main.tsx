import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./i18n/index.ts"
import App from './App.tsx'
import i18n from "i18next";

i18n.on("languageChanged", (lng) => {
    document.documentElement.lang = lng
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)