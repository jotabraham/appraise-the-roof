import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { StatsComponent } from './stats/stats.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BrowseComponent } from './browse/browse.component';
import { StandardGameComponent } from './standard-game/standard-game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HouseCardComponent } from './house-card/house-card.component';
import { SearchComponent } from './search/search.component';
import { GameHouseCardComponent } from './game-house-card/game-house-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    StatsComponent,
    FavoritesComponent,
    BrowseComponent,
    StandardGameComponent,
    PageNotFoundComponent,
    HouseCardComponent,
    SearchComponent,
    GameHouseCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
