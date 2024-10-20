"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BasicAlbumComponentComponent = void 0;
var core_1 = require("@angular/core");
var card_1 = require("@angular/material/card");
var BasicAlbumComponentComponent = /** @class */ (function () {
    function BasicAlbumComponentComponent(router) {
        this.router = router;
    }
    BasicAlbumComponentComponent.prototype.navigateToDetails = function (album) {
        this.router.navigate(['/album', album.id], {
            state: { album: album }
        });
    };
    __decorate([
        core_1.Input()
    ], BasicAlbumComponentComponent.prototype, "album");
    BasicAlbumComponentComponent = __decorate([
        core_1.Component({
            selector: 'app-basic-album-component',
            standalone: true,
            imports: [card_1.MatCardModule],
            templateUrl: './basic-album-component.component.html',
            styleUrl: './basic-album-component.component.scss'
        })
    ], BasicAlbumComponentComponent);
    return BasicAlbumComponentComponent;
}());
exports.BasicAlbumComponentComponent = BasicAlbumComponentComponent;
