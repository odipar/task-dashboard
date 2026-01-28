import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useThemeContext } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-neutral-100 dark:bg-slate-700 hover:bg-neutral-200 dark:hover:bg-slate-600 transition-colors"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      data-testid="theme-toggle-button"
    >
      {isDarkMode ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-neutral-700" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
