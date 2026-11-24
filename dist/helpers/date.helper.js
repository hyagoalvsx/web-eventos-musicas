"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormat = void 0;
const dateFormat = (value, options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
}, locale = 'pt-BR', withTime = false) => {
    if (value === null || value === undefined)
        return '';
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime()))
        return '';
    const resolvedOptions = withTime
        ? { ...options, hour: '2-digit', minute: '2-digit' }
        : options;
    return date.toLocaleDateString(locale, resolvedOptions);
};
exports.dateFormat = dateFormat;
