import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * Reusable, premium SaaS UI input primitive.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 bg-zinc-950 border ${
          error ? 'border-red-500 focus:border-red-500' : 'border-zinc-850 focus:border-violet-500'
        } rounded-lg text-sm text-white focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
