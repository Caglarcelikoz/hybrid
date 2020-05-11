"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NameParser = (function () {
    function NameParser() {
    }
    NameParser.prototype.parse = function (blobInput) {
        var lines = blobInput.split(/\r?\n/);
        lines.forEach(function (line, idx) {
            var pieces = line.split("|");
            lines[idx] = {
                email: pieces[0],
                firstName: pieces[1],
                lastName: pieces[2]
            };
        });
        return lines;
    };
    return NameParser;
}());
NameParser.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NameParser.ctorParameters = function () { return []; };
exports.NameParser = NameParser;
//# sourceMappingURL=nameParser.service.js.map