"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildInformation = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
exports.buildInformation = {
    version: "{{version}}",
    build: "{{build}}",
    date: "{{date}}",
    commit: "{{commit}}",
    dependencies: "{{dependencies}}",
    libraries: {
        serval: ts_serval_1.buildInformation
    }
};
//# sourceMappingURL=buildInformation.js.map