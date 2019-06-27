import Map from './mapModel';

export default class Game {
    constructor() {
        this.map = new Map(50, 70, 30);
    }
}