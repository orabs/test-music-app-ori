"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SpotifyService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../environments/environment");
var SpotifyService = /** @class */ (function () {
    function SpotifyService(errorHandlingService, http, authService) {
        this.errorHandlingService = errorHandlingService;
        this.http = http;
        this.authService = authService;
        this.SPOTIFY_API_TOKEN = 'https://accounts.spotify.com/api/token';
    }
    SpotifyService.prototype.getAccessToken = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var body = new http_1.HttpParams().
            set('grant_type', 'client_credentials').
            set('client_id', environment_1.environment.clientId).
            set('client_secret', environment_1.environment.clientSecret);
        return this.http.post(this.SPOTIFY_API_TOKEN, body, {
            headers: headers
        }).pipe(rxjs_1.catchError(function (error) { return _this.errorHandlingService.handleError(error); }));
    };
    SpotifyService.prototype.getAlbumsApi = function (query, limit, offset) {
        var _this = this;
        if (!this.authService.getToken()) {
            var error = new http_1.HttpErrorResponse({
                status: 401,
                statusText: 'Authorization token is missing. Please log in.'
            });
            this.errorHandlingService.handleError(error);
            return rxjs_1.of();
        }
        var headers = this.authService.getAuthHeaders();
        return this.http.get("https://api.spotify.com/v1/search?q=" + query + "&type=album&limit=" + limit + "&offset=" + offset, {
            headers: headers
        }).pipe(rxjs_1.debounceTime(20000), rxjs_1.distinctUntilChanged(), rxjs_1.catchError(function (error) { return _this.errorHandlingService.handleError(error); }));
    };
    SpotifyService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SpotifyService);
    return SpotifyService;
}());
exports.SpotifyService = SpotifyService;
