"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var dialog_1 = require("@angular/material/dialog");
var common_1 = require("@angular/common");
;
var LoginDialogComponent = /** @class */ (function () {
    function LoginDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.data = {};
    }
    __decorate([
        core_1.Inject(dialog_1.MAT_DIALOG_DATA)
    ], LoginDialogComponent.prototype, "data");
    LoginDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            standalone: true,
            imports: [
                common_1.CommonModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                forms_1.FormsModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogTitle,
                dialog_1.MatDialogContent,
                dialog_1.MatDialogActions,
                dialog_1.MatDialogClose
            ],
            templateUrl: './login.component.html',
            styleUrl: './login.component.scss'
        })
    ], LoginDialogComponent);
    return LoginDialogComponent;
}());
exports.LoginDialogComponent = LoginDialogComponent;
