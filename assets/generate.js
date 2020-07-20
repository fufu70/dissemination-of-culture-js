const random = require('./random');

/**
 * Runs function provided a number of times.
 * @param  {Number} num  The amount of times the function should be called.
 * @param  {Function} func The function to call.
 */
function runFuncNumTimes(num, func)
{
    for (var i = 0; i < num; i ++)
        func();
}

/**
 * A culture is 5 random integers in an array between 0 and 9.
 * @return {Array} An array of integers.
 */
function generateCulture()
{
    var culture = [];
    runFuncNumTimes(5, () => {
        culture.push(random.int(0, 9));
    });

    return culture;
}

/**
 * Creates a node with a maxMatch and a culture.
 * @return {Object} An object with culture and maxMatch.
 */
function generateNode(input) {
    return {
        culture: generateCulture(),
        maxMatch: random.int(
            input.min_match, 
            input.max_match)
    };
}

/**
 * Sets up a board with a host of nodes.
 * @return {Array} An array with a host of nodes in a HEIGHTxWIDTH array
 */
function generateNodeSet(input)
{
    var nodes = [];

    runFuncNumTimes(input.height, () => {
        var rowOfNodes = [];
        runFuncNumTimes(input.width, () => {
            rowOfNodes.push(generateNode(input));
        });
        nodes.push(rowOfNodes);
    });

    return nodes;
}

module.exports = generateNodeSet;