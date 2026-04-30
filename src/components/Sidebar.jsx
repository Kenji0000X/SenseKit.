import { useState } from 'react'
import {
  LayoutDashboard,
  Mic,
  Settings,
  ChevronRight,
  ChevronLeft,
  Accessibility,
} from 'lucide-react'

/**
 * Sidebar Component
 * Collapsible left navigation rail for PWD Accessibility Toolkit
 */
export default function Sidebar({
  expanded,
  setExpanded,
  activeSection,
  setActiveSection,
  onOpenSettings,
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'voice', label: 'Voice Input', icon: Mic },
  ]

  return (
    <aside
      className={`${expanded ? 'w-64' : 'w-16'} bg-[#0a0e27]/90 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out opacity-100 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.4)]`}
      role="navigation"
      aria-label="Main navigation"
    >

      {/* Logo / Brand */}
      <div className={`h-16 flex items-center ${expanded ? 'px-4' : 'justify-center'} border-b border-white/10`}>
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
          <Accessibility className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        {expanded && (
          <span className="ml-3 font-bold text-white text-sm truncate tracking-tight">
            PWD Toolkit
          </span>
        )}
      </div>


      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-2">

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center ${expanded ? 'px-4' : 'justify-center px-0'} py-3 rounded-xl transition-all duration-200 focus-visible:ring-4 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14] ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}

              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >

              <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
              {expanded && (
                <span className="ml-3 text-sm font-medium truncate">{item.label}</span>
              )}
            </button>
          )
        })}

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className={`w-full flex items-center ${expanded ? 'px-4' : 'justify-center px-0'} py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 focus-visible:ring-4 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]`}
          aria-label="Open settings"
        >

          <Settings className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
          {expanded && (
            <span className="ml-3 text-sm font-medium truncate">Settings</span>
          )}
        </button>

      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-white/20">

        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center ${expanded ? 'px-2' : 'justify-center'} py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 focus-visible:ring-4 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]`}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={expanded}
        >

          {expanded ? (
            <>
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              <span className="ml-2 text-sm">Collapse</span>
            </>
          ) : (
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          )}
        </button>
      </div>
    </aside>
  )
}
