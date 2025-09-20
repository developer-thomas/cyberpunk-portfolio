import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';

@Component({
  selector: 'app-hero-page',
  imports: [
    HeroSectionComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollToDashboard(): void {
    const dashboardElement = document.getElementById("dashboard")
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  scrollToProjects(): void {
    const projectsElement = document.getElementById("projects")
    if(projectsElement) {
      projectsElement.scrollIntoView({ behavior: "smooth"})
    }
  }
}
