import {Map} from 'immutable';

/**
 *
 * @param {string} str
 * @param search
 * @param replacement
 * @return {string}
 */
export const strReplaceAll = (str, search, replacement) => {
    return str.split(search).join(replacement);
};

/**
 * Runtime Cache: strReplace, split, join etc. in that amount on every re-render could lead to performance problems
 * As each input results in the same output, an easy key-value cache is used
 *
 * @type {Map}
 */
let beautified = Map();

const textTransform = (name, tt) => {
    switch(tt) {
        case 'ol':
            if(typeof name === 'number') return (name + 1) + '.';
            break;
        case 'upper':
            if(typeof name === 'string') return name.toUpperCase();
            break;
        case 'lower':
            if(typeof name === 'string') return name.toLowerCase();
            break;
        case 'upper-beauty':
            if(typeof name === 'string') return beauty(name).toUpperCase();
            break;
        case 'lower-beauty':
            if(typeof name === 'string') return beauty(name).toLowerCase();
            break;
    }

    return name;
};

const beauty = (name) => {
    if(typeof name !== 'string') return name;

    let tmp = beautified.get(name);
    if(tmp) return tmp;

    let beauty = strReplaceAll(
        strReplaceAll(
            strReplaceAll(
                strReplaceAll(name, '__', ' '),
                '_', ' '),
            '.', ' '),
        '-', ' ')
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))// make first letter uppercase
        .join(' ');

    beautified = beautified.set(name, beauty);

    return beauty;
};

export const beautifyKey = (name, tt = true) => {
    // falsy values disables optimistic-beautify
    if(!tt) return name;

    if(typeof tt === 'string') return textTransform(name, tt);

    return beauty(name);
};
