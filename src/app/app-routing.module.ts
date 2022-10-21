import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutRishiComponent } from './about-rishi/about-rishi.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectAssumptionsComponent } from './project-assumptions/project-assumptions.component';

const routes: Routes = [
  { path: 'aboutrishi', component: AboutRishiComponent },
  { path: 'projectassumptions', component: ProjectAssumptionsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
