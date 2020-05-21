import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Location } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
 
const __stripTrailingSlash = (Location as any).stripTrailingSlash;

(Location as any).stripTrailingSlash = function _stripTrailingSlash(url: string): string {
  
  if (url.startsWith('servicios/') || url.startsWith('el-consejo/') || url.startsWith('ejercicio-profesional/') 
      || url.startsWith('herramientas/') || url.startsWith('agenda/') || url.startsWith('noticias/')
      || url.startsWith('/servicios/') || url.startsWith('/el-consejo/') || url.startsWith('/ejercicio-profesional/') 
      || url.startsWith('/herramientas/') || url.startsWith('/agenda/') || url.startsWith('/noticias/')) {
    url = url.replace(new RegExp('/', "g"), '%2F');
  }
  
  return url;

}