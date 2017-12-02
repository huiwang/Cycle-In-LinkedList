const state = {
    out: 0,
    in: 0,
    runner: 0,
    runnerSpeed: 2,
    walker: 0
};

function comment(state) {
    let comment = "状态\n";
    if(state.runner >= state.out) {
        comment += "\n兔子进环"
    }
    if(state.walker >= state.out) {
        comment += "\n乌龟进环"
    }
    if(state.runner > 0 && state.runner === state.walker) {
        comment += "\n龟兔相逢"
    }
    if(state.walker > state.out && state.runner <= state.out) {
        comment += "\n兔子从头开始"
    }
    return comment;
}

function next(state) {
    if (hasMet(state.runner, state.walker)) {
        state.runner = 0;
        state.runnerSpeed = 1;
    } else {
        if (state.runner > state.out) {
            state.runner = (state.runner + state.runnerSpeed - state.out) % state.in + state.out;
        } else {
            state.runner += state.runnerSpeed;
        }

        if (state.walker > state.out) {
            state.walker = (state.walker + 1 - state.out) % state.in + state.out;

        } else {

            state.walker += 1;

        }
    }
    return state;
}

function hasMet(walker, runner) {
    return walker !== 0 && walker === runner;
}

function entryPointFound(state) {
    return state.walker === state.out && state.runner === state.out
}


function draw(state) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });

    const layer = new Konva.Layer();

    const startX = 100;
    const startY = 200;

    let dist = 40;
    [...new Array(state.out).keys()].forEach(i => layer.add(createNode(startX + i * dist, startY, i + "")));

    let angle = 2 * Math.PI / state.in;
    const radius = 100;
    [...new Array(state.in).keys()].forEach(i =>
        layer.add(createNode(
            2 * state.out * dist + radius * Math.sin(i * angle - Math.PI / 2),
            startY + radius * Math.cos(i * angle + Math.PI / 2),
            i + state.out)));

    const walkerNode = layer.findOne("#node" + state.walker);

    const walker = new Konva.Arrow({
        x: walkerNode.attrs.x,
        y: walkerNode.attrs.y,
        points: [0, 0, 0, 20],
        pointerLength: 5,
        pointerWidth: 5,
        stroke: 'red'
    });

    const runnerNode = layer.findOne("#node" + state.runner);

    const runner = new Konva.Arrow({
        x: runnerNode.attrs.x + 20,
        y: runnerNode.attrs.y,
        points: [0, 0, 0, 20],
        pointerLength: 5,
        pointerWidth: 5,
        stroke: 'blue'
    });

    const text = new Konva.Text({
        x: 20,
        y: 50,
        text: comment(state),
        fontFamily: 'Calibri',
        fontSize: 15,
        fill: 'black'
    });

    layer.add(text);
    layer.add(walker);
    layer.add(runner);
    stage.add(layer);
    stage.scale(0.1, 0.1);

}

function createNode(x, y, val) {
    const group = new Konva.Group({
        x: 0,
        y: 0
    });

    const text = new Konva.Text({
        x: x + 5,
        y: y + 3,
        text: val,
        fill: "black"
    });

    const rect = new Konva.Rect({
        x: x,
        y: y,
        id: "node" + val,
        fill: "green",
        width: 20,
        height: 20,
        opacity: 0.5
    });

    group.add(text);
    group.add(rect);
    return group;
}
export {state, next, draw, entryPointFound}