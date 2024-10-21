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
var basic_album_component_component_1 = require("../basic-album-component/basic-album-component.component");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var icon_1 = require("@angular/material/icon");
var rxjs_1 = require("rxjs");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var MusicAppComponent = /** @class */ (function () {
    function MusicAppComponent(authToken, spotifyService, albumsService) {
        this.authToken = authToken;
        this.spotifyService = spotifyService;
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
    MusicAppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spotifyService.getAccessToken().subscribe(function (data) {
            _this.authToken.setToken(data.access_token);
        });
    };
    MusicAppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        rxjs_1.fromEvent(this.ResultsContainer.nativeElement, 'scroll').pipe(rxjs_1.debounceTime(1000)).subscribe(function () {
            var target = _this.ResultsContainer.nativeElement;
            if (_this.isScrolledToBottom(target)) {
                _this.loadMoreAlbums();
            }
        });
    };
    MusicAppComponent.prototype.loadMoreAlbums = function () {
        if (!this.albumsService.isBottom) {
            this.albumsService.incrementOffset();
            this.albumsService.loadMoreAlbums();
        }
    };
    MusicAppComponent.prototype.isScrolledToBottom = function (element) {
        return element.scrollHeight - element.scrollTop - element.clientHeight < this.SCROLL_THRESHOLD;
    };
    __decorate([
        core_1.ViewChild('ResultsContainer')
    ], MusicAppComponent.prototype, "ResultsContainer");
    MusicAppComponent = __decorate([
        core_1.Component({
            selector: 'app-music-app',
            standalone: true,
            imports: [
                progress_spinner_1.MatProgressSpinnerModule,
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
