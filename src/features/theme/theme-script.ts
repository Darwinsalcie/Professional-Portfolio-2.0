import {
  DEFAULT_THEME_CHOICE,
  THEME_CHOICES,
  THEME_STORAGE_KEY,
  type ThemeChoice,
} from './theme-constants'
import { isThemeChoice } from './theme'

/**
 * Minified inline script string injected into index.html <head> before first paint.
 */
export const THEME_INLINE_SCRIPT = `(function () {
  try {
    var key = '${THEME_STORAGE_KEY}';
    var choice = localStorage.getItem(key);
    var valid = ${JSON.stringify(THEME_CHOICES)};
    if (!choice || valid.indexOf(choice) === -1) {
      choice = 'system';
    }
    var resolved = choice;
    if (choice === 'system') {
      var mql = window.matchMedia('(prefers-color-scheme: dark)');
      resolved = mql.matches ? 'dark' : 'light';
    }
    var doc = document.documentElement;
    doc.setAttribute('data-theme', resolved);
    doc.setAttribute('data-theme-choice', choice);
    doc.style.colorScheme = resolved === 'light' ? 'light' : 'dark';
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.setAttribute('data-theme-choice', 'system');
    document.documentElement.style.colorScheme = 'dark';
  }
})();`

/**
 * Executes the inline script logic in an environment-safe manner.
 */
export function runThemeInlineScript(
  storage: Pick<Storage, 'getItem'> = localStorage,
  doc: HTMLElement = document.documentElement,
): void {
  try {
    const raw = storage.getItem(THEME_STORAGE_KEY)
    const choice: ThemeChoice = isThemeChoice(raw) ? raw : DEFAULT_THEME_CHOICE
    let resolved = choice
    if (choice === 'system') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      resolved = mql.matches ? 'dark' : 'light'
    }
    doc.setAttribute('data-theme', resolved)
    doc.setAttribute('data-theme-choice', choice)
    doc.style.colorScheme = resolved === 'light' ? 'light' : 'dark'
  } catch {
    doc.setAttribute('data-theme', 'dark')
    doc.setAttribute('data-theme-choice', 'system')
    doc.style.colorScheme = 'dark'
  }
}
