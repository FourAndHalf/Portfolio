import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { SystemTerminal } from './terminal';

// Mock framer-motion manually
vi.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props}>{props.children}</div>,
    span: (props: any) => <span {...props}>{props.children}</span>,
  },
  AnimatePresence: (props: any) => <>{props.children}</>,
}));

describe('SystemTerminal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('initializes and expands after delay', async () => {
    render(<SystemTerminal />);
    
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText(/jinson_os/i)).toBeDefined();
    expect(screen.getByText(/ai_systems_engineer/i)).toBeDefined();
    expect(screen.getByText(/Available commands:/i)).toBeDefined();
  });

  it('handles tab completion for unique matches', async () => {
    render(<SystemTerminal />);
    
    act(() => {
      vi.advanceTimersByTime(400);
    });

    const input = screen.getByRole('textbox') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'who' } });
    fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });

    expect(input.value).toBe('whoami');
  });

  it('clears history when clear command is run', async () => {
    render(<SystemTerminal />);
    
    act(() => {
      vi.advanceTimersByTime(400);
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.queryByText(/jinson_os/i)).toBeNull();
  });

  it('toggles minimize state', async () => {
    render(<SystemTerminal />);
    
    act(() => {
      vi.advanceTimersByTime(400);
    });
    
    expect(screen.getByRole('textbox')).toBeDefined();

    const buttons = screen.getAllByRole('button');
    const minimizeBtn = buttons[1];
    
    fireEvent.click(minimizeBtn);
    expect(screen.queryByRole('textbox')).toBeNull();
    
    fireEvent.click(minimizeBtn);
    expect(screen.getByRole('textbox')).toBeDefined();
  });

  it('handles ls projects/ argument', async () => {
    render(<SystemTerminal />);
    
    act(() => {
      vi.advanceTimersByTime(400);
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ls projects/' } });
    fireEvent.submit(input.closest('form')!);

    act(() => {
      vi.advanceTimersByTime(1000); 
    });

    expect(screen.getByText(/agentic-orchestrator/i)).toBeDefined();
    expect(screen.getByText(/rag-systems/i)).toBeDefined();
  });
});
