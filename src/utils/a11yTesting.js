/**
 * Accessibility Testing Utility
 * Integrates axe-core for automated accessibility audits
 * Runs during development to catch violations early
 */

import * as axe from 'axe-core'

export const runAxeAudit = async (options = {}) => {
  const defaultOptions = {
    runOnly: {
      type: 'tag',
      values: ['wcag2aa', 'wcag2aaa', 'best-practice'],
    },
    ...options,
  }

  try {
    const results = await axe.run(defaultOptions)
    return {
      violations: results.violations,
      passes: results.passes,
      incomplete: results.incomplete,
      inaccessible: results.inapplicable,
    }
  } catch (error) {
    console.error('Axe audit failed:', error)
    return null
  }
}

/**
 * Report violations to console in a readable format
 */
export const reportViolations = (results) => {
  if (!results || results.violations.length === 0) {
    console.log('%c✅ No accessibility violations found!', 'color: green; font-weight: bold;')
    return
  }

  console.log(
    `%c⚠️ Found ${results.violations.length} accessibility violation(s)`,
    'color: orange; font-weight: bold;'
  )

  results.violations.forEach((violation, index) => {
    console.group(
      `%c${index + 1}. ${violation.id.toUpperCase()} (${violation.impact})`,
      'color: red; font-weight: bold;'
    )
    console.log('Description:', violation.description)
    console.log('Help:', violation.help)
    console.log('Help URL:', violation.helpUrl)
    console.log('Affected nodes:', violation.nodes.length)
    violation.nodes.forEach((node, i) => {
      console.log(`  ${i + 1}. ${node.html}`)
    })
    console.groupEnd()
  })
}

/**
 * Check contrast ratio between two colors
 * Returns WCAG compliance level
 */
export const checkContrast = (foreground, background) => {
  const fgLuminance = getRelativeLuminance(foreground)
  const bgLuminance = getRelativeLuminance(background)

  const lighter = Math.max(fgLuminance, bgLuminance)
  const darker = Math.min(fgLuminance, bgLuminance)

  const ratio = (lighter + 0.05) / (darker + 0.05)

  return {
    ratio: ratio.toFixed(2),
    wcag_aa: ratio >= 4.5, // Normal text
    wcag_aaa: ratio >= 7, // Normal text
    wcag_aa_large: ratio >= 3, // 18pt+ or 14pt+ bold
    wcag_aaa_large: ratio >= 4.5, // 18pt+ or 14pt+ bold
  }
}

/**
 * Calculate relative luminance of a color
 */
const getRelativeLuminance = (color) => {
  // Parse hex color
  const r = parseInt(color.substring(1, 3), 16) / 255
  const g = parseInt(color.substring(3, 5), 16) / 255
  const b = parseInt(color.substring(5, 7), 16) / 255

  const [rs, gs, bs] = [r, g, b].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Run accessibility audit in development
 */
let auditInProgress = false
let auditTimeout = null

export const initializeA11yTesting = () => {
  if (import.meta.env.MODE === 'development') {
    // Clear any pending audit
    if (auditTimeout) clearTimeout(auditTimeout)
    
    // Only run if not already in progress
    if (auditInProgress) return
    
    // Run audit after a short delay to allow DOM to settle
    auditTimeout = setTimeout(async () => {
      if (auditInProgress) return
      
      auditInProgress = true
      try {
        const results = await runAxeAudit()
        reportViolations(results)
      } finally {
        auditInProgress = false
      }
    }, 1000)
  }
}
