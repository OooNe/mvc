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
            this.model.on('add', this.render.bind(this));
        }

        if (params.renderTarget) {
            this.renderTarget = params.renderTarget;
        }

        if (params.renderElements) {
            this.renderElements = params.renderElements;
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
        document
            .querySelector(`${this.container} ${eventSelector}`)
            .addEventListener(eventName, event.bind(this), false);
    }

    render () {
        const container = document.querySelector(this.container);

        if (container) {
            container.innerHTML = this.view;
        }

        if (this.renderTarget && this.renderElements) {
            container
                .querySelector(this.renderTarget)
                .appendChild(this.renderElements.call(this));
        }

        if (this.events) {
            this.bindEvents();        
        }
    }

    initialize () {
        this.render();
    }
}