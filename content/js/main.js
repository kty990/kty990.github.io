import {main, wait} from '../widgets/widgets.js';

function m() {
    let data = main();
    let elements = data.elements;
    let calendar = data.calendar;
    console.log(elements);
    for (let e of elements) {
        if (!e.activated) {
            e.activate();
        }
    }
}

export {m};