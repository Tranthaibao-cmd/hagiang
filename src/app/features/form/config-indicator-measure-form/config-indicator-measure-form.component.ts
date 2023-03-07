import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IIndicatorMeasureModel } from '@features/table/config-indicators-table/config-indicators-table.component';
import { inputs } from '@syncfusion/ej2-angular-grids/src/grid/grid.component';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { TagData, Tagify, TagifyService, TagifySettings } from 'ngx-tagify';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { KatexOptions } from 'ng-katex';
import AsciiMathParser from './asciimath2tex.js';
import { IndicatorMeasureService } from '@features/service/indicator-measure/indicator-measure.service';
import {
  existsMaChiTieuCode,
  MaChiTieuValidatorDirective,
} from './ma-chi-tieu-validator.directive';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-config-indicator-measure-form',
  templateUrl: './config-indicator-measure-form.component.html',
  styleUrls: ['./config-indicator-measure-form.component.scss'],
})
export class ConfigIndicatorMeasureFormComponent
  implements OnInit, AfterViewInit, OnChanges, AfterContentChecked
{
  @Input() isAdd: boolean;
  @Input() indicatorsList: IIndicatorMeasureModel[];
  @Input() indicatorDropdownlist;
  @Input() indicatorMeasureData: IIndicatorMeasureModel;
  @Input() hcList: any[];
  @Input() periodList: any[];
  @Input() indiParams;
  @Input() indiGroupList: any[];
  @Input() unitList: any[];
  @Input() input_items;
  @Input() userGroupList: any[];
  @Input() indicatorGroup: any[];
  @Input() administrativeUnits: any[];
  @Input() danhSachSo: any[];
  @Output() mathFormulaChanged: EventEmitter<any> = new EventEmitter();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('tagify') tagify: Tagify;
  @ViewChild('formulaTagify') formulaTagify: Tagify;
  public periodData = [
    { text: 'Tháng', value: 'Thang' },
    { text: 'Quý', value: 'Quy' },
    { text: '6 tháng', value: '6 thang' },
    { text: '9 tháng', value: '9 thang' },
    { text: 'Năm', value: 'Nam' },
  ];
  public cong_don_list = [
    { text: 'Thay thế', value: 0 },
    { text: 'Cộng dồn', value: 1 },
  ];
  public inputForm: FormGroup;
  public fields: Object = { text: 'name', value: 'id' };
  public indiFields = { text: 'ten_nhom_chi_tieu', value: 'ten_nhom_chi_tieu' };
  public mode;
  popHeight = '350px';
  filterPlaceholder = 'Tìm kỳ';
  valid: boolean = false;

  tags: TagData[] = [];
  tagsValue: string;
  formulaTagsValue: string = '';
  asciiMath: string = '';

  settings: TagifySettings = {
    placeholder: 'Tham số đầu vào...',
    duplicates: false,
    enforceWhitelist: true,
    callbacks: {
      click: (e) => {
        console.log(e.detail);
      },
    },
    dropdown: {
      classname: 'color-blue',
      enabled: 0, // show the dropdown immediately on focus
      maxItems: 0,
      position: 'text', // place the dropdown near the typed text
      closeOnSelect: true, // keep the dropdown open after selecting a suggestion
      highlightFirst: true,
    },
  };
  formula_settings: TagifySettings = {
    placeholder: 'Nhập @ và chữ cái để thêm tham số đầu vào',
    duplicates: true,
    mode: 'mix',
    pattern: /@/,
    enforceWhitelist: true,
    callbacks: {
      click: (e) => {
        console.log('changed', e.detail);
      },
    },
    dropdown: {
      classname: 'color-blue',
      enabled: 0, // show the dropdown immediately on focus
      maxItems: 0,
      position: 'text', // place the dropdown near the typed text
      closeOnSelect: true, // keep the dropdown open after selecting a suggestion
      highlightFirst: true,
    },
  };
  equation: string = '\\sum_{i=1}^nx_i';
  katexOptions: KatexOptions = {
    displayMode: true,
    maxSize: Infinity,
  };
  whitelist$ = new BehaviorSubject<TagData[]>([]);
  formula_whitelist$ = new BehaviorSubject<TagData[]>([]);
  readonly = false;
  cotloiList = [
    { text: 'Đặc thù', value: 0 },
    { text: 'Cốt lõi', value: 1 },
  ];
  ParentIndiFields = { text: 'ten_chi_tieu', value: 'ma_chi_tieu' };
  UnitFields = { text: 'ten_don_vi_tinh', value: 'ten_don_vi_tinh' };
  districtFields = { text: 'name', value: 'value' };
  initialized = false;
  user;
  public onFiltering: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== ''
        ? query.where('ten_chi_tieu', 'contains', e.text, true)
        : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.indicatorDropdownlist, query);
  };
  public onFilteringUnit: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== ''
        ? query.where('ten_don_vi_tinh', 'contains', e.text, true)
        : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.unitList, query);
  };
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private tagifyService: TagifyService,
    private ref: ChangeDetectorRef,
    private indicatorMeasureService: IndicatorMeasureService,
    private authService: AuthenticationService
  ) {
    this.user = this.authService.User;
  }

  ngOnInit(): void {
    this.mode = 'CheckBox';
  }
  ngAfterViewInit() {
    this.initialized = true;
    this.createForm();
  }
  ngOnChanges(e) {
    const _tags = this.input_items.map((i) => ({
      value: i.ten_dau_vao,
      code: i.ma_dau_vao,
    }));
    this.whitelist$ = new BehaviorSubject(_tags);
    this.tags = [];
    if (
      this.indicatorMeasureData &&
      this.indicatorMeasureData.tham_so_dau_vao
    ) {
      for (let k in this.indicatorMeasureData.tham_so_dau_vao) {
        const input = this.input_items.find(
          (i) => i.ma_dau_vao == this.indicatorMeasureData.tham_so_dau_vao[k]
        );
        if (input) {
          const tag: TagData = {
            value: input.ten_dau_vao,
            code: input.ma_dau_vao,
          };
          this.tags.push(tag);
        }
      }
    }
    this.formula_whitelist$ = new BehaviorSubject(this.tags);
    this.tagsValue = JSON.stringify(this.tags);
    if (this.indicatorMeasureData.cong_thuc) {
      this.formulaTagsValue = this.getAsciiMathTagsString(
        this.indicatorMeasureData.cong_thuc
      );
      this.asciiMath = this.getAsciiMathFromSourceFormula(
        this.indicatorMeasureData.cong_thuc
      );
      var parser = new AsciiMathParser();
      this.equation = parser.parse(this.asciiMath);
    }
    this.createForm();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }
  createForm(): void {
    console.log(this.indicatorMeasureData?.cong_don);
    this.inputForm = this.fb.group({
      ma_chi_tieu: [
        this.indicatorMeasureData?.ma_chi_tieu
          ? this.indicatorMeasureData.ma_chi_tieu
          : '',
        [
          Validators.required,
          existsMaChiTieuCode(
            this.indicatorsList,
            this.indicatorMeasureData._id
          ),
        ],
      ],
      ma_hien_thi: [
        this.indicatorMeasureData?.ma_hien_thi
          ? this.indicatorMeasureData.ma_hien_thi
          : '',
      ],
      ten_chi_tieu: [
        this.indicatorMeasureData?.ten_chi_tieu
          ? this.indicatorMeasureData.ten_chi_tieu
          : '',
        [Validators.required],
      ],
      don_vi_hanh_chinh: [
        this.indicatorMeasureData?.don_vi_hanh_chinh
          ? this.indicatorMeasureData?.don_vi_hanh_chinh
          : '',
        [Validators.required],
      ],
      ma_loai_ct: [
        this.indicatorMeasureData?.ma_loai_ct
          ? this.indicatorMeasureData.ma_loai_ct
          : '',
        [Validators.required],
      ],
      ky_tinh: [
        this.indicatorMeasureData?.ky_tinh
          ? this.indicatorMeasureData.ky_tinh
          : '',
        [Validators.required],
      ],
      cot_loi: [this.indicatorMeasureData?.cot_loi],
      phong_quan_ly: [
        this.indicatorMeasureData.phong_quan_ly
          ? this.indicatorMeasureData.phong_quan_ly
          : [],
      ],
      so_quan_ly: [
        this.indicatorMeasureData?.so_quan_ly
          ? this.indicatorMeasureData.so_quan_ly
          : '',
        ['6', '7'].includes(this.user.cap) ? [Validators.required] : [],
      ],
      ky_bao_cao: [
        this.indicatorMeasureData?.ky_bao_cao
          ? this.indicatorMeasureData.ky_bao_cao
          : [],
        [Validators.required],
      ],
      ten_don_vi: [
        this.indicatorMeasureData?.ten_don_vi,
        [Validators.required],
      ],
      cong_don: [this.indicatorMeasureData?.cong_don,[Validators.required]],
      tham_so_dau_vao: [this.tagsValue, []],
      cong_thuc: [this.formulaTagsValue, []],
    });
    // console.log(this.inputForm.value?.cong_don)
  }
  show() {
    console.log(this.inputForm, this.indiGroupList);
  }
  enableDropdown(data) {
    // if (this.isAdd) return true;
    // else if (
    //   data?.don_vi_hanh_chinh == 'UBND tỉnh Hà Giang' &&
    //   data?.cot_loi == 1 && this.user.cap == '3'
    // )
    //   return false;
    // else return true;
    
    
    // else if (
    //   this.user.roleid == '611a8142eb78cfc3c4bbdb77' // Cho phép hệ thống huyện Xín Mần sửa chỉ tiêu
    // )
    //   return true;
    if (this.isAdd) return true;
    else if (
      (data?.don_vi_hanh_chinh == 'UBND tỉnh Hà Giang' &&
        data?.cot_loi == 0 &&
        this.user.cap == '6') ||
      (data?.don_vi_hanh_chinh != this.user.rolename &&
        data?.don_vi_hanh_chinh != this.user.ten_phong &&
        this.user.cap == '3')
    )
      return false;
    else return true;
  }

  enableDropdownXinMan(data) {    
    
    if (this.isAdd) return true;
    else if (
      this.user.roleid == '611a8142eb78cfc3c4bbdb77' // Cho phép hệ thống huyện Xín Mần sửa chỉ tiêu
    )
      return true;
    else if (
      (data?.don_vi_hanh_chinh == 'UBND tỉnh Hà Giang' &&
        data?.cot_loi == 0 &&
        this.user.cap == '6') ||
      (data?.don_vi_hanh_chinh != this.user.rolename &&
        data?.don_vi_hanh_chinh != this.user.ten_phong &&
        this.user.cap == '3')
    )
      return false;
    else return true;
  }
  triggerResize(e) {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  get form_ma_chi_tieu_Ctrl(): FormControl {
    return this.inputForm.get('ma_chi_tieu') as FormControl;
  }
  get form_ten_chi_tieu_Ctrl(): FormControl {
    return this.inputForm.get('ten_chi_tieu') as FormControl;
  }
  get form_ten_nhom_chi_tieu_Ctrl(): FormControl {
    return this.inputForm.get('ten_nhom_chi_tieu') as FormControl;
  }
  get form_ten_don_vi_Ctrl(): FormControl {
    return this.inputForm.get('ten_don_vi') as FormControl;
  }
  get form_nhom_nguoi_dung_Ctrl(): FormControl {
    return this.inputForm.get('nhom_nguoi_dung') as FormControl;
  }
  get form_ky_tinh_Ctrl(): FormControl {
    return this.inputForm.get('ky_tinh') as FormControl;
  }
  get form_so_quan_ly_Ctrl(): FormControl {
    return this.inputForm.get('so_quan_ly') as FormControl;
  }
  get form_don_vi_hanh_chinh_Ctrl(): FormControl {
    return this.inputForm.get('don_vi_hanh_chinh') as FormControl;
  }
  get form_ma_loai_ct_Ctrl(): FormControl {
    return this.inputForm.get('ma_loai_ct') as FormControl;
  }
  get form_ky_bao_cao_Ctrl(): FormControl {
    return this.inputForm.get('ky_bao_cao') as FormControl;
  }
  get form_cong_don_Ctrl(): FormControl {
    return this.inputForm.get('cong_don') as FormControl;
  }
  get form_cot_loi_Ctrl(): FormControl {
    return this.inputForm.get('cot_loi') as FormControl;
  }
  getIndicatorMeasureByCode(code: string): any {
    var indicatorMeasure = null;
    this.indicatorMeasureService
      .getIndicators(code, 0, 0, undefined, undefined)
      .subscribe((result) => {
        indicatorMeasure = result;
      });
    return indicatorMeasure;
  }
  validate_ma_chi_tieu(
    control: AbstractControl,
    code: string
  ): { [key: string]: any } | null {
    console.log(control.value);
    var exists = false;
    if (control.value) {
      const existsIndicators = this.getIndicatorMeasureByCode(control.value);
      if (existsIndicators && existsIndicators.length > 0) {
        var existIndicator: IIndicatorMeasureModel = Object.assign(
          {},
          existsIndicators[0]
        );
        if (
          existIndicator &&
          existIndicator._id != this.indicatorMeasureData._id
        )
          return { ma_chi_tieu_Invalid: true };
      }
    }
    return null;
  }
  onInputsAddTags(tags) {}
  onInputsRemoveTags(tags) {}
  onInputsTagsChange(e) {
    this.tagsValue = e.target.value;
    this.indicatorMeasureData.tham_so_dau_vao = {};
    var inputTagsValue = this.tagifyService
      .get('tham_so_dau_vao')
      .getCleanValue();
    for (let i = 0; i < inputTagsValue.length; i++) {
      this.indicatorMeasureData.tham_so_dau_vao[i + 1] = inputTagsValue[i].code;
    }
    if (this.tagsValue) {
      var inputTags = JSON.parse(this.tagsValue);
      if (inputTags) {
        this.formula_whitelist$ = new BehaviorSubject(inputTags);
        this.tagifyService.get('cong_thuc').settings.whitelist = inputTags;
        this.formula_whitelist$.next;
        return;
      }
    }
    this.formula_whitelist$ = new BehaviorSubject([]);
  }
  onFormulaTagsChange(e) {
    this.formulaTagsValue = e.target.value;
    this.emitMathFormulaChanged();
  }
  onFormulaTagsKeydown(e) {
    this.emitMathFormulaChanged();
  }
  emitMathFormulaChanged() {
    var asciiMath = this.getAsciiMathFromTagsValue(this.formulaTagsValue);
    var parser = new AsciiMathParser();
    this.equation = parser.parse(asciiMath);
    this.mathFormulaChanged.emit(asciiMath);
    var mixTagsValue = this.tagifyService
      .get('cong_thuc')
      .getMixedTagsAsString();
    this.indicatorMeasureData.cong_thuc =
      this.convertMixTagsValueToFormula(mixTagsValue);
  }
  submit() {
    console.log('form submited');
  }
  onCancel() {}
  getAsciiMathTagsString(source_formula: string): string {
    var tags_formula = source_formula;
    let regex = /\{(.*?)\}/g;
    let matchs = source_formula.match(regex);
    matchs.forEach((match) => {
      var index = parseInt(match.replace('{', '').replace('}', ''));
      if (index) {
        var inputCode = this.indicatorMeasureData.tham_so_dau_vao[index];
        const input = this.input_items.find((i) => i.ma_dau_vao == inputCode);
        if (input) {
          var tagValString: string = `[[{"value":"${input.ten_dau_vao}","code":"${input.ma_dau_vao}","prefix":"@"}]]`;
          tags_formula = tags_formula.replace(match, tagValString);
        }
      }
    });
    return tags_formula;
  }
  getAsciiMathFromTagsValue(mixTagsValue: string): string {
    var ascii: string = mixTagsValue;
    let regex = /\[\[\{(.*?)\}\]\]/g;
    let matchs = mixTagsValue.match(regex);
    if (matchs) {
      matchs.forEach((match) => {
        var tag = JSON.parse(match);
        if (tag && tag[0][0]) {
          var inputCode = tag[0][0].code;
          var inputName = tag[0][0].value;
          ascii = ascii.replace(match, `color(#329894)(bb "${inputName}")`);
        }
      });
    }
    return ascii;
  }
  getAsciiMathFromSourceFormula(source_formula: string): string {
    var ascii: string = source_formula;
    let regex = /\{(.*?)\}/g;
    let matchs = source_formula.match(regex);
    matchs.forEach((match) => {
      var index = parseInt(match.replace('{', '').replace('}', ''));
      if (index) {
        var inputCode = this.indicatorMeasureData.tham_so_dau_vao[index];
        const input = this.input_items.find((i) => i.ma_dau_vao == inputCode);
        if (input) {
          var colorInputName: string = `color(#329894)(bb "${input.ten_dau_vao}")`;
          ascii = ascii.replace(match, colorInputName);
        }
      }
    });
    return ascii;
  }
  convertMixTagsValueToFormula(mixTagsValue: string): string {
    var formula = mixTagsValue;
    let regex = /\[\[\{(.*?)\}\]\]/g;
    let matchs = mixTagsValue.match(regex);
    if (matchs) {
      matchs.forEach((match) => {
        var tag = JSON.parse(match);
        if (tag && tag[0][0]) {
          var inputCode = tag[0][0].code;
          var inputName = tag[0][0].value;
          var kv = Object.keys(this.indicatorMeasureData.tham_so_dau_vao).find(
            (k) => this.indicatorMeasureData.tham_so_dau_vao[k] == inputCode
          );
          if (kv) formula = formula.replace(match, `{${kv}}`);
        }
      });
    }
    return formula;
  }
}
