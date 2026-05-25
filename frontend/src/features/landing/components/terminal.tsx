"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type TerminalLine = {
  type: "input" | "output";
  content: string | React.ReactNode;
  id: string;
  isStreaming?: boolean;
};

const Typewriter = ({ 
  content, 
  speed = 8, 
  onComplete 
}: { 
  content: string; 
  speed?: number; 
  onComplete?: () => void 
}) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedContent(content.slice(0, index + 1));
      index++;
      if (index >= content.length) {
        clearInterval(interval);
        onCompleteRef.current?.();
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [content, speed]);

  return <span>{displayedContent}</span>;
};

export const SystemTerminal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: "init-1", type: "output", content: "jinson_os v1.25.0-stable initialized.", isStreaming: false },
    { id: "init-2", type: "input", content: "whoami", isStreaming: false },
    { id: "init-3", type: "output", content: "jinson_eb // principal_backend_engineer // builder_of_foundations", isStreaming: false },
    { id: "init-4", type: "input", content: "help", isStreaming: false },
    { id: "init-5", type: "output", content: "Available commands: about, stack, work, contact, clear, whoami, ls, exit", isStreaming: false },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isMinimized]);

  const handleStreamingComplete = useCallback((id: string) => {
    setHistory(prev => prev.map(line => 
      line.id === id ? { ...line, isStreaming: false } : line
    ));
    setIsTyping(false);
  }, []);

  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    const now = Date.now();
    const inputId = `in-${now}`;
    const outputId = `out-${now}`;
    
    setHistory(prev => [...prev, { id: inputId, type: "input", content: cmd, isStreaming: false }]);

    let outputContent: string | React.ReactNode = "";

    switch (cleanCmd) {
      case "help":
        outputContent = "Available commands: about, stack, work, contact, clear, whoami, ls, exit";
        break;
      case "whoami":
        outputContent = "jinson_eb // principal_backend_engineer // builder_of_foundations";
        break;
      case "ls":
        outputContent = "about.md  experience.log  stack.json  projects/  contact.txt";
        break;
      case "about":
        outputContent = "Backend-focused engineer specializing in scalable architectures and high-performance logic. Architecting digital foundations with precision.";
        break;
      case "stack":
        outputContent = "BACKEND: Go, Python, .NET Core | DB: PostgreSQL, Oracle | FRONTEND: Next.js, Angular | INFRA: AWS, Docker, Linux";
        break;
      case "contact":
        outputContent = (
          <div className="flex flex-col gap-1">
            <span>GITHUB: github.com/FourAndHalf</span>
            <span>LINKEDIN: linkedin.com/in/jinsoneb/</span>
            <span>MAIL: jinsoneb@gmail.com</span>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setIsTyping(false);
        return;
      case "exit":
        setIsVisible(false);
        return;
      case "":
        return;
      default:
        outputContent = `command not found: ${cmd}. Type 'help' for assistance.`;
    }

    if (outputContent) {
      const isString = typeof outputContent === "string";
      setIsTyping(isString);
      setHistory(prev => [...prev, { 
        id: outputId, 
        type: "output", 
        content: outputContent, 
        isStreaming: isString // Only stream strings for now
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping || !input.trim()) {
      if (!input.trim()) setInput("");
      return;
    }
    processCommand(input);
    setInput("");
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 40 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            width: "100%",
            maxWidth: isMaximized ? "100%" : "48rem" 
          }}
          exit={{ opacity: 0, scale: 0.95, y: 20, height: 0, marginTop: 0 }}
          transition={{ 
            duration: 0.5, 
            type: "spring", 
            stiffness: 120, 
            damping: 25,
            layout: { type: "spring", stiffness: 120, damping: 25 }
          }}
          className={cn(
            "rounded-xl overflow-hidden border border-border bg-[oklch(0.10_0_0)] shadow-2xl mx-auto",
            isMaximized ? "fixed inset-4 z-[60] mt-0" : "relative mt-12"
          )}
          onClick={handleTerminalClick}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 border-b border-border select-none cursor-default">
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                className="group flex items-center justify-center w-3 h-3 rounded-full bg-[oklch(0.6_0.2_25)]/40 hover:bg-[oklch(0.6_0.2_25)] transition-colors"
              >
                <X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-white" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                className="group flex items-center justify-center w-3 h-3 rounded-full bg-[oklch(0.8_0.15_85)]/40 hover:bg-[oklch(0.8_0.15_85)] transition-colors"
              >
                <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-white" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                className="group flex items-center justify-center w-3 h-3 rounded-full bg-[oklch(0.7_0.15_145)]/40 hover:bg-[oklch(0.7_0.15_145)] transition-colors"
              >
                <Plus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-white" />
              </button>
            </div>
            
            <div className="text-label-caps text-muted-foreground tracking-widest text-[10px]">
              terminal
            </div>
            
            <div className="w-12" />
          </div>

          {/* Terminal Content */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isMaximized ? "calc(100vh - 8rem)" : "320px", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden flex flex-col"
              >
                <div 
                  ref={scrollRef}
                  className="flex-1 p-6 font-technical text-sm text-left space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20"
                >
                  {history.map((line) => (
                    <div key={line.id} className="flex gap-2 break-all">
                      {line.type === "input" && <span className="text-primary shrink-0">$</span>}
                      <div className={cn(
                        line.type === "input" ? "text-foreground" : "text-muted-foreground ml-4"
                      )}>
                        {line.isStreaming && typeof line.content === "string" ? (
                          <Typewriter 
                            content={line.content} 
                            speed={8} 
                            onComplete={() => handleStreamingComplete(line.id)} 
                          />
                        ) : (
                          line.content
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {!isTyping && (
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <span className="text-primary shrink-0">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-foreground p-0 m-0 caret-primary"
                        autoFocus
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
