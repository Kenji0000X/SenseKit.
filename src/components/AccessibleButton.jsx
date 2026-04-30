import { useState } from 'react';
import { speakText } from '../utils/speechHelper';

/**
 * Accessible Button Component
 * Provides verbal feedback via Web Speech API and full keyboard support
 */
export default function AccessibleButton({
  label,
  onClick,
  description,
  variant = 'primary',
  icon = null,
  disabled = false,
  className = '',
}) {
  const [isSpoken, setIsSpoken] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;

    // Provide verbal feedback
    if (description) {
      speakText(description);
      setIsSpoken(true);
      setTimeout(() => setIsSpoken(false), 1000);
    }

    // Execute callback
    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses =
    'px-6 py-3 font-bold rounded-xl transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]';



  const variantClasses = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 disabled:bg-gray-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]',
    secondary:
      'bg-slate-700 text-white hover:bg-slate-600 disabled:bg-slate-800',
    success:
      'bg-emerald-500 text-white hover:bg-emerald-400 disabled:bg-gray-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    danger:
      'bg-rose-500 text-white hover:bg-rose-400 disabled:bg-gray-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]',
    'high-contrast':
      'bg-black text-cyan-300 border-4 border-cyan-300 hover:bg-gray-900',
  };



  const indicatorClass = isSpoken ? 'ring-2 ring-green-400' : '';

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${indicatorClass} ${className}`}
      aria-label={label}
      aria-description={description}
      aria-disabled={disabled}
      role="button"
    >
      <span className="flex items-center justify-center gap-2">
        {icon && <span aria-hidden="true">{icon}</span>}
        {label}
      </span>
    </button>
  );
}
