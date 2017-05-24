export default class Mask {
    constructor(pattern, options) {
        let defaultOptions = {
            translation: {
                '0': function (val) {
                    return val.replace(/[^0-9]+/g, '');
                },
                'A': function (val) {
                    return val.replace(/[^a-zA-Z]+/g, '');
                },
                'S': function (val) {
                    return val.replace(/[^a-zA-Z0-9]+/g, '');
                },
                '*': function (val) {
                    return val;
                }
            },
            invalidValues: [null, undefined, '']
        };

        let opt = options || {};
        this._options = {
            translation: Object.assign(defaultOptions.translation, opt.translation),
            invalidValues: Object.assign(defaultOptions.invalidValues, opt.invalidValues),
            pattern: pattern
        };

        this._handlers = [];

        for (let i = 0; i < pattern.length; i++) {
            let element = pattern[i];

            let result = this._options.translation[element] || element;
            this._handlers.push(result);
        }
    }

    mask(value) {
        let result = '';

        let val = String(value);

        if (val.length === 0) return;

        let maskSize = this._handlers.length;
        let maskResolved = 0;

        let valueSize = val.length;
        let valueResolved = 0;

        while (maskResolved < maskSize) {
            let hand = this._handlers[maskResolved];
            let char = val[valueResolved];

            if (char === undefined) {
                break;
            }

            if (char === hand) {
                result += char;
                maskResolved++;
                valueResolved++
                continue;
            }

            if (isString(hand)) {
                result += hand;
                maskResolved++;
                continue;
            }

            let parsed = hand(char);

            if (this._options.invalidValues.indexOf(parsed) < 0) {
                result += parsed;
                valueResolved++;
            }
            else {
                break;
            }

            maskResolved++;
        }

        return result;
    }
}

function isString(value){
    return typeof value === "string";
}