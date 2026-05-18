import { Injectable, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type ThemeName = 'blue' | 'purple' | 'pink';

interface ThemeConfig {
  mode: ThemeMode;
  name: ThemeName;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = signal<ThemeConfig>({
    mode: this.getInitialMode(),
    name: this.getInitialTheme()
  });

  public mode$ = signal<ThemeMode>(this.currentTheme().mode);
  public theme$ = signal<ThemeName>(this.currentTheme().name);

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Effect to sync theme to DOM and localStorage
    effect(() => {
      const config = this.currentTheme();
      this.applyTheme(config);
      localStorage.setItem('app-theme-mode', config.mode);
      localStorage.setItem('app-theme-name', config.name);
    });
  }

  /**
   * Get the initial theme mode from localStorage or system preference
   */
  private getInitialMode(): ThemeMode {
    const saved = localStorage.getItem('app-theme-mode') as ThemeMode | null;
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Get the initial theme name from localStorage or default
   */
  private getInitialTheme(): ThemeName {
    const saved = localStorage.getItem('app-theme-name') as ThemeName | null;
    return saved || 'blue';
  }

  /**
   * Apply theme to the document
   */
  private applyTheme(config: ThemeConfig): void {
    const htmlElement = this.document.documentElement;

    // Remove old theme classes
    htmlElement.classList.remove('light-theme', 'dark-theme');
    htmlElement.classList.remove('theme-blue', 'theme-purple', 'theme-pink');

    // Add new theme classes
    htmlElement.classList.add(
      `${config.mode}-theme`,
      `theme-${config.name}`
    );

    // Update CSS custom properties for dynamic theme switching
    htmlElement.setAttribute('data-theme-mode', config.mode);
    htmlElement.setAttribute('data-theme-name', config.name);
  }

  /**
   * Toggle between light and dark mode
   */
  toggleMode(): void {
    const current = this.currentTheme();
    const newMode: ThemeMode = current.mode === 'light' ? 'dark' : 'light';
    this.currentTheme.set({ ...current, mode: newMode });
    this.mode$.set(newMode);
  }

  /**
   * Set specific theme mode
   */
  setMode(mode: ThemeMode): void {
    const current = this.currentTheme();
    if (current.mode !== mode) {
      this.currentTheme.set({ ...current, mode });
      this.mode$.set(mode);
    }
  }

  /**
   * Switch to a different theme
   */
  setTheme(themeName: ThemeName): void {
    const current = this.currentTheme();
    if (current.name !== themeName) {
      this.currentTheme.set({ ...current, name: themeName });
      this.theme$.set(themeName);
    }
  }

  /**
   * Get current theme configuration
   */
  getTheme(): ThemeConfig {
    return this.currentTheme();
  }

  /**
   * Get current theme mode
   */
  getMode(): ThemeMode {
    return this.currentTheme().mode;
  }

  /**
   * Get current theme name
   */
  getThemeName(): ThemeName {
    return this.currentTheme().name;
  }

  /**
   * Get all available themes
   */
  getAvailableThemes(): ThemeName[] {
    return ['blue', 'purple', 'pink'];
  }

  /**
   * Get theme display name
   */
  getThemeDisplayName(themeName: ThemeName): string {
    const displayNames: Record<ThemeName, string> = {
      'blue': 'Blue',
      'purple': 'Purple',
      'pink': 'Pink'
    };
    return displayNames[themeName];
  }
}
