'use client';  // This line makes the component a client-side component

import { motion } from 'framer-motion'; // We can now directly import 'motion' for client-side use
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MessageSquare, Users, Bell, FileText } from "lucide-react";
import Link from 'next/link';
import Header from '@/app/_components/Header';

const features = [
  {
    title: "AI-Powered Templates",
    description: "Generate intelligent templates using Google AI Studio to boost productivity.",
    icon: Sparkles,
  },
  {
    title: "Live Collaboration",
    description: "Work together in real-time with seamless editing and commenting.",
    icon: Users,
  },
  {
    title: "Smart Notifications",
    description: "Stay updated with instant notifications and activity tracking.",
    icon: Bell,
  },
  {
    title: "Easy Document Sharing",
    description: "Share documents with role-based permissions and access control.",
    icon: FileText,
  },
  {
    title: "Interactive Commenting",
    description: "Engage in discussions with contextual comments and mentions.",
    icon: MessageSquare,
  },
];



export default function FeaturesPage() {
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
        Prime Nexus Features
      </motion.h1>
      <p className="text-gray-600 mb-10 text-lg">
        Unlock powerful collaboration with AI-driven tools and real-time interactions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="p-6 shadow-lg rounded-2xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <CardContent className="flex flex-col items-center">
                <feature.icon className="w-12 h-12 text-[#4ab4b4] mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h2>
                <p className="text-gray-600 text-sm">{feature.description}</p>
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
