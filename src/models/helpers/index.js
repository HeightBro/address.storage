const sprintf = (str, ...argv) => {
    return !argv.length ? str : sprintf(str = str.replace("%s", argv.shift()), ...argv);
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
    sprintf,
    capitalizeFirstLetter,
}