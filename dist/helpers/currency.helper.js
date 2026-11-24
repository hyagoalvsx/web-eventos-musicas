"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyFormat = void 0;
const currencyFormat = (value, locale = 'pt-BR', currency = 'BRL') => {
    if (value === null || value === undefined)
        return '';
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
};
exports.currencyFormat = currencyFormat;
