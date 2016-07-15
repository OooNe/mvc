import events from 'events';
import _ from 'underscore';

export default class Model extends events.EventEmitter {
    constructor () {
        super();
    }

    set (key, value) {
        this[key] = value;
        this.emit('change');
    }

    get(key) {
        return this[key];
    }
}