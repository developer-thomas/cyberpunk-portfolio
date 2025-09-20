import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Language, LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-language-selector',
  imports: [CommonModule, NgIcon, TranslatePipe],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent implements OnInit, OnDestroy{
  isOpen = false
  currentLanguage: Language = "en"
  private subscription: Subscription | null = null

  languages: { code: Language; name: string; image: string }[] = [
    { code: "en", name: "lang.en", image: 'assets/usa-flag.png' },
    { code: "pt", name: "lang.pt", image: 'assets/br-flag.png' },
    { code: "es", name: "lang.es", image: 'assets/es-flag.png' },
  ]

  constructor(
    private languageService: LanguageService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  toggleDropdown(e: any): void {
    this.isOpen = !this.isOpen
  }

  closeDropdown(): void {
    this.isOpen = false
  }

  setLanguage(lang: Language): void {
    this.languageService.setLanguage(lang)
    this.analyticsService.trackLanguageChange(lang)
    this.closeDropdown()
  }

  getLanguageFlag(code: Language): string {
    switch (code) {
      case "en":
        return "assets/usa-flag.png"
      case "pt":
        return "assets/br-flag.png"
      case "es":
        return "assets/es-flag.png"
      default:
        return "🌐"
    }
  }

  // Close dropdown when clicking outside
  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement
    const dropdown = document.querySelector(".language-selector-dropdown")
    const button = document.querySelector(".language-selector-button")

    if (dropdown && button) {
      if (!dropdown.contains(target) && !button.contains(target)) {
        this.closeDropdown()
      }
    }
  }
}
