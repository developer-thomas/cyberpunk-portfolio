import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiBaseUrl = environment.apiBaseUrl;
  
  async sendEmail(data: any): Promise<void> {
    if (this.apiBaseUrl) {
      const response = await fetch(`${this.apiBaseUrl}/sendEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
    }
  }

  async sendAutoReply(toName: string, toEmail: string): Promise<void> {
    if (this.apiBaseUrl) {
      const response = await fetch(`${this.apiBaseUrl}/sendAutoReply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to_name: toName, to_email: toEmail })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
    }
  }
}
