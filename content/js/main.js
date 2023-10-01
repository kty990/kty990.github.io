import {main, wait} from '../widgets/widgets.js';

function m() {
    let {calendar,elements} = main();
    for (let e of elements) {
        if (!e.activated) {
            e.activate();
        }
    }
}

export {m};