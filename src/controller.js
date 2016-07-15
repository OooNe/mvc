import Handlebars from 'handlebars';
import Collection from './collection';
import Model from './model';

export default class Controller {
    constructor(params = {}) {
        this.view = params.view || '';
        this.container = params.container || 'body';
        this.events = params.events || {};
        this.collections = params.collections || {};
        this.models = params.models || {};
        this.helpers = params.helpers || {};
        this.data = params.data || {};

        this.initialize();
    }

    initialize () {
        this.render();
        this.bindCollections();
        this.bindModels();
        this.bindHelpers();
    }

    render () {
        this.getViewAjax().then((view) => {
            const container = document.querySelector(this.container);
            const template = Handlebars.compile(view)(this.data);

            container.innerHTML = template;

            this.bindEvents();
        });
    }

    bindModels() {
        Object.keys(this.models).forEach((model) => {
            if (this.models[model] instanceof Model) {
                this.models[model].on('change', this.render.bind(this));
            }
        });
    }

    bindCollections() {
        Object.keys(this.collections).forEach((collection) => {
            if (this.collections[collection] instanceof Collection) {
                this.collections[collection].on('change', this.render.bind(this));
            }
        });
    }

    bindEvents () {
        Object.keys(this.events).forEach((event) => {
            const eventName = event.split(' ')[0];
            const eventSelector = event.split(' ').slice(-1)[0];

            this.assingEvent(eventSelector, eventName, this.events[event])
        });
    }

    bindHelpers () {
        Object.keys(this.helpers).forEach((helper) => {
            Handlebars.registerHelper(helper, this.helpers[helper]);
        });
    }

    assingEvent (eventSelector, eventName, event) {
        [].forEach.call(document.querySelectorAll(`${this.container} ${eventSelector}`), (el) => {
            const controller = this;

            el.addEventListener(eventName, function (e) {
                event(e, this, controller)
            }, true);
        });
    }

    getViewAjax() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(request.responseText); 
                }
            };

            request.open('GET', this.view, true);
            request.send();
        });
    }
}