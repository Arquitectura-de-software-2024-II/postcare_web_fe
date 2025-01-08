"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <h4>
            <button
              type="button"
              className={clsx(
                "text-backgroundColor bg-primaryColor flex items-center justify-between w-full p-5 font-medium border rounded-lg focus:ring focus:ring-primaryColor-20 gap-3 bg-pr",
                { "bg-backgroundColor": openIndex === index }
              )}
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faCircleQuestion} className="w-5 h-5" />
                <span>{item.question}</span>
              </div>
              <svg
                className={clsx("w-3 h-3 transition-transform duration-300", {
                  "rotate-0": openIndex === index,
                  "rotate-180": openIndex !== index,
                })}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h4>
          <div
            className={clsx(
              "p-5 border border-b-0 border-grayColor-20  bg-backgroundColor-90 text-textColor",
              { hidden: openIndex !== index }
            )}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
