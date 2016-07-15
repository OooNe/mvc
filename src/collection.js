import events from 'events';
import _ from 'underscore';

export default class Collection extends events.EventEmitter {
    constructor (params = {}) {
        super();

        this.storage = [];
        this.type = params.type || ''
    }

    add (object) {
        if (this.isThisCollectionType(object)) {
            this.storage.push(_.extend(object, { _id : _.uniqueId() }));
            this.emit('change');
        }
    }

    getAll () {
        return this.storage;
    }

    remove (id) {
        this.storage = _.reject(this.storage, (item) => item._id === id);
        this.emit('change');
    }

    isThisCollectionType(object) {
        return this.type === object.constructor.name 
    }
}