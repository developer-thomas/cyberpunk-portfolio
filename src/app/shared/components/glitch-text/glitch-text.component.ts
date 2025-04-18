import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-glitch-text',
  imports: [CommonModule],
  templateUrl: './glitch-text.component.html',
  styleUrl: './glitch-text.component.scss'
})
export class GlitchTextComponent implements OnInit, OnDestroy {
  @Input() text = ""
  @Input() className = ""

  isHovering = false
  isAnimating = false
  displayText = ""
  timeoutRef?: any

  ngOnInit(): void {
    this.displayText = this.text
  }

  handleMouseEnter(): void {
    this.isHovering = true
    this.isAnimating = true
    this.glitchText()

    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef)
    }
  }

  handleMouseLeave(): void {
    this.isHovering = false

    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef)
    }

    this.timeoutRef = setTimeout(() => {
      this.isAnimating = false
      this.displayText = this.text
    }, 1000)
  }

  glitchText(): void {
    if (!this.isAnimating) {
      this.displayText = this.text
      return
    }

    this.displayText = this.text
      .split("")
      .map((char) => {
        if (char === " ") return " "
        const shouldGlitch = Math.random() > 0.7
        if (shouldGlitch) {
          return this.getRandomChar()
        }
        return char
      })
      .join("")

    setTimeout(() => {
      if (this.isAnimating) {
        this.glitchText()
      }
    }, 100)
  }

  getRandomChar(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/"
    return chars[Math.floor(Math.random() * chars.length)]
  }

  ngOnDestroy(): void {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef)
    }
  }
}
