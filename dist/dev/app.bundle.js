webpackJsonp([3],{

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(77);
var static_1 = __webpack_require__(53);
var app_module_1 = __webpack_require__(221);
var nameParser_service_1 = __webpack_require__(83);
var unreviewedTalk_component_1 = __webpack_require__(225);
platform_browser_dynamic_1.platformBrowserDynamic()
    .bootstrapModule(app_module_1.AppModule)
    .then(function (platformRef) {
    //downgrades
    angular
        .module("app")
        .factory("nameParser", static_1.downgradeInjectable(nameParser_service_1.NameParser))
        .directive('unreviewedTalk', static_1.downgradeComponent({
        component: unreviewedTalk_component_1.unreviewedTalkComponent
    }));
    var upgrade = platformRef.injector.get(static_1.UpgradeModule);
    upgrade.bootstrap(document.documentElement, ["app"]);
    console.log("hybrid app bootstrapped");
});


/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var static_1 = __webpack_require__(53);
var platform_browser_1 = __webpack_require__(13);
var forms_1 = __webpack_require__(82);
var http_1 = __webpack_require__(78);
var app_component_1 = __webpack_require__(222);
var nameParser_service_1 = __webpack_require__(83);
var unreviewedTalk_component_1 = __webpack_require__(225);
var talkDuration_pipe_1 = __webpack_require__(227);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            static_1.UpgradeModule
        ],
        declarations: [
            app_component_1.AppComponent,
            unreviewedTalk_component_1.unreviewedTalkComponent,
            talkDuration_pipe_1.talkDurationPipe
        ],
        providers: [
            nameParser_service_1.NameParser
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        entryComponents: [
            unreviewedTalk_component_1.unreviewedTalkComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <div class=\"ng-view\"></div>\n  "
    })
], AppComponent);
exports.AppComponent = AppComponent;


/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], unreviewedTalkComponent.prototype, "session", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], unreviewedTalkComponent.prototype, "voteYes", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], unreviewedTalkComponent.prototype, "voteNo", void 0);
unreviewedTalkComponent = __decorate([
    core_1.Component({
        selector: 'unreviewed-talk',
        template: __webpack_require__(226)
    })
], unreviewedTalkComponent);
exports.unreviewedTalkComponent = unreviewedTalkComponent;


/***/ }),

/***/ 226:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!!session\">\n  <div  class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      {{session.title}}\n    </div>\n    <div class=\"panel-body\">\n      <p><strong>{{session.length | talkDuration}}</strong></p>\n      <p>{{session.abstract}}</p>\n    </div>\n  </div>\n\n  <span>Are you interested in this session?</span>\n  <button class=\"btn btn-primary btn-xs\" (click)=\"yes()\">Yes</button>\n  <button class=\"btn btn-warning btn-xs\" (click)=\"no()\">No</button>\n</div>\n<div *ngIf=\"!session\" class=\"alert alert-success\" role=\"alert\"> \n  You have reviewed all the submitted sessions\n</div>";

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
var talkDurationPipe = (function () {
    function talkDurationPipe() {
    }
    talkDurationPipe.prototype.transform = function (duration) {
        return "Duration: " + duration + " minutes";
    };
    return talkDurationPipe;
}());
talkDurationPipe = __decorate([
    core_1.Pipe({ name: "talkDuration" })
], talkDurationPipe);
exports.talkDurationPipe = talkDurationPipe;


/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(3);
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
NameParser = __decorate([
    core_1.Injectable()
], NameParser);
exports.NameParser = NameParser;


/***/ })

},[220]);
//# sourceMappingURL=app.bundle.js.map