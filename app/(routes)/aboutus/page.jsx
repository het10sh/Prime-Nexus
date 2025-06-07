'use client'; // This line makes the component a client-side component

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, ShieldCheck, Users } from "lucide-react";
import Link from 'next/link';
import Header from '@/app/_components/Header';
import Logo from '@/app/_components/Logo';

const teamMembers = [
  {
    name: "Het Makadia",
    role: "CEO & Founder",
    image: "/profilepic.jpg",
    description: "Het is a visionary leader with over 3 years of experience in technology and business management.",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "Jane is the technical mastermind behind Prime Nexus, with a passion for innovation and building scalable systems.",
  },
  {
    name: "Mark Johnson",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "Mark is responsible for the development of Prime Nexus' core features, ensuring seamless user experiences.",
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    description: "Emily focuses on user feedback and making sure that Prime Nexus meets the needs of every customer.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-6 text-center">

      {/* Header tag code */}
      <div className='px-5'>
        <nav className="z-10 w-full">
          <div>
            <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
              <input aria-hidden="true" type="checkbox" name="toggle_nav" id="toggle_nav" className="hidden peer" />
              <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
                {/* Removed the <a> tag here, <Logo /> is now wrapped in <Link> */}
                <Link href="/" aria-label="logo" className="flex space-x-2 items-center">
                  <Logo /> 
                </Link>

                <div className="relative flex items-center lg:hidden max-h-10">
                  <label role="button" htmlFor="toggle_nav" aria-label="hamburger" id="hamburger" className="relative  p-6 -mr-6">
                    <div aria-hidden="true" id="line" className="m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                    <div aria-hidden="true" id="line2" className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                  </label>
                </div>
              </div>
              <div aria-hidden="true" className="fixed z-10 inset-0 h-screen w-screen bg-white/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"></div>
              <div className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none 
                dark:shadow-none dark:bg-gray-800 dark:border-gray-700">

                <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                  <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                    <li>
                      <Link href="/features" className="block md:px-4 transition hover:text-primary">
                        <span>Features</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="block md:px-4 transition hover:text-primary">
                        <span>FAQ</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/testimonials" className="block md:px-4 transition hover:text-primary">
                        <span>Testimonies</span>
                      </Link>
                    </li>
                    {/* <li> 
                    <Link href="/pricing" className="block md:px-4 transition hover:text-primary">
                          <span>Pricing</span>
                      </Link>
                    </li> */}
                    <li>
                      <Link href="/aboutus" className="block md:px-4 transition hover:text-primary">
                        <span>About Us</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 lg:mt-0">
                  <a
                    href="/dashboard"
                    className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition 
                    before:duration-300 hover:before:scale-105 
                    active:duration-75 active:before:scale-95 sm:w-max"
                  >
                    <span className="relative text-sm font-semibold text-white">Get Started</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* Header code end */}

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
        About Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-gray-600 mb-12 text-lg"
      >
        At Prime Nexus, we are committed to revolutionizing collaboration and productivity with innovative tools powered by AI and real-time interaction.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <Card className="p-6 shadow-lg rounded-2xl hover:shadow-2xl transition-transform transform hover:scale-105">
              <CardContent className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
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
