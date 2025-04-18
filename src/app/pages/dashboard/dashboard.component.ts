import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { NgIcon } from '@ng-icons/core';
import { GlitchTextComponent } from '../../shared/components/glitch-text/glitch-text.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, StatCardComponent, NgIcon, GlitchTextComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardPageComponent {
  currentTime = new Date()
  // Stats for dashboard
  stats = [
    {
      title: "Experience",
      value: "5+ Years",
      icon: 'lucideActivity',
      trend: "+15%",
      trendUp: true,
    },
    {
      title: "Projects",
      value: "25+",
      icon: 'lucideLayers',
      trend: "+3",
      trendUp: true,
    },
    {
      title: "Technologies",
      value: "15+",
      icon: 'lucideCode',
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Uptime",
      value: "99.9%",
      icon: 'lucideServer',
      trend: "0.1%",
      trendUp: false,
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  scrollToAbout(): void {
    const aboutElement = document.getElementById("about")
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" })
    }
  }
}
