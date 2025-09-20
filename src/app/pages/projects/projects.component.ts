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
      title: "Neon Dashboard",
      description: "A cyberpunk-inspired admin dashboard with dark mode and data visualization.",
      image: "assets/images/neon-city-dashboard.png",
      tags: ["React", "Chart.js", "Tailwind"],
      demoUrl: "usina-rr.netlify.app",
      githubUrl: "",
      variant: "dashboard",
    },
    {
      title: "Gestão de Eventos e Compra de Ingressos",
      description: "A platform featuring an admin panel for event management and a client interface for ticket purchases.",
      image: "assets/projects-images/atocultural.png",
      tags: ["Angular 17", "Google Maps API", "Payment Checkout", "Tailwind", "Angular Material", "Sass", "API RESTFul"],
      demoUrl: "https://cidadedacultura.com.br",
      githubUrl: "https://github.com/developer-thomas/ato-cultural-web",
      variant: "dashboard",
    },
    {
      title: "Gym Finder",
      description: "Find and filter SmartFit user data to locate gyms for training.",
      image: "assets/projects-images/smartfit.png",
      tags: ["Angular 17", "Bootstrap", "Sass", "Leaflet"],
      demoUrl: "https://smartfit-finder.netlify.app/",
      githubUrl: "https://github.com/developer-thomas/smartfit-finder",
      variant: "dashboard",
    },
    {
      title: "Usina Website",
      description: "A website developed for Usina Enterprise to showcase the company's projects to clients.",
      image: "assets/projects-images/usina.png",
      demoUrl: "https://usina-rr.netlify.app/",
      tags: ["Angular 16", "Bootstrap", "Sass", "Leaflet"],
      githubUrl: "https://github.com/developer-thomas/usina-website",
      variant: "dashboard",
    },
    {
      title: "Compra de passagens aéreas",
      description: "AR-enabled portfolio website with interactive 3D elements.",
      image: "assets/projects-images/mobair.png",
      tags: ["Angular 16", "API RESTFul", "Angular Material", "Tailwind", "Sweetalert2" ],
      demoUrl: "https://mobair.com.br",
      githubUrl: "https://github.com/developer-thomas/airbus-ticket-system",
      variant: "dashboard",
    },
    {
      title: "Ecommerce Management",
      description: "Interactive city guide with cyberpunk aesthetics and location-based features.",
      image: "assets/projects-images/ecommerce.png",
      tags: ["Angular 17", "Tailwind", "Angular Material", "Sass"],
      demoUrl: "https://usina-rr.netlify.app",
      githubUrl: "",
      variant: "dashboard",
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  goToGithub() {
    window.open('https://github.com/developer-thomas?tab=repositories', "_blank")
  }
}
