import {main, wait} from '../widgets/widgets.js';

async function m() {
    let data = await main();
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