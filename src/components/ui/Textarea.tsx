import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

/**
 * Reusable, premium SaaS UI textarea primitive.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full px-4 py-3 bg-zinc-950 border ${
          error ? 'border-red-500 focus:border-red-500' : 'border-zinc-850 focus:border-violet-500'
        } rounded-lg text-sm text-white focus:outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
