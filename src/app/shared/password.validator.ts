import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordValidator(control: AbstractControl) {

    if (control && (control.value !== null || control.value !== undefined)) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
        if (!regex.test(control.value)) {
            return {
                isError: true
            };
        }
    }

    return false;
}