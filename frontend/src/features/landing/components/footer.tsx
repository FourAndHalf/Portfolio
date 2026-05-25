"use client";

import { Terminal, Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Terminal className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold tracking-tighter text-xl uppercase">JINSON<span className="text-primary">.</span>DEV</span>
          </div>
          <p className="text-code-md text-muted-foreground">© 2026 Jinson E B // BUILD_VER_1.25.0</p>
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com/FourAndHalf" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/jinsoneb/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:jinsoneb@gmail.com" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
