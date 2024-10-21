"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AlbumsService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var snack_bar_1 = require("@angular/material/snack-bar");
var AlbumsService = /** @class */ (function () {
    function AlbumsService(spotifyService) {
        this.spotifyService = spotifyService;
        this._snackBar = core_1.inject(snack_bar_1.MatSnackBar);
        this.isBottom = false;
        this.searchQuery = '';
        this.limit = 8;
        this.offset = 0;
        this.totalResults = 0;
        this.albums$ = new rxjs_1.BehaviorSubject([]);
        this.currentAlbums = [];
        this.isLoading$ = new rxjs_1.BehaviorSubject(false);
        this.recentAlbumsSearch$ = new rxjs_1.BehaviorSubject([]);
        this.MAX_RECENT_ALBUMS = 5;
    }
    AlbumsService.prototype.onSearchQuery = function (query) {
        this.resetOffset();
        this.searchQuery = query;
        this.loadMoreAlbums();
    };
    AlbumsService.prototype.loadAlbums = function (albums) {
        this.currentAlbums = this.currentAlbums ? __spreadArrays(this.currentAlbums, albums) : albums;
        this.albums$.next(this.currentAlbums);
    };
    AlbumsService.prototype.resetAlbums = function () {
        this.searchQuery = '';
        this.currentAlbums = [];
        this.albums$.next([]);
        this.isLoading$.next(false);
    };
    AlbumsService.prototype.incrementOffset = function () {
        this.offset += this.limit;
        if (this.offset > this.totalResults) {
            this.offset = this.totalResults;
        }
        if (this.offset == this.totalResults) {
            this.isBottom = true;
            this.showErrorNotification("No More Results");
        }
    };
    AlbumsService.prototype.resetOffset = function () {
        this.offset = 0;
        this.resetAlbums();
    };
    AlbumsService.prototype.loadMoreAlbums = function () {
        var _this = this;
        if (!this.searchQuery) {
            this.albums$.next([]);
            return;
        }
        this.isLoading$.next(true);
        this.spotifyService.getAlbumsApi(this.searchQuery, this.limit, this.offset).subscribe(function (_a) {
            var albums = _a.albums;
            if (albums.next) {
                _this.loadAlbums(albums.items);
            }
            _this.isLoading$.next(false);
            _this.totalResults = albums.total;
        });
    };
    AlbumsService.prototype.pushItemInQueue = function (item) {
        this.recentAlbumsSearch$.next(__spreadArrays([item], this.recentAlbumsSearch$.getValue()).slice(0, this.MAX_RECENT_ALBUMS));
        var recentAlbumsStorage = this.recentAlbumsSearch$.getValue();
        localStorage.setItem('recentAlbumsStorage', JSON.stringify(recentAlbumsStorage));
    };
    AlbumsService.prototype.loadRecentResult = function () {
        var recentAlbumsStorage = localStorage.getItem('recentAlbumsStorage');
        if (recentAlbumsStorage) {
            this.recentAlbumsSearch$.next(JSON.parse(recentAlbumsStorage));
        }
    };
    AlbumsService.prototype.removeRecentResult = function (index) {
        var recentAlbumsStorage = localStorage.getItem('recentAlbumsStorage');
        if (recentAlbumsStorage) {
            var recentAlbumsStorageParse = JSON.parse(recentAlbumsStorage);
            recentAlbumsStorageParse.splice(index, 1);
            this.recentAlbumsSearch$.next(recentAlbumsStorageParse);
            localStorage.setItem('recentAlbumsStorage', JSON.stringify(recentAlbumsStorageParse));
        }
    };
    AlbumsService.prototype.showErrorNotification = function (message) {
        this._snackBar.open(message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['info-snackbar']
        });
    };
    AlbumsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AlbumsService);
    return AlbumsService;
}());
exports.AlbumsService = AlbumsService;
