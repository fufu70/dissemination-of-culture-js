#!/usr/bin/env node
const HEIGHT = process.argv[2] != undefined ? process.argv[2] : 5;
const WIDTH = process.argv[2] != undefined ? process.argv[2] : 5;
const ITERATIONS = process.argv[3] != undefined ? process.argv[3] : 100;
const MAX_MATCH = process.argv[4] != undefined ? process.argv[4] : 6;

/**
 * Returns a random integer between min and max
 * @return {int}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
        culture.push(getRandomInt(0, 9));
    });

    return culture;
}

/**
 * Creates a node with a maxMatch and a culture.
 * @return {Object} An object with culture and maxMatch.
 */
function generateNode() {
    return {
        culture: generateCulture(),
        maxMatch: MAX_MATCH
    };
}

/**
 * Sets up a board with a host of nodes.
 * @return {Array} An array with a host of nodes in a HEIGHTxWIDTH array
 */
function generateNodeSet()
{
    var nodes = [];

    runFuncNumTimes(HEIGHT, () => {
        var rowOfNodes = [];
        runFuncNumTimes(WIDTH, () => {
            rowOfNodes.push(generateNode());
        });
        nodes.push(rowOfNodes);
    });

    return nodes;
}

/**
 * Alters the culture of nodes randomly from one node to one of its random neighbors.
 * @return {Array} altered culture
 */
function alterCulturesRandomly(nodes)
{
    var randomNodeHeight = getRandomInt(0, HEIGHT - 1);
    var randomNodeWidth = getRandomInt(0, WIDTH - 1);
    var randomNode = nodes[randomNodeHeight][randomNodeWidth];

    var randomNeighborLocation = getRandomNeighborLocation(nodes, randomNodeHeight, randomNodeWidth);
    var randomNeighbor = nodes[randomNeighborLocation[0]][randomNeighborLocation[1]];
    if (getNeighborMinMatch(randomNode, randomNeighbor) <= randomNode.maxMatch)
    {
        nodes[randomNeighborLocation[0]][randomNeighborLocation[1]].culture = alterNeighbor(randomNode.culture, randomNeighbor.culture);
    }

    return nodes;
}

/**
 * Alters one index of the neighbor randomly.
 * @return {array} Returns altered neighbor.
 */
function alterNeighbor(culture, neighborCulture)
{
    var changeIndex = getRandomInt(0, culture.length - 1);
    neighborCulture[changeIndex] = culture[changeIndex];

    return neighborCulture;
}

/**
 * TODO
 */
function getNeighborMinMatch(culture, neighborCulture)
{
    var lowestMatch = 9;
    for (var i = 0; i < culture.length; i ++)
    {
        if (Math.abs(culture[i] - neighborCulture[i]) < lowestMatch)
        {
            lowestMatch = Math.abs(culture[i] - neighborCulture[i]);
        }
    }

    return lowestMatch;
}

/**
 * Gets a random neighbor location from the provided culture
 * 
 * @return {array} Height and width of the neighbor respectively
 */
function getRandomNeighborLocation(nodes, nodeHeight, nodeWidth)
{
    var locations = getAllNeighbors(nodes, nodeHeight, nodeWidth);
    return locations[getRandomInt(0, locations.length - 1)];
}

/**
 * Gets all of the neighbors around a specific culture.
 * @return {array} An array of height and width locations around the culture.
 */
function getAllNeighbors(nodes, nodeHeight, nodeWidth)
{
    var locations = [];
    for (var i = -1; i < 2; i ++)
    {
        for (var j = -1; j < 2; j ++)
        {
            if (!(i + nodeHeight < 0 || j + nodeWidth < 0) &&
                !(i + nodeHeight == nodeHeight && j + nodeWidth == nodeWidth) &&
                !(i + nodeHeight >= HEIGHT || j + nodeWidth >= WIDTH))
            {
                locations.push([i + nodeHeight, j + nodeWidth]);   
            }
        }
    }

    return locations;
}

var c = generateNodeSet();
for (var iteration = 0; iteration < ITERATIONS; iteration ++)
{
    c = alterCulturesRandomly(c);
}

var str = "";

for (var i = 0; i < c.length; i ++)
{
    for (var j = 0; j < c[i].length; j ++)
    {
        str += ", [" + c[i][j].culture + "] "
    }
    str += "\n";
}

console.log(str);