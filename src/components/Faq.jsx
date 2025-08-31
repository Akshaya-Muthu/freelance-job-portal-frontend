import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqData = [
  {
    question: "Is Job Arch free to use?",
    answer: "Yes, Job Arch is completely free for job seekers. Employers can also post jobs for free with optional premium features.",
  },
  {
    question: "How do I apply for a job?",
    answer: "Just browse the job listings, click on one that interests you, and follow the application instructions.",
  },
  {
    question: "Can I post jobs as a freelancer?",
    answer: "Yes! Freelancers and companies can both post jobs and hire talent through Hirrd.",
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. We prioritize user privacy and use industry-standard security practices to keep your data safe.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-transparent text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left px-6 py-4 focus:outline-none"
              >
                <span className="text-lg font-medium">{item.question}</span>
                <span className="text-white">
                  {openIndex === index ? <FiMinus size={20} /> : <FiPlus size={20} />}
                </span>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 text-gray-300"
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
