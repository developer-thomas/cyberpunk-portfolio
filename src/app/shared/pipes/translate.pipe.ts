import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: "translate",
  standalone: true,
  pure: false, // Make it impure so it updates when language changes
})
export class TranslatePipe implements PipeTransform, OnDestroy{
  private value = ""
  private lastKey = ""
  private subscription: Subscription

  constructor(private languageService: LanguageService) {
    // Subscribe to language changes
    this.subscription = this.languageService.currentLanguage$.subscribe(() => {
      if (this.lastKey) {
        // Update the value when language changes
        this.value = this.languageService.getTranslation(this.lastKey)
      }
    })
  }

  transform(key: string): string {
    this.lastKey = key
    this.value = this.languageService.getTranslation(key)
    return this.value
  }

  ngOnDestroy(): void {
    // Clean up subscription when pipe is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
