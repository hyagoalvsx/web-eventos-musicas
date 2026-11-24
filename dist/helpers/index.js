"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHelpers = void 0;
const date_helper_1 = require("./date.helper");
const currency_helper_1 = require("./currency.helper");
const helpers = {
    dateFormat: date_helper_1.dateFormat,
    currencyFormat: currency_helper_1.currencyFormat,
};
const registerHelpers = (app) => {
    Object.assign(app.locals, helpers);
};
exports.registerHelpers = registerHelpers;
