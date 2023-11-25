import {Routes} from "@angular/router";

export const routes:Routes = [
  {
    path: '',
    loadComponent: () => import('../leyout/leyout.component').then(m => m.LeyoutComponent),
    title: 'MusiKar',
    children: []
  },
  {
    path: '**',
    loadComponent: () => import('../componets/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page Not Found'
  }
]
