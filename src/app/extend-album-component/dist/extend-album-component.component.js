"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExtendAlbumComponentComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var icon_1 = require("@angular/material/icon");
var ExtendAlbumComponentComponent = /** @class */ (function () {
    function ExtendAlbumComponentComponent(router) {
        this.router = router;
        // Method 1: Retrieve state data
        var navigation = this.router.getCurrentNavigation();
        if (navigation === null || navigation === void 0 ? void 0 : navigation.extras.state) {
            this.album = navigation.extras.state['album'];
        }
    }
    ExtendAlbumComponentComponent.prototype.navigateBack = function () {
        this.router.navigate(['/albums']);
    };
    ExtendAlbumComponentComponent = __decorate([
        core_1.Component({
            selector: 'app-extend-album-component',
            standalone: true,
            imports: [common_1.CommonModule, router_1.RouterModule, button_1.MatButtonModule, icon_1.MatIconModule],
            templateUrl: './extend-album-component.component.html',
            styleUrl: './extend-album-component.component.scss'
        })
    ], ExtendAlbumComponentComponent);
    return ExtendAlbumComponentComponent;
}());
exports.ExtendAlbumComponentComponent = ExtendAlbumComponentComponent;
