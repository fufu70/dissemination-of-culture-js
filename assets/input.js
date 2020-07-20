const DEFAULT_HEIGHT = 5;
const DEFAULT_WIDTH = 5;
const DEFAULT_ITERATIONS = 100;
const DEFAULT_MIN_MATCH = 0;
const DEFAULT_MAX_MATCH = 10;

class Input {
    constructor() {
        this.height = 0;
        this.width = 0;
        this.iterations = 0;
        this.min_match = 0;
        this.max_match = 0;
    }

    processArguments(args) {
        this.height = Number(args[2] != undefined ? args[2] : DEFAULT_HEIGHT);
        this.width = Number(args[2] != undefined ? args[2] : DEFAULT_WIDTH);
        this.iterations = Number(args[3] != undefined ? args[3] : DEFAULT_ITERATIONS);
        this.min_match = Number(args[4] != undefined ? args[4] : DEFAULT_MIN_MATCH);
        this.max_match = Number(args[5] != undefined ? args[5] : DEFAULT_MAX_MATCH);
    }
}

module.exports = {
    forge: () => {
        let input = new Input();
        input.processArguments(process.argv);
        return input;
    }
};