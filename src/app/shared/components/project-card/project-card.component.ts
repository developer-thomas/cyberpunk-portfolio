import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

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

  ngOnInit(): void {}

  onMouseEnter(): void {
    this.isHovered = true
  }

  onMouseLeave(): void {
    this.isHovered = false
  }
}
