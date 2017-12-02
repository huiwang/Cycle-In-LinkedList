import {draw, next, entryPointFound} from "./cycle_in_linkedlist.js";

function init() {
    return  {
        out: 5,
        in: 12,
        walker: 0,
        runner: 0,
        runnerSpeed: 2
    };
}

let current = init();
draw(current);

const nextButton = document.getElementById('next');
nextButton.addEventListener('click', function () {
    if(entryPointFound(current)) {
        current = init();
        draw(current)
    } else {
        current = next(current);
        draw(current)
    }
});


const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    current = init();
    draw(current);
});
