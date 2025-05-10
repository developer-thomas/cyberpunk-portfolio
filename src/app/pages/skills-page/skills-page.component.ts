import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { GlitchTextComponent } from '../../shared/components/glitch-text/glitch-text.component';
import { SkillBarComponent } from '../../shared/components/skill-bar/skill-bar.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-skills-page',
  imports: [CommonModule, NgIcon, GlitchTextComponent, SkillBarComponent, TranslatePipe],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss'
})
export class SkillsPageComponent {
  skills = [
    { name: "Angular / Angular Material", percentage: 95, color: "cyan" },
    { name: "JavaScript / TypeScript", percentage: 90, color: "pink" },
    { name: "SCSS / Tailwind / Bootstrap", percentage: 95, color: "cyan" },
    { name: "Jest / Cypress", percentage: 80, color: "pink" },
    { name: "NestJS / Prisma", percentage: 75, color: "cyan" },
    { name: "Docker / Azure DevOps", percentage: 85, color: "pink" },
  ]

  // Tools data
  tools = [
    "Git",
    "Angular",
    "NestJS",
    "PostgreSQL",
    "Docker",
    "TailwindCSS",
    "Bootstrap",
    "Angular Material",
    "Jest",
    "Node.js",
    "Express",
    "Prisma",
  ]

  // Skill metrics
  skillMetrics = [
    { value: 95, label: "Front-end Development", color: "cyan" },
    { value: 75, label: "UI/UX Design", color: "pink" },
    { value: 80, label: "Back-end Development", color: "cyan" },
    { value: 90, label: "Problem Solving", color: "pink" },
  ]
}
