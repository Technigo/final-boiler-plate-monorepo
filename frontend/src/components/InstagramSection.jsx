import React from 'react'
import "./InstagramSection.css"

export const InstagramSection = () => {

    const text = {
        heading: "Join our Community",
        text: "We love to see our plants in your homes. Tag your photo with <b>@plantsbyhw</b> on Instagram."
    }
  return (
    <section className="insta-section-wrapper">
        <h2>{text.heading}</h2>
        <div>instagram carousel!</div>
        <p>{text.text}</p>
    </section>
  )
}
