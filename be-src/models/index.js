"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = exports.User = void 0;
const pet_1 = require("./pet");
Object.defineProperty(exports, "Pet", { enumerable: true, get: function () { return pet_1.Pet; } });
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
user_1.User.hasMany(pet_1.Pet);
pet_1.Pet.belongsTo(user_1.User);
