"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MusicAppComponent = void 0;
var core_1 = require("@angular/core");
var search_component_component_1 = require("../search-component/search-component.component");
var basic_album_component_component_1 = require("../basic-album-component/basic-album-component.component");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var icon_1 = require("@angular/material/icon");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var MusicAppComponent = /** @class */ (function () {
    function MusicAppComponent(albumsService) {
        this.albumsService = albumsService;
        this.SCROLL_THRESHOLD = 50; // Defined magic number as a constant
    }
    Object.defineProperty(MusicAppComponent.prototype, "albums$", {
        get: function () {
            return this.albumsService.albums$;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MusicAppComponent.prototype, "isLoading$", {
        get: function () {
            return this.albumsService.isLoading$;
        },
        enumerable: false,
        configurable: true
    });
    MusicAppComponent.prototype.onScroll = function (event) {
        console.log(event);
        var target = event.target;
        if (this.isScrolledToBottom(target)) {
            this.loadMoreAlbums();
        }
    };
    MusicAppComponent.prototype.loadMoreAlbums = function () {
        this.albumsService.incrementOffset();
        this.albumsService.loadMoreAlbums();
    };
    MusicAppComponent.prototype.isScrolledToBottom = function (element) {
        return element.scrollHeight - element.scrollTop - element.clientHeight < this.SCROLL_THRESHOLD;
    };
    MusicAppComponent = __decorate([
        core_1.Component({
            selector: 'app-music-app',
            standalone: true,
            imports: [
                progress_spinner_1.MatProgressSpinnerModule,
                search_component_component_1.SearchComponent,
                basic_album_component_component_1.BasicAlbumComponentComponent,
                forms_1.FormsModule,
                common_1.CommonModule,
                button_1.MatButtonModule,
                icon_1.MatIconModule
            ],
            templateUrl: './music-app.component.html',
            styleUrl: './music-app.component.scss'
        })
    ], MusicAppComponent);
    return MusicAppComponent;
}());
exports.MusicAppComponent = MusicAppComponent;
