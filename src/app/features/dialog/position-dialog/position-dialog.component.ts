import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ResourcesService } from '@features/service/resources-service/resources.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.scss'],
})
export class PositionDialogComponent implements OnInit, OnChanges {
  @Input('ma_chuc_vu') ma_chuc_vu;
  @Output() closeDialog = new EventEmitter();
  @ViewChild('InputDialog') InputDialog: DialogComponent;
  public resourceList;
  public targetElement: string = '.control-section';
  public isAll;
  constructor(private resourceService: ResourcesService) {}
  ngOnChanges(): void {
    this.get();
  }

  ngOnInit(): void {
    this.resourceService.refresh$.subscribe(() => {
      this.get();
    });
    this.get();
  }
  get() {
    if (this.ma_chuc_vu) {
      this.resourceService
        .getUserRoleV2(this.ma_chuc_vu)
        .subscribe((result) => {
          this.resourceList = result;
          this.isAll = result.filter(r => r.co_quyen == 0).length == 0 ? true : false;
        });
    }
  }
  changeResource(id, name, role) {
    this.resourceService
      .updateUserRoleV2({
        ma_chuc_vu: id,
        ten_tai_nguyen: name,
        co_quyen: role,
      })
      .subscribe((result) => {
      });
  }
  changeResources(e, ten_tai_nguyen) {
    let co_quyen = e.checked ? 'Co' : 'Khong';
    if (ten_tai_nguyen === 'all') {
      this.resourceService.updateAllUserRoleV2(this.ma_chuc_vu, co_quyen).subscribe(result => {
      });
    } else {
      this.changeResource(this.ma_chuc_vu, ten_tai_nguyen, co_quyen);
    }
  }
  close() {
    this.closeDialog.emit(undefined);
    this.resourceList = [];
    this.InputDialog.hide();
  }
}
