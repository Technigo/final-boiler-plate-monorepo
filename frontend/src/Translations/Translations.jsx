import { useTranslation } from "react-i18next"
import { IoIosGlobe } from "react-icons/io"; 


export const Translations = () => {
    const { i18n } = useTranslation()

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

  return (
      <div className="translation-buttons">
        <IoIosGlobe color="white" style={{ fontSize: '30px' }} > </IoIosGlobe>
          <button className="translate-button" onClick={() => changeLanguage("en")}>
              EN </button>
          <button className="translate-button" onClick={() => changeLanguage("sv")}>
              SV</button>
      </div>
  )
}
