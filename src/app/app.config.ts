import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from "@angular/platform-browser/animations"
import { routes } from './app.routes';
import { NgIconsModule } from '@ng-icons/core';
import { lucideUser, lucideSearch } from '@ng-icons/lucide';
import { icons } from './app.icons'
export const appConfig: ApplicationConfig = {
  providers: [
    icons,
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      NgIconsModule.withIcons({
        lucideUser,
        lucideSearch
      })
    )
  ]
};