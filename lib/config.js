var config = {};

config.prod = {
    port:8080,
}

config.staging = {
    port:3000,
}

var selectedType = (typeof process.env.SER_TYPE == 'string')?process.env.SER_TYPE:"staging";
module.exports = (typeof config[selectedType] != 'undefined')? config[selectedType]:config.staging;
