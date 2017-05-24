export default function buildRegExpByMask(mask) {

    mask = mask
        .replace(/0/g, '\\d')
        .replace(/\./g, '\\.')
        .replace(/\$/g, '\\$')
        .replace(/\^/g, '\\^')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)');

    return new RegExp(mask, 'g');
}