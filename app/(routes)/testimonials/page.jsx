'use client';  // This line makes the component a client-side component

import { motion } from 'framer-motion'; // We can now directly import 'motion' for client-side use
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import Header from '@/app/_components/Header';


const testimonials = [
  {
    name: "John Doe",
    position: "Marketing Manager at XYZ Corp.",
    testimonial: "Prime Nexus has transformed the way our team collaborates. The real-time document sharing and AI-powered templates have streamlined our workflow and increased efficiency!",
    image: "https://randomuser.me/api/portraits/men/1.jpg", // Replace with actual image URL
  },
  {
    name: "Jane Smith",
    position: "Project Lead at InnovateTech",
    testimonial: "As a project manager, I love how easy it is to coordinate tasks and share ideas with my team. The commenting and live collaboration features make communication so much smoother.",
    image: "https://randomuser.me/api/portraits/women/2.jpg", // Replace with actual image URL
  },
  {
    name: "Robert Lee",
    position: "Designer at Creative Studios",
    testimonial: "We used to struggle with feedback loops in design projects. With Prime Nexus, we can easily track revisions and work together seamlessly, no matter where the team is located.",
    image: "https://randomuser.me/api/portraits/men/3.jpg", // Replace with actual image URL
  },
  {
    name: "Sara Williams",
    position: "Founder of Digital Solutions Agency",
    testimonial: "Prime Nexus has elevated our client meetings. With live collaboration on presentations, we've seen a huge improvement in client satisfaction. It's a game-changer for agency work.",
    image: "https://randomuser.me/api/portraits/women/4.jpg", // Replace with actual image URL
  },
  {
    name: "Michael Thompson",
    position: "Software Developer at Tech Innovations",
    testimonial: "Collaborating on code and documentation has never been easier. The app's integration with Firebase makes team synchronization perfect, even with distributed teams.",
    image: "https://randomuser.me/api/portraits/men/5.jpg", // Replace with actual image URL
  },
  {
    name: "Emily Carter",
    position: "Product Manager at FutureTech",
    testimonial: "Prime Nexus has helped us streamline product development cycles by allowing smooth collaboration between cross-functional teams. It's an indispensable tool in our workflow!",
    image: "https://randomuser.me/api/portraits/women/6.jpg", // Replace with actual image URL
  },
  {
    name: "David Green",
    position: "CEO at GreenTech Enterprises",
    testimonial: "I never realized how much time we could save with real-time collaborative tools. Prime Nexus has been a vital part of boosting our team’s efficiency and keeping everyone on the same page.",
    image: "https://randomuser.me/api/portraits/men/7.jpg", // Replace with actual image URL
  },
  {
    name: "Olivia Moore",
    position: "Content Strategist at WriteWorks",
    testimonial: "The live collaboration feature in Prime Nexus has allowed our team to work on content simultaneously, reducing editing time and improving overall content quality. I will refer Prime nexus to others.",
    image: "https://randomuser.me/api/portraits/women/8.jpg", // Replace with actual image URL
  },
  {
    name: "James Clark",
    position: "Operations Head at Innovate Global",
    testimonial: "With Prime Nexus, our team can easily collaborate and track changes in documents without confusion. It’s helped us run operations more efficiently across departments.",
    image: "https://randomuser.me/api/portraits/men/9.jpg", // Replace with actual image URL
  },
];

export default function TestimonialsPage() {
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
        What Our Users Are Saying
      </motion.h1>
      <p className="text-gray-600 mb-10 text-lg">
        See how Prime Nexus is making a difference in teams across various industries.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="p-6 shadow-lg rounded-2xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <CardContent className="flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{testimonial.position}</p>
                <p className="text-gray-600 text-sm">{testimonial.testimonial}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
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
