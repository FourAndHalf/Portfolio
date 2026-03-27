"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const SKILLS = [
  "React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript",
  "Node.js", "GraphQL", "PostgreSQL", "Docker", "Kubernetes", "AWS"
];

const PROJECTS = [
  {
    title: "Project One",
    description: "A web application for managing tasks and projects.",
    image: "https://picsum.photos/seed/p1/1000/800",
    tags: ["Web App", "React", "Next.js"],
  },
  {
    title: "Project Two",
    description: "A mobile app for tracking personal finances.",
    image: "https://picsum.photos/seed/p2/1000/800",
    tags: ["Mobile App", "React Native", "Firebase"],
  },
  {
    title: "Project Three",
    description: "An e-commerce platform for selling custom merchandise.",
    image: "https://picsum.photos/seed/p3/1000/800",
    tags: ["Web App", "Shopify", "React"],
  },
  {
    title: "Project Four",
    description: "A data visualization dashboard for analytics.",
    image: "https://picsum.photos/seed/p4/1000/800",
    tags: ["Web App", "D3.js", "React"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Portfolio() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} className="bg-[#0a0a0a] text-neutral-200 font-sans antialiased selection:bg-white selection:text-black">
      {/* Navbar Placeholder */}
      <div className="h-20" />

      {/* Hero Section */}
      <motion.section
        className="px-6 md:px-12 pt-20 pb-32 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-8" />
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400">
          Code That Feels Designed
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-6 text-lg md:text-xl max-w-3xl text-neutral-400">
          I'm a Design Engineer crafting beautiful, high-performance web experiences. I specialize in turning complex problems into elegant, user-friendly solutions.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-10 flex gap-4">
          <Button size="lg" className="h-12 px-8 text-base rounded-full bg-white text-black hover:bg-neutral-200 transition-colors">
            Get in Touch
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-neutral-800 bg-transparent hover:bg-neutral-900 hover:text-white transition-colors">
            View My Work
          </Button>
        </motion.div>
      </motion.section>

      {/* Tech Stack Marquee */}
      <section className="py-12 border-y border-neutral-900">
        <div className="relative overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {[...SKILLS, ...SKILLS].map((skill, index) => (
              <span key={index} className="mx-6 text-xl font-medium text-neutral-500">{skill}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl font-bold tracking-tight text-center mb-16"
          >
            Selected Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                className="group relative block w-full h-full"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1000}
                    height={800}
                    className="w-full h-auto rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-neutral-400 mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-semibold bg-neutral-800 rounded-full text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-12 bg-neutral-950 rounded-t-3xl">
        <div className="max-w-4xl mx-auto text-center">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-4xl font-bold tracking-tight mb-8"
            >
                About Me
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-neutral-400 leading-relaxed"
            >
                I am a developer with a passion for creating beautiful and performant web experiences. I have a strong background in both design and engineering, which allows me to build products that are not only functional but also delightful to use. I am always looking for new challenges and opportunities to learn and grow.
            </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-6 md:px-12 bg-black border-t border-neutral-900">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold">Let's connect</h3>
            <p className="text-neutral-400 mt-2">Have a project in mind? I'd love to hear from you.</p>
            <a href="mailto:contact@aayushbharti.in" className="text-lg font-semibold text-blue-400 hover:text-blue-300 mt-4">
                contact@aayushbharti.in
            </a>
            <div className="flex gap-6 mt-8">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                    <Github size={24} />
                </a>
                <a href="mailto:contact@aayushbharti.in" className="text-neutral-400 hover:text-white transition-colors">
                    <Mail size={24} />
                </a>
            </div>
            <p className="text-neutral-600 mt-12 text-sm">&copy; 2024 Aayush Bharti. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
