"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const parseComment = (commentFromReq) => {
    if (!isString(commentFromReq)) {
        throw new Error('Comentario (comment) está vacío');
    }
    return commentFromReq;
};
const parseDate = (dateFromReq) => {
    if (!isString(dateFromReq) || !isDate(dateFromReq)) {
        throw new Error('Fecha (date) incorrecta o está vacía');
    }
    return dateFromReq;
};
const parseWeather = (weatherFromReq) => {
    if (!isString(weatherFromReq) || !isWeather(weatherFromReq)) {
        throw new Error('Clima (weather) incorrecto o vacío');
    }
    return weatherFromReq;
};
const parseVisibility = (visibilityFromReq) => {
    if (!isString(visibilityFromReq) || !isVisibility(visibilityFromReq)) {
        throw new Error('Visibilidad (visibility) incorrecto o vacío');
    }
    return visibilityFromReq;
};
const isString = (string) => {
    return typeof string === 'string';
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isWeather = (param) => {
    return Object.values(types_1.Weather).includes(param);
};
const isVisibility = (param) => {
    return Object.values(types_1.Visibility).includes(param);
};
const toNewDiaryEntry = (object) => {
    const newEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility)
    };
    return newEntry;
};
exports.default = toNewDiaryEntry;
