import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-skill-bar',
  imports: [CommonModule],
  templateUrl: './skill-bar.component.html',
  styleUrl: './skill-bar.component.scss'
})
export class SkillBarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() name = ""
  @Input() percentage = 0
  @Input() color!: string;

  @ViewChild("barContainer") barContainer!: ElementRef

  width = 0
  isInView = false
  observer?: IntersectionObserver

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupIntersectionObserver()
  }

  setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isInView = true
          this.animateBar()
          this.observer?.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (this.barContainer.nativeElement) {
      this.observer.observe(this.barContainer.nativeElement)
    }
  }

  animateBar(): void {
    setTimeout(() => {
      this.width = this.percentage
    }, 100)
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
