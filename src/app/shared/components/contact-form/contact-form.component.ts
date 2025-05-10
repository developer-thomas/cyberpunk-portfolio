import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { NgIcon } from '@ng-icons/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface FormState {
  name: string
  email: string
  message: string
}

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, FormsModule, NgIcon, TranslatePipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  @Input() variant: "default" | "dashboard" = "default"

  formState: FormState = {
    name: "",
    email: "",
    message: "",
  }

  isSubmitting = false
  isSubmitted = false

  ngOnInit(): void {}

  handleSubmit(): void {
    this.isSubmitting = true

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting = false
      this.isSubmitted = true
      this.formState = {
        name: "",
        email: "",
        message: "",
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        this.isSubmitted = false
      }, 5000)
    }, 1500)
  }
}
