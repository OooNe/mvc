import events from 'events';
import _ from 'underscore';

export default class Model extends events.EventEmitter {
    constructor () {
        super();

        this.storage = [];
    }

    add (object) {
        this.storage.push(_.extend(object, { _id : _.uniqueId() }));
        this.emit('change');
    }

    getAll () {
        return this.storage;
    }

    remove (id) {
        this.storage = _.reject(this.storage, (item) => item._id === id);
        this.emit('change');
    }
}