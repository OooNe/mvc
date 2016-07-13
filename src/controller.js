import Handlebars from 'handlebars';
import Model from './model';

export default class Controller {
    constructor(params) {
        this.params = params;
        this.view = params.view;
        this.container = params.container;
        this.events = params.events;
        this.models = params.model;

        this.initialize();
    }

    bindModels() {
        Object.keys(this.models || []).forEach((model) => {
            if (this.models[model] instanceof Model) {
                this.models[model].on('change', this.render.bind(this));
            }
        });
    }

    bindEvents () {
        Object.keys(this.events || []).forEach((event) => {
            const eventName = event.split(' ')[0];
            const eventSelector = event.split(' ').slice(-1)[0];

            this.assingEvent(eventSelector, eventName, this.events[event])
        });
    }

    assingEvent (eventSelector, eventName, event) {
        [].forEach.call(document.querySelectorAll(`${this.container} ${eventSelector}`), (el) => {
            const self = this;

            el.addEventListener(eventName, function (e) {
                event(e, this, self)
            }, true);
        });
    }

    render () {
        const container = document.querySelector(this.container);
        const template = Handlebars.compile(this.view);
        const result = template(this.models);

        if (container) {
            container.innerHTML = result;
        }

        if (this.events) {
            this.bindEvents();        
        }
    }

    initialize () {
        this.render();
        this.bindModels();
    }
}