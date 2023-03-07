import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from "@shared/alert/alert.module";
import { DialogModule } from "@syncfusion/ej2-angular-popups";
import { ChangePassRoutingModule } from "./change-pass-routing.module";
import { ChangePassComponent } from "./change-pass.component";

@NgModule({
    declarations: [ChangePassComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, ChangePassRoutingModule, DialogModule, AlertModule],
    exports: []
})
export class ChangePassModule{}