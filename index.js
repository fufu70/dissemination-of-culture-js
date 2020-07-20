const input = require("./assets/input");
const output = require("./assets/output");
const generate = require("./assets/generate");
const random = require("./assets/random");
const alterCultures = require("./assets/alter-cultures");

var c = generate(input.forge());
for (var iteration = 0; iteration < input.forge().iterations; iteration ++)
{
    c = alterCultures.randomly(c, input.forge());
}

output(c);