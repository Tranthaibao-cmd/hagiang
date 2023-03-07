import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { IIndicatorMeasureModel } from '@features/table/config-indicators-table/config-indicators-table.component';

@Directive({
  selector: '[appMaChiTieuValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaChiTieuValidatorDirective,
    multi: true
  }]
})
export class MaChiTieuValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length != 10) {
      return { 'ma_chi_tieu_Invalid': true };
    }
    else return null;
  }

  constructor() { }

}

export function existsMaChiTieuCode(indicatorsList: IIndicatorMeasureModel[], _id: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {  
    if (!indicatorsList)
      return null;
    var existsIndicator = indicatorsList.filter(i => i.ma_chi_tieu == control.value && i._id != _id);
    return existsIndicator?.length > 0 ? { 'ma_chi_tieu_Invalid': true } : null;
  };
}
