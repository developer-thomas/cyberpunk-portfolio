import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlitchTextComponent } from '../../shared/components/glitch-text/glitch-text.component';
import { NgIcon } from '@ng-icons/core';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';

@Component({
  selector: 'app-contact-page',
  imports: [CommonModule, NgIcon, GlitchTextComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactPageComponent {
  email: string = 'thomas.edson@mail.com';
}
