"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var toolbar_1 = require("@angular/material/toolbar");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var menu_1 = require("@angular/material/menu");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var register_component_1 = require("../register/register.component");
var login_component_1 = require("../login/login.component");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(dialog, router, albumService, albumsService, authToken) {
        this.dialog = dialog;
        this.router = router;
        this.albumService = albumService;
        this.albumsService = albumsService;
        this.authToken = authToken;
        this.searchQuery = '';
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.albumService.loadRecentResult();
    };
    NavbarComponent.prototype.onSearch = function (searchForm) {
        this.albumsService.resetOffset();
        this.albumsService.onSearchQuery(searchForm);
        this.albumsService.pushItemInQueue(searchForm);
        this.router.navigate(['/albums']);
    };
    NavbarComponent.prototype.clearSearchInput = function (searchInputElement) {
        searchInputElement.value = '';
    };
    NavbarComponent.prototype.removeSearch = function (index) {
        this.albumsService.removeRecentResult(index);
    };
    NavbarComponent.prototype.openRecentMenu = function () {
        this.menuTrigger.openMenu();
    };
    NavbarComponent.prototype.onRecentClick = function (value) {
        this.albumService.onSearchQuery(value);
    };
    Object.defineProperty(NavbarComponent.prototype, "recentAlbumsSearch$", {
        get: function () {
            return this.albumService.recentAlbumsSearch$;
        },
        enumerable: false,
        configurable: true
    });
    NavbarComponent.prototype.openRegisterDialog = function () {
        var dialogRef = this.dialog.open(register_component_1.RegisterDialogComponent);
    };
    NavbarComponent.prototype.openLoginDialog = function () {
        var dialogRef = this.dialog.open(login_component_1.LoginDialogComponent);
    };
    NavbarComponent.prototype.goHome = function () {
        this.albumsService.resetOffset();
        this.router.navigate(['/albums']);
    };
    __decorate([
        core_1.ViewChild(menu_1.MatMenuTrigger)
    ], NavbarComponent.prototype, "menuTrigger");
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            standalone: true,
            imports: [
                common_1.CommonModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                menu_1.MatMenuModule,
                input_1.MatInputModule,
                form_field_1.MatFormFieldModule,
                router_1.RouterModule,
                forms_1.FormsModule,
            ],
            templateUrl: './navbar.component.html',
            styleUrl: './navbar.component.scss'
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
