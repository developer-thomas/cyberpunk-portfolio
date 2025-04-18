import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { GlitchTextComponent } from '../../shared/components/glitch-text/glitch-text.component';
import { SkillBarComponent } from '../../shared/components/skill-bar/skill-bar.component';

@Component({
  selector: 'app-skills-page',
  imports: [CommonModule, NgIcon, GlitchTextComponent, SkillBarComponent],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss'
})
export class SkillsPageComponent {
  skills = [
    { name: "React / Next.js", percentage: 95, color: "cyan" },
    { name: "JavaScript / TypeScript", percentage: 90, color: "pink" },
    { name: "HTML / CSS / Tailwind", percentage: 95, color: "cyan" },
    { name: "Three.js / WebGL", percentage: 80, color: "pink" },
    { name: "Node.js / Express", percentage: 75, color: "cyan" },
    { name: "UI/UX Design", percentage: 85, color: "pink" },
  ]

  // Tools data
  tools = [
    "Git",
    "Figma",
    "VS Code",
    "AWS",
    "Vercel",
    "Firebase",
    "Docker",
    "GraphQL",
    "Jest",
    "Storybook",
    "Webpack",
    "GitHub Actions",
  ]

  // Skill metrics
  skillMetrics = [
    { value: 95, label: "Front-end Development", color: "cyan" },
    { value: 85, label: "UI/UX Design", color: "pink" },
    { value: 80, label: "Back-end Development", color: "cyan" },
    { value: 90, label: "Problem Solving", color: "pink" },
  ]
}
