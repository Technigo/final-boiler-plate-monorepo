import { CharacterCard } from "./CharacterCard"

export const ByCharacteristic = () => {
    const text = {
        heading: "By Characteristic",
    }
  return (
    <section>
    <h2 className="section-title">{text.heading}</h2>
    <CharacterCard />
    </section>
  )
}
