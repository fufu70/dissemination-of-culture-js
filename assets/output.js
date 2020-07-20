module.exports = (nodeMatrix) => {
    var str = "";

    for (var i = 0; i < nodeMatrix.length; i ++)
    {
        var rowStr = [];
        for (var j = 0; j < nodeMatrix[i].length; j ++)
        {
            rowStr.push(" [" + 
                nodeMatrix[i][j].culture.join(" ") + 
                "] + " + nodeMatrix[i][j].maxMatch)
        }
        str += rowStr.join(',') + "\n";
    }

    console.log(str);
}