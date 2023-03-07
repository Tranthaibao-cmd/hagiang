export const menuItems = {
  'Tài nguyên Nhập liệu': {
    mainMenu: 'Nhập Liệu',
    icon: 'icon-nhaplieu',
    url: '/nhap-lieu',
    // subMenu: [
    //   {
    //     name: 'Nhập Liệu Tháng',
    //     url: '/nhap-lieu/thang',
    //   },
    //   {
    //     name: 'Nhập Liệu Quý',
    //     url: '/nhap-lieu/quy',
    //   },
    //   {
    //     name: 'Nhập Liệu Năm',
    //     url: '/nhap-lieu/nam',
    //   },
    //   {
    //     name: 'Nhập Liệu GRDP',
    //     url: '/grdp',
    //   },
    // ],
  },
  'Tài nguyên Thống kê': {
    mainMenu: 'Thống Kê',
    icon: 'far fa-chart-bar',
    url: '/thong-ke',
    // subMenu: [
    //   {
    //     name: 'Thống Kê Tháng',
    //     url: '/thong-ke/thang',
    //   },
    //   {
    //     name: 'Thống Kê Quý',
    //     url: '/thong-ke/quy',
    //   },
    //   {
    //     name: 'Thống Kê Năm',
    //     url: '/thong-ke/nam',
    //   },
    //   // {
    //   //   name: 'Thống Kê Cùng Kỳ',
    //   //   url: '/thong-ke/cung-ky',
    //   //   selected: false,
    //   // },
    // ],
  },
  'Tài nguyên Báo cáo tổng hợp': {
    mainMenu: 'Báo Cáo Tổng Hợp',
    icon: 'fal fa-file-alt',
    url: '/bao-cao-tong-hop',
  },
  'Tài nguyên Báo cáo huyện': {
    mainMenu: 'Báo Cáo Định Kỳ',
    icon: 'fal fa-file-alt',
    url: '/bao-cao-huyen',
  },
  // 'Tài nguyên Báo cáo tỉnh': {
  //   mainMenu: 'Báo Cáo Tỉnh',
  //   icon: 'fal fa-file-alt',
  //   url: '/bao-cao-tinh',
  // },
  // 'Tài nguyên Báo cáo': {
  //   mainMenu: 'Báo Cáo',
  //   icon: 'fal fa-file-alt',
  //   url: '/bao-cao',
  // },
  'Tài nguyên Lịch sử nhập liệu': {
    mainMenu: 'Lịch sử nhập liệu',
    icon: 'fal fa-file-signature',
    url: '/lich-su-nhap-lieu',
  },
  'Tài nguyên Lịch sử báo cáo': {
    mainMenu: 'Lịch sử báo cáo',
    icon: 'fas fa-history',
    url: '/lich-su-bao-cao',
  },
  'Tài nguyên Dự báo': {
    mainMenu: 'Dự Báo',
    icon: 'icon-dubao',
    url: '/du-bao',
    selected: false,
  },
  // 'Tài nguyên Cảnh báo': {
  //   mainMenu: 'Cảnh Báo',
  //   icon: 'icon-canhbao',
  //   url: '/canh-bao',
  //   selected: false,
  // },
  'Tài nguyên Thời gian nhập liệu': {
    mainMenu: 'Thời gian nhập liệu',
    icon: 'fas fa-hourglass-half',
    url: '/thoi-gian-nhap-lieu',
    selected: false,
  },
  'Tài nguyên Kế hoạch': {
    mainMenu: 'Kế Hoạch',
    icon: 'fal fa-ballot-check',
    url: '/ke-hoach',
  },
  'Tài nguyên Kế hoạch năm năm': {
    mainMenu: 'Kế Hoạch 5 năm',
    icon: 'fal fa-ballot-check',
    url: '/ke-hoach-5-nam',
    
  },
  'Tài nguyên Chỉ tiêu năm': {
    mainMenu: 'Chỉ Tiêu Năm',
    icon: 'far fa-calendar-alt',
    url: '/chi-tieu-nam',
    selected: false,
  },
  'Tài nguyên Cấu hình': {
    mainMenu: 'Cấu Hình',
    icon: 'icon-cauhinh',
    selected: false,
    subMenu: {
      // 'Đầu vào chỉ tiêu': {
      //   name: 'Đầu Vào Chỉ Tiêu',
      //   url: '/cau-hinh/dau-vao',
      // },
      'Nhóm chỉ tiêu': {
        name: 'Nhóm Chỉ Tiêu',
        url: '/cau-hinh/nhom-chi-tieu',
      },
      'Chỉ tiêu': {
        name: 'Chỉ Tiêu',
        url: '/cau-hinh/chi-tieu',
      },
      'Người dùng': {
        name: 'Người Dùng',
        url: '/cau-hinh/nguoi-dung',
      },
      'Nhóm người dùng': {
        name: 'Nhóm Người Dùng',
        url: '/cau-hinh/nhom-nguoi-dung',
      },

      Phòng: {
        name: 'Phòng',
        url: '/cau-hinh/phong',
      },
      'Chức vụ': {
        name: 'Chức vụ',
        url: '/cau-hinh/chuc-vu',
      },
      'Đơn vị tính': {
        name: 'Đơn Vị Tính',
        url: '/cau-hinh/don-vi-tinh',
      },
      'Tài nguyên': {
        name: 'Tài Nguyên',
        url: '/cau-hinh/tai-nguyen',
      },
    },
  },
};

