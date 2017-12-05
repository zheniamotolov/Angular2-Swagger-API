import { Component, OnInit } from '@angular/core';
import { FLAGS } from './mock-data';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
    private mymap: any = null;

    setFlagCircles() {
        for (let i = 0; i < FLAGS.length; ++i) {
            const circle = L.circle([FLAGS[i].location.lat, FLAGS[i].location.lng], {
                color: '#013ADF',
                fillColor: '#CECEF6',
                fillOpacity: 0.5,
                radius: FLAGS[i].popularity * 10
            }).addTo(this.mymap);
        }
    }

    setFlagMarkers() {
        for (let i = 0; i < FLAGS.length; ++i) {
            const icon = L.icon({
                iconSize: [ 30, 40 ],
                iconAnchor: [ 15, 40 ],
                iconUrl: '../../../assets/map-marker.png'
            });

            const marker = L.marker([FLAGS[i].location.lat, FLAGS[i].location.lng], { icon: icon })
                .addTo(this.mymap);

            marker.bindPopup(`
                <strong>` + FLAGS[i].name + `</strong>
                <br>
                <span>Popularity: ` + FLAGS[i].popularity + `</span>
                <br>
                <a href="#">More...</a>
            `);
        }
    }

    onZoomChange(map) {
        console.log(map);
    }

    bindOnZoomChange() {
        // this.mymap.on('zoomend', function () {
        //     console.log(this.mymap.getZoom());
        // });
    }

    createAndDrawMap() {
        this.mymap = L.map('mapid').setView([ 53.9, 27.6 ], 12);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            id: 'mapbox.streets',
            attribution: 'Open Street Map'
        }).addTo(this.mymap);

        this.setFlagCircles();
        this.setFlagMarkers();
    }

    constructor() { }

    ngOnInit() {
        this.createAndDrawMap();
        this.bindOnZoomChange();
    }
}
