import { Component, Input, OnInit } from '@angular/core';
import { Sight } from '../../sight';

@Component({
  selector: 'app-sights-item',
  templateUrl: './sights-item.component.html',
  styleUrls: ['./sights-item.component.scss']
})
export class SightsItemComponent implements OnInit {

  @Input()
  sight: Sight;

  constructor() { }

  ngOnInit() {
  }

}
