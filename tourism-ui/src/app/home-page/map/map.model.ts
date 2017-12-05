import * as L from 'leaflet';

export class MapModel {
    constructor(
        public baseLayers: {
            id: string,
            name: string,
            enabled: boolean,
            layer: L.Layer
        }[],
        public baseLayer: string,
        public overlayLayers: {
            id: string,
            name: string,
            enabled: boolean,
            layer: L.Layer
        }[] = []
    ) { }
}
