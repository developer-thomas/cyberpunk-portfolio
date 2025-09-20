import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { NgIcon } from '@ng-icons/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, FormsModule, NgIcon, TranslatePipe, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  public fb = inject(FormBuilder);
  private emailService = inject(EmailService);
  
  @Input() variant: "default" | "dashboard" = "default"
  
  form!: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    })
  }

  isSubmitting = false
  isSubmitted = false

  async handleSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const { name, email } = this.form.value;

    this.isSubmitting = true;

    try {
      await this.emailService.sendEmail(this.form.value);

      await this.emailService.sendAutoReply(name, email);

      this.isSubmitted = true;
      setTimeout(() => (this.isSubmitted = false), 5000);
      this.form.reset();
    } catch (err) {
      console.error('Erro ao enviar e-mail:', err);
      
    } finally {
      this.isSubmitting = false;
    }
  }
}
