import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { GlitchTextComponent } from '../../shared/components/glitch-text/glitch-text.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-about-page',
  imports: [CommonModule, NgIcon, GlitchTextComponent, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutPageComponent {
  email = 'thomas.edson@mail.com'

}
