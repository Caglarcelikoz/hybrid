"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var unreviewedTalkComponent = (function () {
    function unreviewedTalkComponent() {
        this.voteYes = new core_1.EventEmitter();
        this.voteNo = new core_1.EventEmitter();
    }
    unreviewedTalkComponent.prototype.yes = function () {
        this.voteYes.emit(null);
    };
    unreviewedTalkComponent.prototype.no = function () {
        this.voteNo.emit(null);
    };
    return unreviewedTalkComponent;
}());
unreviewedTalkComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'unreviewed-talk',
                templateUrl: "./unreviewedTalk.component.html"
            },] },
];
/** @nocollapse */
unreviewedTalkComponent.ctorParameters = function () { return []; };
unreviewedTalkComponent.propDecorators = {
    'session': [{ type: core_1.Input },],
    'voteYes': [{ type: core_1.Output },],
    'voteNo': [{ type: core_1.Output },],
};
exports.unreviewedTalkComponent = unreviewedTalkComponent;
//# sourceMappingURL=unreviewedTalk.component.js.map