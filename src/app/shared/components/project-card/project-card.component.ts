import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule, NgIcon],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent implements OnInit {
  @Input() title = ""
  @Input() description = ""
  @Input() image = ""
  @Input() tags: string[] = []
  @Input() githubUrl!: string;
  @Input() demoUrl!: string;
  @Input() variant!: string;

  isHovered = false
  private analyticsService = inject(AnalyticsService)

  ngOnInit(): void {}

  onMouseEnter(): void {
    this.isHovered = true
  }

  onMouseLeave(): void {
    this.isHovered = false
  }

  onProjectClick(): void {
    this.analyticsService.trackProjectView(this.title, this.demoUrl);
  }

  onGithubClick(): void {
    this.analyticsService.trackExternalLink(this.githubUrl, 'github');
  }

  onDemoClick(): void {
    this.analyticsService.trackExternalLink(this.demoUrl, 'demo');
  }
}
