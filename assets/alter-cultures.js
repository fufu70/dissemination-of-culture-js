const random = require("./random");

/**
 * Alters the culture of nodes randomly from one node to one of its random neighbors.
 * @return {Array} altered culture
 */
function alterCulturesRandomly(nodes, input)
{
    var nodeHeight = random.int(0, input.height - 1);
    var nodeWidth = random.int(0, input.width - 1);
    var node = nodes[nodeHeight][nodeWidth];

    var neighborLocation = getRandomNeighborLocation(nodes, nodeHeight, nodeWidth, input);
    var neighbor = nodes[neighborLocation[0]][neighborLocation[1]];
    if (getNeighborMinMatch(node, neighbor) <= Math.min(neighbor.maxMatch, node.maxMatch))
    {
        nodes[neighborLocation[0]][neighborLocation[1]].culture = alterNeighbor(node.culture, neighbor.culture);
    }

    return nodes;
}

/**
 * Alters one index of the neighbor randomly.
 * @return {array} Returns altered neighbor.
 */
function alterNeighbor(culture, neighborCulture)
{
    var changeIndex = random.int(0, culture.length - 1);
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
function getRandomNeighborLocation(nodes, nodeHeight, nodeWidth, input)
{
    var locations = getAllNeighbors(nodes, nodeHeight, nodeWidth, input);
    return locations[random.int(0, locations.length - 1)];
}

/**
 * Gets all of the neighbors around a specific culture. The culture 
 * @return {array} An array of height and width locations around the culture.
 */
function getAllNeighbors(nodes, nodeHeight, nodeWidth, input)
{
    var locations = [];
    for (var i = -1; i < 2; i ++)
    {
        for (var j = -1; j < 2; j ++)
        {
            if (!(i + nodeHeight == nodeHeight && j + nodeWidth == nodeWidth))
            {
                locations.push([(nodeHeight + i + input.height) % input.height, (nodeWidth + j + input.width) % input.width]);
            }
        }
    }

    return locations;
}

module.exports = {
    randomly: alterCulturesRandomly
};