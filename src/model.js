import events from 'events';

export default class Model extends events.EventEmitter {
    constructor () {
        super();

        this.storage = [];
    }

    add (object) {
        this.storage.push(object);
        this.emit('add');
    }

    getAll () {
        return this.storage;
    }
}