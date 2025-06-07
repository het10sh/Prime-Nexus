'use client';  // This line makes the component a client-side component

import { useState } from 'react'; // Import useState hook for managing state
import { motion } from 'framer-motion'; // For smooth animations
import { Button } from '@/components/ui/button';
import Header from '@/app/_components/Header';

const faqs = [
  {
    question: "What is Prime Nexus?",
    answer: "Prime Nexus is a collaborative web application that enables real-time teamwork, document sharing, AI-powered templates, and live interaction features to boost productivity.",
  },
  {
    question: "How do I get started with Prime Nexus?",
    answer: "Simply sign up for an account on our website, and you'll gain access to all the tools you need to collaborate seamlessly with your team.",
  },
  {
    question: "Is Prime Nexus free to use?",
    answer: "Prime Nexus offers a free tier with limited features. We also offer premium plans with additional capabilities such as advanced integrations and team management tools.",
  },
  {
    question: "Can I use Prime Nexus for personal projects?",
    answer: "Yes, Prime Nexus is great for both personal and professional projects. Whether you are working with a small team or handling personal tasks, Prime Nexus offers versatile collaboration features.",
  },
  {
    question: "What features are available in the premium plan?",
    answer: "The premium plan includes advanced AI templates, extended collaboration tools, more document sharing options, enhanced security features, and priority support.",
  },
  {
    question: "How does Prime Nexus handle security?",
    answer: "Prime Nexus uses industry-standard encryption for data storage and transfers. We also offer role-based access control to manage permissions within your team.",
  },
  {
    question: "Can I integrate Prime Nexus with other tools?",
    answer: "Yes, Prime Nexus supports integration with popular tools such as Slack, Google Drive, and Trello. We are also working on expanding our integrations for more third-party apps.",
  },
];

export default function FaqsPage() {

  // State to track which question is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Function to toggle the expanded answer
  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle visibility
  };

  return (

    

    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-6 text-center">

<div>
        <Header />
    </div>
    <div className="relative" id="home">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-teal-400 dark:from-emerald-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-green-600"></div>
        </div>
      </div>


      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-900 mb-4"
      >
        Frequently Asked Questions
      </motion.h1>
      <p className="text-gray-600 mb-10 text-lg">
        Find answers to the most common questions about Prime Nexus.
      </p>
      <div className="max-w-4xl mx-auto">
        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              {/* Question (Click to toggle answer) */}
              <div
                className="bg-[#4ab4b4] text-white p-4 rounded-lg cursor-pointer hover:bg-[#3a8f8f] transition-colors"
                onClick={() => handleToggle(index)} // Trigger toggle on click
              >
                {faq.question}
              </div>

              {/* Answer (Visible only if this question is expanded) */}
              {expandedIndex === index && (
                <div className="p-4 text-gray-700 bg-gray-100 rounded-b-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-10"
      >
        
      </motion.div>
    </div>
  );
}
