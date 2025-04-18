import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { GlitchTextComponent } from '../glitch-text/glitch-text.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, NgIcon, GlitchTextComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() currentYear: number = new Date().getFullYear()
}
