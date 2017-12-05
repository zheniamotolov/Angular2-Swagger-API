import { NgModule            } from '@angular/core';
import { CommonModule        } from '@angular/common';
import { HomePageComponent   } from './home-page.component';
import { MapComponent        } from './map/map.component';

import { FormsModule         } from '@angular/forms';
import { LeafletModule       } from '@asymmetrik/angular2-leaflet';
import { SightsListComponent } from './sights-list/sights-list.component';
import { SightsItemComponent } from '../shared/components/sights-item/sights-item.component';

import { HttpModule          } from '@angular/http';
import { SightService        } from '../shared/services/shared/services/api/sight.service';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      LeafletModule,
      HttpModule
  ],
  declarations: [
      HomePageComponent,
      MapComponent,
      SightsListComponent,
      SightsItemComponent
  ],
  providers: [ SightService ]
})
export class HomePageModule { }
