import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../buttons/Button"
import { IoMdArrowDropdown } from "react-icons/io";
import "./Accordion.css";

const AccordionItem = ({ title, content, isOpen, onToggle, onLinkClick, onNavigate, index, totalItems, showButtons }) => {

  return (
    <div className="accordion-item" id={`accordion-item-${index}`}>
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
            <>
            {content}
            {showButtons && (
              <div className="accordion-buttons">
              {index > 0 && (
                <Button type="button" btnText="Back" onClick={() => onNavigate("back")} />
              )}
              {index < totalItems - 1 && (
                <Button type="button" btnText="Next" onClick={() => onNavigate("next")} />
              )}
            </div>
            )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ items, showButtons, openFirstAccordion }) => {
  const [openIndex, setOpenIndex] = useState(openFirstAccordion ? 0 : null);
  const location = useLocation();
  const accordionRef = useRef(null);

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location]);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleLinkClick = (url) => {
    e.preventDefault()
    setOpenIndex(null);
  };

  const handleNavigate = (direction) => {
    setOpenIndex((currentIndex) => {
      if (direction === "next" && currentIndex < items.length - 1) {
        currentIndex += 1;
      } else if (direction === "back" && currentIndex > 0) {
        currentIndex -= 1;
      }
  
      // Scroll to the active accordion item
      const accordionItem = document.getElementById(`accordion-item-${currentIndex}`);
      if (accordionItem) {
        const viewportHeight = window.innerHeight;
        const itemTop = accordionItem.offsetTop;
        const itemHeight = accordionItem.clientHeight;
        const offset = (viewportHeight - itemHeight) / 2;
  
        window.scrollTo({
          top: itemTop - offset,
          behavior: 'smooth',
        });
      }
  
      return currentIndex;
    });
  };

  return (
    <div className="accordion" >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={index === openIndex}
          onToggle={() => handleToggle(index)}
          onLinkClick={handleLinkClick}
          onNavigate={handleNavigate}
          index={index}
          totalItems={items.length}
          showButtons={showButtons}
        />
      ))}
    </div>
  );
};

export default Accordion;
