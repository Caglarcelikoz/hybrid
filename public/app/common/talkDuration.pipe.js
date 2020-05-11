"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var talkDurationPipe = (function () {
    function talkDurationPipe() {
    }
    talkDurationPipe.prototype.transform = function (duration) {
        return "Duration: " + duration + " minutes";
    };
    return talkDurationPipe;
}());
talkDurationPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: "talkDuration" },] },
];
/** @nocollapse */
talkDurationPipe.ctorParameters = function () { return []; };
exports.talkDurationPipe = talkDurationPipe;
//# sourceMappingURL=talkDuration.pipe.js.map