import React from 'react'
import { Button } from "../components/Button"

import "./InspoSection.css"

export const InspoSection = () => {

    const text = {
        heading: "Chopidopido",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do aiusmod.",
        btnText: "GET INSPIRED"
    }

  return (
    <section className="inspo-wrapper">
        <div className="text-and-button-wrapper">
        <h2>{text.heading}</h2>
        <p>{text.text}</p>
        
        <Button
              className="inspo-btn"
              btnText={text.btnText}
              ariaLabel="inspo button"
        />
        </div>
        <div className="inspo-box">
            this is inspo content
        </div>
    </section>
  )
}
