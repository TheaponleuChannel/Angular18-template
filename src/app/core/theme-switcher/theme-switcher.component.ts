import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { ThemeService, ThemeName } from '../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent implements OnInit {
  isDarkMode = false;
  currentTheme: ThemeName = 'blue';
  availableThemes: ThemeName[] = [];
  themeDisplayNames: { [key: string]: string } = {};

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Get current theme state
    const config = this.themeService.getTheme();
    this.isDarkMode = config.mode === 'dark';
    this.currentTheme = config.name;

    // Get available themes
    this.availableThemes = this.themeService.getAvailableThemes();
    this.availableThemes.forEach(theme => {
      this.themeDisplayNames[theme] = this.themeService.getThemeDisplayName(theme);
    });
  }

  /**
   * Toggle between light and dark mode
   */
  toggleMode(): void {
    this.themeService.toggleMode();
    this.isDarkMode = !this.isDarkMode;
  }

  /**
   * Set specific theme
   */
  setTheme(themeName: ThemeName): void {
    this.themeService.setTheme(themeName);
    this.currentTheme = themeName;
  }

  /**
   * Get icon based on current mode
   */
  getModeIcon(): string {
    return this.isDarkMode ? 'light_mode' : 'dark_mode';
  }

  /**
   * Get mode label
   */
  getModeLabel(): string {
    return this.isDarkMode ? 'Light Mode' : 'Dark Mode';
  }
}
