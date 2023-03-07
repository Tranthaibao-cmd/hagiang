function getYearData() {
  var currentYear = new Date().getFullYear();
  var yearData = [];
  for (let i = 2010; i <= currentYear; i++) {
    yearData.unshift({ name: i, value: i });
  }
  return yearData;
}
export const select = {
  typeData: [
    { name: 'Tháng', value: 'Thang' },
    { name: 'Quý', value: 'Quy' },
    { name: '6 tháng', value: '6 thang' },
    { name: '9 tháng', value: '9 thang' },
    { name: 'Năm', value: 'Nam' },
  ],
  quarterData: [
    { name: 'Quý 1', value: 'Quy 1' },
    { name: 'Quý 2', value: 'Quy 2' },
    { name: 'Quý 3', value: 'Quy 3' },
    { name: 'Quý 4', value: 'Quy 4' },
  ],
  monthData: [
    { name: 'Tháng 1', value: 'Thang 1' },
    { name: 'Tháng 2', value: 'Thang 2' },
    { name: 'Tháng 3', value: 'Thang 3' },
    { name: 'Tháng 4', value: 'Thang 4' },
    { name: 'Tháng 5', value: 'Thang 5' },
    { name: 'Tháng 6', value: 'Thang 6' },
    { name: 'Tháng 7', value: 'Thang 7' },
    { name: 'Tháng 8', value: 'Thang 8' },
    { name: 'Tháng 9', value: 'Thang 9' },
    { name: 'Tháng 10', value: 'Thang 10' },
    { name: 'Tháng 11', value: 'Thang 11' },
    { name: 'Tháng 12', value: 'Thang 12' },
  ],
  AllData: [
    { name: 'Tháng 1', value: 'Thang 1' },
    { name: 'Tháng 2', value: 'Thang 2' },
    { name: 'Tháng 3', value: 'Thang 3' },
    { name: 'Tháng 4', value: 'Thang 4' },
    { name: 'Tháng 5', value: 'Thang 5' },
    { name: 'Tháng 6', value: 'Thang 6' },
    { name: 'Tháng 7', value: 'Thang 7' },
    { name: 'Tháng 8', value: 'Thang 8' },
    { name: 'Tháng 9', value: 'Thang 9' },
    { name: 'Tháng 10', value: 'Thang 10' },
    { name: 'Tháng 11', value: 'Thang 11' },
    { name: 'Tháng 12', value: 'Thang 12' },
    { name: 'Nửa đầu năm', value: '6 thang dau' },
    { name: 'Nửa cuối năm', value: '6 thang cuoi' },
    { name: '9 tháng', value: '9 thang' },
    { name: 'Năm', value: 'nam' },
  ],
  haftData: [
    { name: 'Nửa đầu năm', value: '6 thang dau' },
    { name: 'Nửa cuối năm', value: '6 thang cuoi' },
  ],
  nineData: [
    { name: '9 tháng', value: '9 thang' },
  ],
  onlyYearData: [
    { name: 'Năm', value: 'nam' },
  ],
  yearData: getYearData(),
};
