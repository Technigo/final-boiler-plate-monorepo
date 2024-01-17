import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Accordion.css";
import { Link } from "react-router-dom";

import { IoMdArrowDropdown } from "react-icons/io";

const AccordionItem = ({ title, content, isOpen, onToggle, onLinkClick, onNext, onBack }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onToggle}>
        {title}
        <IoMdArrowDropdown size={24} />
      </div>
      {isOpen && (
        <div className="accordion-content">
          {Array.isArray(content) ? (
            <ul>
              {content.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.url}
                    rel="noopener noreferrer"
                    onClick={() => onLinkClick(link.url)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <>{content}</>
          )}
        </div>
      )}
      {onBack && (
        <Button btnText={"Back"} onClick={onBack} />
      )}
    </div>
  );
};

const Accordion = ({ items, handleNext, handleBack }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location]);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleLinkClick = (url) => {
    setOpenIndex(null);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={index === openIndex}
          onToggle={() => handleToggle(index)}
          onLinkClick={handleLinkClick}
          onNext={handleNext}
          onBack={handleBack}
        />
      ))}
    </div>
  );
};

export default Accordion;
