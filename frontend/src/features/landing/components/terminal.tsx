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

const AVAILABLE_COMMANDS = ["about", "stack", "work", "contact", "clear", "whoami", "ls", "exit", "help"];

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
  const [isMinimized, setIsMinimized] = useState(true); // Start minimized for the drop-down effect
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: "init-1", type: "output", content: "jinson_os v1.25.0-stable initialized.", isStreaming: false },
    { id: "init-2", type: "input", content: "whoami", isStreaming: false },
    { id: "init-3", type: "output", content: "jinson_eb // ai_systems_engineer // client_deployments // production_not_demos", isStreaming: false },
    { id: "init-4", type: "input", content: "help", isStreaming: false },
    { id: "init-5", type: "output", content: "Available commands: about, stack, work, contact, clear, whoami, ls, exit", isStreaming: false },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Trigger initial expansion after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimized(false);
    }, 400); 
    return () => clearTimeout(timer);
  }, []);

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
    const parts = cleanCmd.split(/\s+/);
    const baseCmd = parts[0];
    const args = parts.slice(1);
    
    const now = Date.now();
    const inputId = `in-${now}`;
    const outputId = `out-${now}`;
    
    setHistory(prev => [...prev, { id: inputId, type: "input", content: cmd, isStreaming: false }]);

    let outputContent: string | React.ReactNode = "";

    switch (baseCmd) {
      case "help":
        outputContent = "Available commands: about, stack, work, contact, clear, whoami, ls, exit";
        break;
      case "whoami":
        outputContent = "jinson_eb // ai_systems_engineer // client_deployments // production_not_demos";
        break;
      case "ls":
        if (args.includes("projects") || args.includes("projects/")) {
          outputContent = "agentic-orchestrator/  rag-systems/  production-observability/  enterprise-data-forge/";
        } else {
          outputContent = "about.md  experience.log  stack.json  projects/  contact.txt";
        }
        break;
      case "work":
        outputContent = "PROJECTS: agentic-orchestrator, rag-systems, production-observability, enterprise-data-forge. Type 'ls projects/' for a detailed list.";
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
        isStreaming: isString 
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const currentInput = input.trim();
      if (!currentInput) {
        setHistory(prev => [...prev, 
          { id: `tab-empty-in-${Date.now()}`, type: "input", content: "", isStreaming: false },
          { id: `tab-empty-out-${Date.now()}`, type: "output", content: AVAILABLE_COMMANDS.join("  "), isStreaming: false }
        ]);
        return;
      }

      const matches = AVAILABLE_COMMANDS.filter(c => c.startsWith(currentInput));

      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, 
          { id: `tab-in-${Date.now()}`, type: "input", content: input, isStreaming: false },
          { id: `tab-out-${Date.now()}`, type: "output", content: matches.join("  "), isStreaming: false }
        ]);
      }
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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            width: "100%",
            maxWidth: isMaximized ? "100%" : "48rem" 
          }}
          exit={{ opacity: 0, scale: 0.95, y: 20, height: 0 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut",
            layout: { type: "spring", stiffness: 105, damping: 23 }
          }}
          className={cn(
            "rounded-xl overflow-hidden border border-border bg-[oklch(0.10_0_0)] shadow-2xl mx-auto relative",
            isMaximized && "fixed inset-4 z-[60] mt-0"
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
                animate={{ 
                  height: isMaximized ? "calc(100vh - 8rem)" : "320px", 
                  opacity: 1 
                }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  height: { type: "spring", stiffness: 105, damping: 23 },
                  opacity: { duration: 0.3, delay: 0.1 }
                }}
                className="overflow-hidden flex flex-col"
              >
                <div 
                  ref={scrollRef}
                  className="flex-1 p-6 font-technical text-[0.9375rem] leading-relaxed text-left space-y-2.5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20"
                >
                  {history.map((line) => (
                    <div key={line.id} className="flex gap-2.5 break-all">
                      {line.type === "input" && <span className="text-primary font-bold shrink-0 mt-0.5">$</span>}
                      <div className={cn(
                        "tracking-tight",
                        line.type === "input" ? "text-foreground font-medium" : "text-foreground/80 ml-5"
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
                    <form onSubmit={handleSubmit} className="flex items-start gap-2.5">
                      <span className="text-primary font-bold shrink-0 mt-0.5">$</span>
                      <div className="flex-1 relative flex items-center min-h-[1.5rem]">
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="absolute inset-0 w-full bg-transparent border-none outline-none text-transparent p-0 m-0 font-technical text-[0.9375rem] focus:ring-0 z-10"
                          autoFocus
                          autoComplete="off"
                          spellCheck="false"
                        />
                        <div className="flex items-center font-technical text-[0.9375rem] font-medium text-foreground whitespace-pre-wrap break-all pointer-events-none">
                          <span>{input}</span>
                          <div className="bg-primary w-2.5 h-[1.1em] ml-0.5 animate-[blink_1s_step-end_infinite] shrink-0" />
                        </div>
                      </div>
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
