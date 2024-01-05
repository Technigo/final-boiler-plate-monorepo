import { useState } from 'react';
import faqData from '../data/faq.json';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="accordion">
        <h1 className="text-lg font-md">FAQ</h1>
      {faqData.faq.map((faq, index) => (
        <div key={index} className="faq-item border-b">
          <div className="faq-title cursor-pointer flex justify-between items-center p-4 bg-emerald-200" onClick={() => toggleAccordion(index)}>
            <span>{faq.question}</span>
            <span>{openIndex === index ? '-' : '+'}</span>
          </div>
          {openIndex === index && <div className="faq-content p-4 bg-emerald-100">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