export const menuAdmin = [
  {
    mainMenu: 'Nhập Liệu',
    icon: 'fas fa-edit',
    selected: false,
    url: '/nhap-lieu',
  },
  {
    mainMenu: 'Thống Kê',
    icon: 'far fa-chart-bar',
    url: '/thong-ke',
    selected: false,
    // subMenu: [
    //   {
    //     name: 'Thống Kê Tháng',
    //     url: '/thong-ke/thang',
    //   },
    //   {
    //     name: 'Thống Kê Quý',
    //     url: '/thong-ke/quy',
    //   },
    //   {
    //     name: 'Thống Kê Năm',
    //     url: '/thong-ke/nam',
    //   },
    //   // {
    //   //   name: 'Thống Kê Cùng Kỳ',
    //   //   url: '/thong-ke/cung-ky',
    //   //   selected: false,
    //   // },
    // ],
  },
  { 
    mainMenu:'Kế Hoạch 5 năm',
    icon: 'fal fa-ballot-check',
    url: '/ke-hoach-5-nam',
  }
  ,
  {
    mainMenu: 'Báo Cáo Tổng Hợp',
    icon: 'fal fa-file-alt',
    url: '/bao-cao-tong-hop',
  },
  {
    mainMenu: 'Báo Cáo Định Kỳ',
    icon: 'fal fa-file-alt',
    url: '/bao-cao-huyen',
    selected: false,
  },
  // {
  //   mainMenu: 'Báo Cáo Tỉnh',
  //   icon: 'fal fa-file-alt',
  //   url: '/bao-cao-tinh',
  //   selected: false,
  // },
  // {
  //   mainMenu: 'Báo Cáo',
  //   icon: 'fal fa-file-alt',
  //   url: '/bao-cao',
  //   selected: false,
  // },
  {
    mainMenu: 'Lịch sử nhập liệu',
    icon: 'fal fa-file-signature',
    url: '/lich-su-nhap-lieu',
    selected: false,
  },
  {
    mainMenu: 'Lịch sử báo cáo',
    icon: 'fas fa-history',
    url: '/lich-su-bao-cao',
    selected: false,
  },
  {
    mainMenu: 'Dự Báo',
    icon: 'icon-dubao',
    url: '/du-bao',
    selected: false,
  },
  {
    mainMenu: 'Thời gian nhập liệu',
    icon: 'fas fa-hourglass-half',
    url: '/thoi-gian-nhap-lieu',
    selected: false,
  },
  {
    mainMenu: 'Kế hoạch',
    icon: 'fal fa-ballot-check',
    url: '/ke-hoach',
    selected: false,
  },
  {
    mainMenu: 'Chỉ tiêu năm',
    icon: 'far fa-calendar-alt',
    url: '/chi-tieu-nam',
    selected: false,
  },
  {
    mainMenu: 'Cấu Hình',
    icon: 'far fa-cogs',
    selected: false,
    subMenu: [
      {
        name: 'Đầu Vào Chỉ Tiêu',
        url: '/cau-hinh/dau-vao',
      },
      {
        name: 'Nhóm Chỉ Tiêu',
        url: '/cau-hinh/nhom-chi-tieu',
      },
      {
        name: 'Chỉ Tiêu',
        url: '/cau-hinh/chi-tieu',
      },
      {
        name: 'Người Dùng',
        url: '/cau-hinh/nguoi-dung',
      },
      {
        name: 'Nhóm Người Dùng',
        url: '/cau-hinh/nhom-nguoi-dung',
      },
      {
        name: 'Phòng',
        url: '/cau-hinh/phong',
      },
      {
        name: 'Chức Vụ',
        url: '/cau-hinh/chuc-vu',
      },
      {
        name: 'Đơn Vị Tính',
        url: '/cau-hinh/don-vi-tinh',
      },
      {
        name: 'Tài Nguyên',
        url: '/cau-hinh/tai-nguyen',
      },
    ],
  },
];
