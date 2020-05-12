"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var static_1 = require("@angular/upgrade/static");
var NavComponent = (function (_super) {
    __extends(NavComponent, _super);
    function NavComponent(elementRef, injector) {
        return _super.call(this, 'nav', elementRef, injector) || this;
    }
    return NavComponent;
}(static_1.UpgradeComponent));
NavComponent.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'app-nav'
            },] },
];
/** @nocollapse */
NavComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Injector, },
]; };
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map