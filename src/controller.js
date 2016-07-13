import Handlebars from 'handlebars';

export default class Controller {
    constructor(params) {
        this.params = params;
        this.view = params.view;
        this.container = params.container;

        if (params.events) {
            this.events = params.events;
        }

        if (params.model) {
            this.model = params.model;
            this.model.on('change', this.render.bind(this));
        }

        this.initialize();
    }

    bindEvents () {
        Object.keys(this.events).forEach((event) => {
            const eventName = event.split(' ')[0];
            const eventSelector = event.split(' ').slice(-1)[0];

            this.assingEvent(eventSelector, eventName, this.events[event])
        });
    }

    assingEvent (eventSelector, eventName, event) {
        [].forEach.call(document.querySelectorAll(`${this.container} ${eventSelector}`), (el) => {
            if (this.model) {
                event.prototype.model = this.model;
            }

            el.addEventListener(eventName, event, true);
        });
    }

    render () {
        const container = document.querySelector(this.container);
        const template = Handlebars.compile(this.view);
        const result = template({model: this.model.storage});

        if (container) {
            container.innerHTML = result;
        }

        if (this.events) {
            this.bindEvents();        
        }
    }

    initialize () {
        this.render();
    }
}