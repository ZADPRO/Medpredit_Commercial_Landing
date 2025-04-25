import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import global_tamil from "./translations/tamil/global.json"
import global_english from "./translations/english/global.json"
import global_hindi from "./translations/hindi/global.json"

i18next.init({
  interpolation: { escapeValue: false },
  lng: "hindi",
  resources: {
    tamil: {
      global: global_tamil,
    },
    english: {
      global: global_english,
    },
    hindi: {
      global: global_hindi,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>,
)
