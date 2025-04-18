import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { GlitchTextComponent } from '../glitch-text/glitch-text.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgIcon, GlitchTextComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() activeSection = "hero"
  @Input() scrollY = 0
  @Output() sectionChange = new EventEmitter<string>()

  isMenuOpen = false

  constructor() {}

  scrollToSection(id: string): void {
    this.sectionChange.emit(id)
    this.isMenuOpen = false
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }
}
