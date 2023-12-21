import React from "react";
import "./InstagramSection.css";

export const InstagramSection = () => {
  // const userFeed = new Instafeed({
  //   get: "user",
  //   taget: "instafeed-container",
  //   limit: 4,
  //   accessToken: "IGQWRObi1NcVVYTVBTZA2xoUDMtSk44eXBtU3ZAGSXo1RXV1UGh2RWNMT0d5R0ZAacWN4dWpwTWhOald4ZA0MwOFdiSDdneXFvek5wU2RtYmFSTVpUODI0OWF6c1N0SHBPMnZAOZAmNGTVkzNVlsNmk2MkNBdTVZAMDF1dmcZD"
  // })
  // userFeed.run()

  const text = {
    heading: "Join our Community",
    text: "We love to see our plants in your homes. Tag your photo with <b>@plantsbyhw</b> on Instagram.",
  };
  return (
    <section className="insta-section-wrapper">
      <h2 className="section-title">{text.heading}</h2>
      <div id="instafeed-container">instagram carousel!</div>
      <p>{text.text}</p>
    </section>
  );
};
