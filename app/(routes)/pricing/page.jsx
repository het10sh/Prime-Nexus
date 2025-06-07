'use client'; // This line makes the component a client-side component

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from 'next/link';
import Header from '@/app/_components/Header';


const pricingPlans = [
  {
    title: "Free",
    price: "$0/month",
    features: [
      "1 User",
      "Basic Features",
      "Community Support",
      "Email Notifications"
    ],
    buttonText: "Get Started",
    buttonLink: "#"
  },
  {
    title: "Pro",
    price: "$25/month",
    features: [
      "Up to 5 Users",
      "Advanced Features",
      "Priority Support",
      "Smart Notifications"
    ],
    buttonText: "Get Started",
    buttonLink: "#"
  },
];

export default function PricingPage() {
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
        className="text-4xl font-bold text-gray-900 mb-8"
      >
        Choose Your Plan
      </motion.h1>
      <p className="text-gray-600 mb-12 text-lg">
        We offer flexible pricing plans to suit businesses of all sizes. Choose the one that's right for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="p-6 shadow-lg rounded-2xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <CardContent className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{plan.title}</h2>
                <p className="text-3xl font-bold text-green-500 mb-4">{plan.price}</p>
                <ul className="list-none space-y-3 text-gray-600 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500 w-5 h-5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
