"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const dotenv = require("dotenv");
dotenv.config();
const algoliasearch_1 = require("algoliasearch");
const client = (0, algoliasearch_1.default)('G5G9RMFS44', process.env.ALGOLIA_1);
const index = client.initIndex('dev_js');
exports.index = index;
