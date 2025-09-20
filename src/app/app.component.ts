import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroPageComponent } from './pages/hero/hero.component';
import { NgIconsModule } from '@ng-icons/core';
import { ContactPageComponent } from './pages/contact/contact.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { AboutPageComponent } from './pages/about/about.component';
import { ProjectsPageComponent } from './pages/projects/projects.component';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AnalyticsService } from './shared/services/analytics.service';

interface Section {
  id: string
  element: HTMLElement | null
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    NgIconsModule,
    HeaderComponent,
    FooterComponent,
    HeroPageComponent,
    DashboardPageComponent,
    AboutPageComponent,
    ProjectsPageComponent,
    SkillsPageComponent,
    ContactPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentTime = new Date()
  activeSection = "hero"
  scrollY = 0

  constructor(private analyticsService: AnalyticsService) {
    // Update time every second
    setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  }

  ngOnInit() {
    // Track initial page view
    this.analyticsService.trackPageView('home');
  }

  @HostListener("window:scroll", ["$event"])
  onScroll() {
    this.scrollY = window.scrollY
    this.updateActiveSection()
  }

  updateActiveSection() {
    // Determine which section is currently in view
    const sections = ["hero", "dashboard", "about", "projects", "skills", "contact"]

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = section
          break
        }
      }
    }
  }

  scrollToSection(id: string) {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      this.activeSection = id
      
      // Track section navigation
      this.analyticsService.trackButtonClick(`navigate_to_${id}`, 'navigation');
    }
  }
}
