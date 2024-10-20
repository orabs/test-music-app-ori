"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var common_1 = require("@angular/common");
var basic_album_component_component_1 = require("../basic-album-component/basic-album-component.component");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(spotifyService, albumsService, authToken) {
        this.spotifyService = spotifyService;
        this.albumsService = albumsService;
        this.authToken = authToken;
    }
    SearchComponent.prototype.onSearchKeyUp = function (event) {
        var searchQuery = event.target.value;
        this.albumsService.resetOffset();
        this.albumsService.searchQuery = searchQuery;
        this.albumsService.loadMoreAlbums();
    };
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spotifyService.getAccessToken().subscribe(function (data) {
            _this.authToken.setToken(data.access_token);
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'app-search-component',
            standalone: true,
            imports: [forms_1.FormsModule, common_1.CommonModule, basic_album_component_component_1.BasicAlbumComponentComponent],
            providers: [http_1.HttpClientModule],
            templateUrl: './search-component.component.html',
            styleUrls: ['./search-component.component.scss']
        })
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
