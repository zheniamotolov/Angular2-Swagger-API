import { Component, OnInit } from '@angular/core';
import { Sight             } from '../../shared/sight';
import { SIGHTS            } from '../../shared/data';
import { SightService      } from '../../shared/services/shared/services/api/sight.service';
import { MediaSight } from "../../shared/services/shared/services/model/mediaSight";

@Component({
  selector: 'app-sights-list',
  templateUrl: './sights-list.component.html',
  styleUrls: ['./sights-list.component.scss']
})
export class SightsListComponent implements OnInit {
  sights: MediaSight[] = [];

  constructor(private _sightService: SightService) {

  }

  ngOnInit() {
      this._sightService.getMediaSights()
          .subscribe(
              data => {
                  this.sights = data;
                  console.log(data);
              },
              error => {
                  console.log(error);
              }
          );
  }

}
