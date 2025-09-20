import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { NgIcon } from '@ng-icons/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment.prod'

interface FormState {
  name: string
  email: string
  message: string
}

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, FormsModule, NgIcon, TranslatePipe, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  public fb = inject(FormBuilder);
  private readonly env = environment;
  
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

  ngOnInit(): void {}

  handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  
    this.isSubmitting = true;
  
    const { emailJsPublicKey, emailJsServiceId, emailJsTemplateId, emailJsAutoReplyTemplateId } = this.env;

    emailjs.send(
      emailJsServiceId,
      emailJsTemplateId,
      this.form.value,
      emailJsPublicKey 
    )
    .then(() => {
      // auto-reply para o usuário
      emailjs.send(
        emailJsServiceId,
        emailJsAutoReplyTemplateId,
        {
          to_name: this.form.value.name,
          to_email: this.form.value.email
        },
        emailJsPublicKey 
      )

      this.isSubmitting = false;
      this.isSubmitted = true; // sucesso
  
      // esconde mensagem de sucesso depois de 5s
      setTimeout(() => {
        this.isSubmitted = false;
      }, 5000);
  
      this.form.reset();
    })
    .catch((err) => {
      console.error('Erro ao enviar e-mail:', err);
      this.isSubmitting = false;
      alert('Erro ao enviar. Tente novamente.');
    });
  }
}
