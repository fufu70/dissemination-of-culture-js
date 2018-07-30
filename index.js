#!/usr/bin/env node
const HEIGHT = process.argv[2] != undefined ? process.argv[2] : 5;
const WIDTH = process.argv[2] != undefined ? process.argv[2] : 5;
const ITERATIONS = process.argv[3] != undefined ? process.argv[3] : 100;
const MAX_MATCH = process.argv[4] != undefined ? process.argv[4] : 2;


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
 * Sets up a board with a host of cultures.
 * @return {Array} An array with a host of cultures in a HEIGHTxWIDTH array
 */
function generateCultureSet()
{
    var cultures = [];

    runFuncNumTimes(HEIGHT, () => {
        var rowOfCultures = [];
        runFuncNumTimes(WIDTH, () => {
            rowOfCultures.push(generateCulture());
        });
        cultures.push(rowOfCultures);
    });

    return cultures;
}

/**
 * Alters cultures randomly from one neighbor.
 * @return {Array} altered culture
 */
function alterCulturesRandomly(cultures)
{
    var randomCultureHeight = getRandomInt(0, HEIGHT - 1);
    var randomCultureWidth = getRandomInt(0, WIDTH - 1);
    var randomCulture = cultures[randomCultureHeight][randomCultureWidth];

    var randomNeighborLocation = getRandomNeighborLocation(cultures, randomCultureHeight, randomCultureWidth);
    var randomNeighbor = cultures[randomNeighborLocation[0]][randomNeighborLocation[1]];
    if (getNeighborMinMatch(randomCulture, randomNeighbor) <= MAX_MATCH)
    {
        cultures[randomNeighborLocation[0]][randomNeighborLocation[1]] = alterNeighbor(randomCulture, randomNeighbor);
    }

    return cultures;
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
function getRandomNeighborLocation(cultures, neighborHeight, neighborWidth)
{
    var locations = getAllNeighbors(cultures, neighborHeight, neighborWidth);
    return locations[getRandomInt(0, locations.length - 1)];
}

/**
 * Gets all of the neighbors around a specific culture.
 * @return {array} An array of height and width locations around the culture.
 */
function getAllNeighbors(cultures, cultureHeight, cultureWidth)
{
    var locations = [];
    for (var i = -1; i < 2; i ++)
    {
        for (var j = -1; j < 2; j ++)
        {
            if (!(i + cultureHeight < 0 || j + cultureWidth < 0) &&
                !(i + cultureHeight == cultureHeight && j + cultureWidth == cultureWidth) &&
                !(i + cultureHeight >= HEIGHT || j + cultureWidth >= WIDTH))
            {
                locations.push([i + cultureHeight, j + cultureWidth]);   
            }
        }
    }

    return locations;
}

var c = generateCultureSet();
for (var iteration = 0; iteration < ITERATIONS; iteration ++)
{
    c = alterCulturesRandomly(c);
}

console.log(c);