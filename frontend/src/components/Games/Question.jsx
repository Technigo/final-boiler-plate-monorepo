import englishData from "../../../data/EnglishGameData.json"

export const Question = () => {
  const { english } = englishData

  const number = Math.floor(Math.random() * english.length) + 1;

  return (
    <div>
      Question
      <p>{english[number].question}</p>
    </div>
  )
}
