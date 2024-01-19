import { useState } from "react";
import faqData from "../data/faq.json";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="text-center bg-quinary p-8">
        <h1 className="text-2xl font-md">Frequently Asked Questions</h1>
      </div>
      <div className="accordion">
        {faqData.faq.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-title cursor-pointer  flex justify-between items-center p-4 bg-quinary text-primary"
              onClick={() => toggleAccordion(index)}>
              <span>{faq.question}</span>
              <span>{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-content p-4 bg-quinary text-tertiary">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
