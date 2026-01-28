import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '../../context/ThemeContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

global.localStorage = localStorageMock;

// Mock matchMedia
global.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    document.documentElement.classList.remove('dark');
  });

  test('renders theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByTestId('theme-toggle-button');
    expect(button).toBeInTheDocument();
  });

  test('shows moon icon in light mode', () => {
    localStorageMock.getItem.mockReturnValue('light');
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByTestId('theme-toggle-button');
    // Moon icon should be present for light mode
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  test('toggles theme when clicked', () => {
    localStorageMock.getItem.mockReturnValue('light');
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByTestId('theme-toggle-button');
    
    // Click to toggle to dark mode
    fireEvent.click(button);
    
    // Check localStorage was called with 'dark'
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('adds dark class to documentElement when in dark mode', () => {
    localStorageMock.getItem.mockReturnValue('light');
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByTestId('theme-toggle-button');
    
    // Initially should not have dark class
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Click to toggle to dark mode
    fireEvent.click(button);
    
    // Should have dark class now
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('removes dark class when toggling to light mode', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Should have dark class initially
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    const button = screen.getByTestId('theme-toggle-button');
    
    // Click to toggle to light mode
    fireEvent.click(button);
    
    // Should not have dark class now
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('persists theme preference in localStorage', () => {
    localStorageMock.getItem.mockReturnValue('light');
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByTestId('theme-toggle-button');
    
    // Toggle to dark
    fireEvent.click(button);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    
    // Toggle back to light
    fireEvent.click(button);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});
