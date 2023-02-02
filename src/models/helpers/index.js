const sprintf = (str, ...argv) => {
    return !argv.length ? str : sprintf(str = str.replace("%s", argv.shift()), ...argv);
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const deepFreezeObject = (obj) => {
    var propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach((name) => {
        var prop = obj[name];

        if (typeof prop == 'object' && prop !== null)
            deepFreezeObject(prop);
    });

    return Object.freeze(obj);
}

module.exports = {
    sprintf,
    capitalizeFirstLetter,
    deepFreezeObject,
}