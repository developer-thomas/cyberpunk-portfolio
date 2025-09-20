import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { GlitchTextComponent } from '../../shared/components/glitch-text/glitch-text.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-projects-page',
  imports: [CommonModule, NgIcon, GlitchTextComponent, ProjectCardComponent, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsPageComponent implements OnInit{
  currentTime = new Date()

  // Projects data
  projects = [
    {
      titleKey: "projects.neonDashboard.title",
      descriptionKey: "projects.neonDashboard.description",
      image: "assets/projects-images/next-dashboard.png",
      tags: ["Next.js", "Radix UI", "Tailwind", "Shadcn UI", "Lucide Icons", "TypeScript"],
      demoUrl: "https://next-cyber-dashboard.vercel.app/",
      githubUrl: "https://github.com/developer-thomas/next-dashboard",
      variant: "dashboard",
    },
    {
      titleKey: "projects.eventManagement.title",
      descriptionKey: "projects.eventManagement.description",
      image: "assets/projects-images/atocultural.png",
      tags: ["Angular 17", "Google Maps API", "Payment Checkout", "Tailwind", "Angular Material", "Sass", "API RESTFul"],
      demoUrl: "https://cidadedacultura.com.br",
      githubUrl: "https://github.com/developer-thomas/ato-cultural-web",
      variant: "dashboard",
    },
    {
      titleKey: "projects.flightSystem.title",
      descriptionKey: "projects.flightSystem.description",
      image: "assets/projects-images/mobair.png",
      tags: ["Angular 16", "API RESTFul", "Angular Material", "Tailwind", "Sweetalert2" ],
      demoUrl: "https://mobair.com.br",
      githubUrl: "https://github.com/developer-thomas/airbus-ticket-system",
      variant: "dashboard",
    },
    {
      titleKey: "projects.usinaWebsite.title",
      descriptionKey: "projects.usinaWebsite.description",
      image: "assets/projects-images/usina.png",
      demoUrl: "https://usina-rr.netlify.app/",
      tags: ["Angular 16", "Bootstrap", "Sass", "Leaflet"],
      githubUrl: "https://github.com/developer-thomas/usina-website",
      variant: "dashboard",
    },
    {
      titleKey: "projects.ecommerceManagement.title",
      descriptionKey: "projects.ecommerceManagement.description",
      image: "assets/projects-images/ecommerce.png",
      tags: ["Angular 17", "Tailwind", "Angular Material", "Sass"],
      demoUrl: "https://github.com/developer-thomas/ecommerce-management",
      githubUrl: "https://ecommerce-management-admin.vercel.app",
      variant: "dashboard",
    },
    {
      titleKey: "projects.gymFinder.title",
      descriptionKey: "projects.gymFinder.description",
      image: "assets/projects-images/smartfit.png",
      tags: ["Angular 17", "Bootstrap", "Sass", "Leaflet"],
      demoUrl: "https://smartfit-finder.netlify.app/",
      githubUrl: "https://github.com/developer-thomas/smartfit-finder",
      variant: "dashboard",
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  goToGithub() {
    window.open('https://github.com/developer-thomas?tab=repositories', "_blank")
  }
}
