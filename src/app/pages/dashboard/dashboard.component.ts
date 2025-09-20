import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { NgIcon } from '@ng-icons/core';
import { GlitchTextComponent } from '../../shared/components/glitch-text/glitch-text.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, StatCardComponent, NgIcon, GlitchTextComponent, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardPageComponent {
  currentTime = new Date()

  // Stats for dashboard
  stats = [
    {
      title: "dashboard.stats.experience",
      value: "3+",
      icon: 'lucideActivity',
      trend: "+15%",
      trendUp: true,
    },
    {
      title: "dashboard.stats.projects",
      value: "50+",
      icon: 'lucideLayers',
      trend: "+3",
      trendUp: true,
    },
    {
      title: "dashboard.stats.technologies",
      value: "10+",
      icon: 'lucideCode',
      trend: "+2",
      trendUp: true,
    },
    {
      title: "dashboard.stats.uptime",
      value: "100%",
      icon: 'lucideServer',
      trend: "10%",
      trendUp: true,
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

  scrollToContact(): void {
    const contactElement = document.getElementById('contact');
    if(contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth"})
    }
  }
}
