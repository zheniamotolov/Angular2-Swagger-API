import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './home-page/home-page.module';
import { FavoritesPageModule } from './favorites-page/favorites-page.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@NgModule({
  declarations: [
      AppComponent,
      NavbarComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      FavoritesPageModule,
      HomePageModule,
      PageNotFoundModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
