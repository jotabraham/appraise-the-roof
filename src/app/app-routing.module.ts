import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StandardGameComponent } from './standard-game/standard-game.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'standard-game', component: StandardGameComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
