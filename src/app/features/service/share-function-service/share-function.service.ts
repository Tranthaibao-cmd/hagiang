import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareFunctionService {
  dotToComma(value: number) {
    let v = value.toString();
    let decimal = v.split('.');
    let number = Math.floor((decimal[0].length - 1) / 3);
    let arr = [];
    for (let i = 0; i < number; i++) {
      arr.unshift(decimal[0].slice(-3));
      decimal[0] = decimal[0].slice(0, -3);
    }
    arr.unshift(decimal[0]);
    let result = arr.join('.');
    if (decimal.length == 2) {
      result += ',' + decimal[1].slice(0,3);
    }
    return result;
  }
  commaToDot(value) {
    console.log(value, +value.split('.').join('').replace(',', '.'))
    return +value.split('.').join('').replace(',', '.');
  }
}
