import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { inject } from '@vercel/analytics';
import { enableProdMode, isDevMode } from '@angular/core';
 
if (!isDevMode()) {
  enableProdMode();
}

// Inject analytics script before bootstrapping app
inject({ mode: isDevMode() ? 'development' : 'production' });


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
