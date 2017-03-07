import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
// if (process.env.ENV === 'production') {
//   enableProdMode();
// }
if(process.env.NODE_ENV === 'dev'){
  console.log(process.env.API_URL);
}
platformBrowserDynamic().bootstrapModule(AppModule);
