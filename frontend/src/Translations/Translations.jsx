import { useTranslation } from "react-i18next"


export const Translations = () => {
    const { i18n } = useTranslation()

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

  return (
      <div className="translation-buttons">
          <button className="translate-button" onClick={() => changeLanguage("en")}>
              EN</button>
          <button className="translate-button" onClick={() => changeLanguage("sv")}>
              SV</button>
      </div>
  )
}
