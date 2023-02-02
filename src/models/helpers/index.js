const sprintf = (str, ...argv) => {
    return !argv.length ? str : sprintf(str = str.replace("%s", argv.shift()), ...argv);
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const isEmptyObject = (obj) => {
    for (let key in obj) {
        return false;
    }

    return true;
};

// const commandToProcessName = (command) => {
//     return command.split('_').map(v => capitalizeFirstLetter(v)).join('');
// };

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
    isEmptyObject,
    // commandToProcessName,
    deepFreezeObject,
}