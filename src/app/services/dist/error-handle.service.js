"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorHandlingService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ErrorHandlingService = /** @class */ (function () {
    function ErrorHandlingService(snackBar) {
        this.snackBar = snackBar;
        this.errorMessages = {
            400: 'Bad Request - Please check your input',
            401: 'Unauthorized - Please log in again',
            403: 'Forbidden - You don\'t have permission to access this resource',
            404: 'Not Found - The requested resource was not found',
            500: 'Internal Server Error - Please try again later',
            503: 'Service Unavailable - Please try again later'
        };
    }
    ErrorHandlingService.prototype.handleError = function (error) {
        var errorMessage = 'An unknown error occurred!';
        if ((error === null || error === void 0 ? void 0 : error.error) instanceof ErrorEvent) {
            errorMessage = "Error: " + error.error.message;
        }
        else {
            errorMessage = this.errorMessages[error.status] || "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        console.error('Error occurred:', error);
        this.showErrorNotification(errorMessage);
        return rxjs_1.throwError(function () { return errorMessage; });
    };
    ErrorHandlingService.prototype.showErrorNotification = function (message) {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
        });
    };
    ErrorHandlingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ErrorHandlingService);
    return ErrorHandlingService;
}());
exports.ErrorHandlingService = ErrorHandlingService;
