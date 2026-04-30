import { forwardRef } from 'react'

/**
 * Semantic HTML Components
 * Use proper HTML elements for accessibility
 */

export const Header = forwardRef(({ children, className = '', ...props }, ref) => (
  <header
    ref={ref}
    className={`w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 ${className}`}
    {...props}
  >
    {children}
  </header>
))
Header.displayName = 'Header'

export const Nav = forwardRef(({ children, className = '', ...props }, ref) => (
  <nav
    ref={ref}
    className={`flex gap-4 items-center ${className}`}
    {...props}
  >
    {children}
  </nav>
))
Nav.displayName = 'Nav'

export const Main = forwardRef(({ children, className = '', ...props }, ref) => (
  <main
    ref={ref}
    className={`flex-1 container mx-auto px-4 py-8 ${className}`}
    {...props}
  >
    {children}
  </main>
))
Main.displayName = 'Main'

export const Section = forwardRef(({ children, className = '', title, ...props }, ref) => (
  <section
    ref={ref}
    className={`space-y-4 ${className}`}
    {...props}
  >
    {title && <h2 className="text-2xl font-bold">{title}</h2>}
    {children}
  </section>
))
Section.displayName = 'Section'

export const Footer = forwardRef(({ children, className = '', ...props }, ref) => (
  <footer
    ref={ref}
    className={`w-full bg-slate-900 text-white py-6 mt-12 ${className}`}
    {...props}
  >
    {children}
  </footer>
))
Footer.displayName = 'Footer'

/**
 * Skip to Main Content Link
 * Must be first focusable element for keyboard users
 */
export const SkipToMainLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:rounded-b"
    aria-label="Skip to main content"
  >
    Skip to main content
  </a>
)

/**
 * Landmark Navigation
 * Helps screen reader users jump to different sections
 */
export const SkipLinks = () => (
  <nav aria-label="Skip navigation" className="sr-only">
    <ul className="space-y-2">
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#navigation">Skip to navigation</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
  </nav>
)
