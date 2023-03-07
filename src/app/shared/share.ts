import { Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { MOODLE_CURRENT_USE } from '@features/service/authentication-service/constants';

export const uploadAvatarURL = 'http://45.77.245.61:6868/uploadfile/';
export function checkResource(
  resorce_name,
  authService: AuthenticationService,
  router: Router
) {
  const quyen_tai_nguyen = JSON.parse(
    localStorage.getItem(MOODLE_CURRENT_USE)
  ).quyen_tai_nguyen;
  console.log(quyen_tai_nguyen,resorce_name )
  if (authService.User.rolename != 'Quản trị viên') {
    if (!quyen_tai_nguyen.includes(resorce_name)) {
      if (authService.Menu[0]?.url) {
        router.navigate([authService.Menu[0].url]);
      } else {
        router.navigate([authService.Menu[0]?.subMenu[0].url]);
      }
    }
  }
}
