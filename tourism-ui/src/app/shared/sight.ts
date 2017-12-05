export class Sight {
    constructor(
        public id:          number,
        public name:        string,
        public city:        string,
        public description: string,
        public photo_url:   string,
        public popularity:  number,
        public isFavourite: boolean
    ) { }
}