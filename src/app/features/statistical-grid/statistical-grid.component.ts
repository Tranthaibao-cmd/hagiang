import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { chart } from '../report/report/chart';

@Component({
  selector: 'app-statistical-grid',
  templateUrl: './statistical-grid.component.html',
  styleUrls: ['./statistical-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatisticalGridComponent implements OnInit, OnChanges {
  @Input('gridData') gridData;
  // @ViewChild('bggrid', {static: true}) bggrid: ElementRef;
  @ViewChild('grid') grid: GridComponent;
  public pageSettings;
  public widthDialog = 250;
  public tooltip: Object = chart.tooltip;

  public title: string = 'Biểu đồ thống kê';
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
  }

  public onLoad() {
    this.grid.element.addEventListener(
      'keydown',
      this.debounce((e) => {
        if (
          e.target.getAttribute('id') &&
          e.target.getAttribute('id')?.indexOf('_searchbar') !== -1
        ) {
          this.grid.search((e.target as HTMLInputElement).value);
        }
      }, 0)
    );
  }
  public debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  dataBound(args) {
    if ((this.grid.dataSource as any)?.length === 0) {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'none';
    } else {
      (document.getElementsByClassName('e-gridpager')[0] as any).style.display =
        'block';
    }
  }
}
