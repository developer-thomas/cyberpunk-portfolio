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
      variant: "dashboard",
    },
    {
      title: "Digital Marketplace",
      description: "E-commerce platform for digital assets with crypto payment integration.",
      image: "assets/images/neon-tech-store.png",
      tags: ["Next.js", "Stripe", "MongoDB"],
      variant: "dashboard",
    },
    {
      title: "Neural Network",
      description: "Interactive visualization of neural networks with real-time data processing.",
      image: "assets/images/neon-synapse.png",
      tags: ["Three.js", "WebGL", "TypeScript"],
      variant: "dashboard",
    },
    {
      title: "Cyber Chat",
      description: "Real-time chat application with end-to-end encryption and futuristic UI.",
      image: "assets/images/neon-city-chat.png",
      tags: ["Firebase", "React", "Socket.io"],
      variant: "dashboard",
    },
    {
      title: "Augmented Portfolio",
      description: "AR-enabled portfolio website with interactive 3D elements.",
      image: "assets/images/neon-cityscape-ar.png",
      tags: ["AR.js", "Three.js", "GSAP"],
      variant: "dashboard",
    },
    {
      title: "Neon City Guide",
      description: "Interactive city guide with cyberpunk aesthetics and location-based features.",
      image: "assets/images/neon-grid-city.png",
      tags: ["Mapbox", "React", "Geolocation API"],
      variant: "dashboard",
    },
  ]

  constructor() {}

  ngOnInit(): void {}
}
