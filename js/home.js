const tabs = document.getElementsByClassName('tab');

function grow(element, i, max) {
    if (i < max) {
        console.log("Growing", i);
        setTimeout(() => {
            element.style.transform = `scale(${i})`;
            grow(element, i + 0.05, max);
        }, 10)
    } else {
        element.style.transform = `scale(${i})`;
        return;
    }
}

function shrink(element, i, min) {
    if (i > min) {
        console.log("Shrinking", i);
        setTimeout(() => {
            element.style.transform = `scale(${i})`;
            shrink(element, i - 0.05, min);
        }, 10)
    } else {
        element.style.transform = `scale(${i})`;
        return;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < 6; i++) {
        let tab = tabs[i];
        if (tab == undefined) {
            console.log("Continue", i);
            continue;
        }
        tab.addEventListener("mouseenter", () => {
            tab.style.zIndex = '9';
            grow(tab, 1, 1.25);
        })
        tab.addEventListener("mouseleave", () => {
            tab.style.zIndex = '1';
            shrink(tab, 1.25, 1);
        })
    }
})