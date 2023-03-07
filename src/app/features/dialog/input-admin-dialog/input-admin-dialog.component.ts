import {
  Component,
  ViewEncapsulation,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { IndicatorService } from '@features/service/indicator-service/indicator.service';
import { ResourcesService } from '@features/service/resources-service/resources.service';
import { UserService } from '@features/service/user-service/user.service';
// import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-admin-dialog',
  templateUrl: './input-admin-dialog.component.html',
  styleUrls: ['./input-admin-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputAdminDialogComponent implements OnInit, OnChanges {
  @Input('selectedUser') selectedUser;
  @ViewChild('InputDialog') InputDialog: DialogComponent;
  @Output() closeDialog = new EventEmitter();
  public roleInputList = [];
  public roleResourcesList = [];
  public targetElement: string = '.control-section';
  constructor(
    private userService: UserService,
    private indiService: IndicatorService
  ) {}
  ngOnChanges(): void {
    console.log(this.selectedUser);
    if (this.selectedUser?.ten_nguoi_dung)
      this.getData(this.selectedUser.ten_nguoi_dung);
  }

  ngOnInit(): void {
    this.userService.refresh$.subscribe(() => {
      if (this.selectedUser) {
        this.getData(this.selectedUser.ten_nguoi_dung);
      }
    });
  }
  change(e, id) {
    this.roleInputList = this.roleInputList.map((r) => {
      if (r._id == id) {
        r.status = e.target.checked ? 1 : 0;
      }
      return r;
    });
    console.log(this.roleInputList);
  }
  save() {
    this.indiService
      .updateGCT(this.selectedUser.ten_nguoi_dung, this.roleInputList)
      .subscribe((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          showConfirmButton: true,
          timer: 2250,
        });
        this.close();
      });
  }
  getData(username) {
    if (username) {
      this.indiService.getGCT(username).subscribe((result) => {
        this.roleInputList = result;
      });
      // this.userService.getUserRole(name).subscribe((result) => {
      //   this.roleInputList = result?.data ? result.data : [];
      // });
    }
  }
  updateInputRole(role) {
    this.userService.updateUserRole(role).subscribe(
      (result) => {},
      (err) => {
        this.getData(this.selectedUser);
      }
    );
  }
  close() {
    this.closeDialog.emit(undefined);
    this.roleInputList = [];
    this.roleResourcesList = [];
    this.InputDialog.hide();
  }
  changeInput(e, data) {
    let role = {
      ten_nguoi_dung: this.selectedUser.username,
      _id: data._id,
      ten: data.ten,
      status: e.status,
    };
    this.updateInputRole(role);
  }
}
