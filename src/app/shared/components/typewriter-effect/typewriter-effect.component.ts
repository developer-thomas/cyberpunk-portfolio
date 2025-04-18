import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';


interface Word {
  text: string
}

@Component({
  selector: 'app-typewriter-effect',
  imports: [CommonModule],
  templateUrl: './typewriter-effect.component.html',
  styleUrl: './typewriter-effect.component.scss'
})
export class TypewriterEffectComponent implements OnInit, OnDestroy {
  @Input() words: Word[] = []
  @Input() className = "text-2xl font-bold text-cyan-500"
  @Input() cursorClassName = "text-pink-500"

  currentWordIndex = 0
  currentText = ""
  isDeleting = false
  typingSpeed = 150
  timeout?: any

  ngOnInit(): void {
    this.type()
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  type(): void {
    if (!this.words.length) return

    const word = this.words[this.currentWordIndex].text

    // Set typing speed based on whether we're typing or deleting
    const speed = this.isDeleting ? 50 : 150
    this.typingSpeed = speed

    // If typing
    if (!this.isDeleting && this.currentText !== word) {
      this.currentText = word.substring(0, this.currentText.length + 1)
      this.timeout = setTimeout(() => this.type(), this.typingSpeed)
    }
    // If we've finished typing the current word
    else if (!this.isDeleting && this.currentText === word) {
      // Pause at the end of the word before deleting
      this.timeout = setTimeout(() => {
        this.isDeleting = true
        this.type()
      }, 1500)
    }
    // If deleting
    else if (this.isDeleting && this.currentText !== "") {
      this.currentText = word.substring(0, this.currentText.length - 1)
      this.timeout = setTimeout(() => this.type(), this.typingSpeed)
    }
    // If we've finished deleting the current word
    else if (this.isDeleting && this.currentText === "") {
      this.isDeleting = false
      // Move to the next word
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length
      this.timeout = setTimeout(() => this.type(), this.typingSpeed)
    }
  }
}
