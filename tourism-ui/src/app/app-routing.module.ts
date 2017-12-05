import { NgModule               } from '@angular/core';
import { RouterModule, Routes   } from '@angular/router';

import { PageNotFoundComponent  } from './page-not-found/page-not-found.component';
import { HomePageComponent      } from './home-page/home-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';

const APP_ROUTES: Routes = [
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'favorites',
        component: FavoritesPageComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
