'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GradientButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  glow?: boolean;
}

const GradientButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  disabled = false,
  glow = true
}: GradientButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: `gradient-primary text-white ${glow ? 'glow' : ''} shadow-2xl`,
    secondary: `gradient-secondary text-white ${glow ? 'glow-pink' : ''} shadow-2xl`,
    accent: `gradient-accent text-white ${glow ? 'glow-blue' : ''} shadow-2xl`,
    outline: 'glass border border-white/20 text-white hover:bg-white/10'
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
};

export default GradientButton;