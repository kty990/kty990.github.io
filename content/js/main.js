import {main, wait} from '../widgets/widgets.js';

function m() {
    let {calendar,elements} = main();
    console.log(elements);
    for (let e of elements) {
        if (!e.activated) {
            e.activate();
        }
    }
}

export {m};