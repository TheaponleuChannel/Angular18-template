import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular18-template';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Initialize theme from localStorage or system preference
    this.themeService.getTheme();
  }
}
