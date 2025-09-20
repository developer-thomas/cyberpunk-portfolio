import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

declare global {
  interface Window {
    va?: (event: "beforeSend" | "event" | "pageview", properties?: unknown) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
  constructor() {
    this.initializeAnalytics();
  }

  private initializeAnalytics(): void {
    // Verificar se estamos no ambiente de produção
    if (typeof window !== 'undefined' && window.va) {
      console.log('Vercel Analytics initialized');
    }
  }

  // Método para rastrear eventos customizados
  track(event: "beforeSend" | "event" | "pageview", properties?: unknown): void {
    if (typeof window !== 'undefined' && window.va) {
      window.va(event, properties);
    }
  }

  // Métodos específicos para eventos comuns
  trackPageView(page: string): void {
    this.track('pageview', { page });
  }

  trackButtonClick(buttonName: string, location?: string): void {
    this.track('event', { 
      name: 'button_click',
      properties: {
        button_name: buttonName, 
        location: location || 'unknown' 
      }
    });
  }

  trackFormSubmit(formName: string, success: boolean = true): void {
    this.track('event', { 
      name: 'form_submit',
      properties: {
        form_name: formName, 
        success 
      }
    });
  }

  trackProjectView(projectName: string, projectUrl?: string): void {
    this.track('event', { 
      name: 'project_view',
      properties: {
        project_name: projectName, 
        project_url: projectUrl 
      }
    });
  }

  trackContactAttempt(success: boolean = true): void {
    this.track('event', { 
      name: 'contact_attempt',
      properties: { success }
    });
  }

  trackLanguageChange(newLanguage: string): void {
    this.track('event', { 
      name: 'language_change',
      properties: { new_language: newLanguage }
    });
  }

  trackExternalLink(url: string, linkType: string): void {
    this.track('event', { 
      name: 'external_link',
      properties: {
        url, 
        link_type: linkType 
      }
    });
  }
}
