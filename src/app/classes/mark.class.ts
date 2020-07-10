export class Mark {

    public lat: number;
    public lng: number;
    public title: string;
    public desc: string;

    constructor(lat: number, lng: number) {
        this.title = 'Title not available';
        this.desc = 'Description not available';
        this.lat = lat;
        this.lng = lng;
    }
}