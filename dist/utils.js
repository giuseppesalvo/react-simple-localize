"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUndefined = function (x) { return typeof x === "undefined"; };
exports.isNull = function (x) { return x === null; };
exports.isInvalid = function (x) { return exports.isNull(x) || exports.isUndefined(x); };
exports.hasProperty = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
function resolvePath(obj, path) {
    if (path === "") {
        return obj;
    }
    if (arguments.length !== 2) {
        throw new Error("resolvePath accepts only 2 arguments ( obj:{}|[], path:string )");
    }
    if (typeof path !== "string") {
        throw new Error("resolvePath: path argument should be a string");
    }
    if (exports.isInvalid(path) || exports.isInvalid(obj)) {
        return undefined;
    }
    var clean = path.replace(/\[/g, ".$").replace(/\]/g, "");
    return clean.split(".").reduce(function (sum, curr) {
        if (exports.isInvalid(sum) || exports.isInvalid(curr)) {
            return sum;
        }
        if (curr[0] === "$" && Array.isArray(sum)) {
            var index = parseInt(curr.substr(1));
            if (!exports.isInvalid(sum[index]))
                return sum[index];
            else
                return sum[curr];
        }
        else {
            return sum[curr];
        }
    }, obj);
}
exports.resolvePath = resolvePath;
//# sourceMappingURL=utils.js.map