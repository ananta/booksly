import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines and merges class names using clsx and tailwind-merge.
 *
 * This utility function simplifies the process of conditionally combining and merging class names,
 * particularly useful when working with Tailwind CSS and dynamic class names.
 *
 * @param {ClassValue[]} inputs - An array of class values that can be strings, objects, or arrays of strings and objects.
 * @returns {string} A single string with the combined and merged class names.
 *
 * @example
 * // Usage example with conditional class names
 * const buttonClass = cn('btn', isActive && 'btn-active', 'btn-lg');
 * // Result: 'btn btn-active btn-lg' if isActive is true
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
