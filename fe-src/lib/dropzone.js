"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDropzone = void 0;
const dropzone_1 = require("dropzone");
function InitDropzone(button) {
    return new dropzone_1.Dropzone(button, {
        url: "/falsa",
        autoProcessQueue: false,
    });
}
exports.InitDropzone = InitDropzone;
