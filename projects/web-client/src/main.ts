import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { loadDemoDataToLocalStorage } from './dev/local-storage-demo-data';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
  loadDemoDataToLocalStorage();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
    .catch(err => console.error(err));
