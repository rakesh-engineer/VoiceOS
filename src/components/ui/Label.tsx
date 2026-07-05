import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/**
 * Reusable, premium SaaS UI label primitive.
 */
export const Label: React.FC<LabelProps> = ({ children, required = false, className = '', ...props }) => {
  return (
    <label className={`text-xs font-semibold text-zinc-400 ${className}`} {...props}>
      {children}
      {required && <span className="text-violet-500 ml-1">*</span>}
    </label>
  );
};
