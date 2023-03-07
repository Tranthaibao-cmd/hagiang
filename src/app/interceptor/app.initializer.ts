import { AuthenticationService } from "@features/service/authentication-service/authentication.service";
import { ResourcesService } from '@features/service/resources-service/resources.service'
import { MOODLE_CURRENT_USE } from "@features/service/authentication-service/constants";

export function appInitializer(authenticationService: AuthenticationService) {
    const userValue:any = localStorage.getItem(MOODLE_CURRENT_USE)
    const user = JSON.parse(userValue)
    authenticationService.User = user

    return ()  => {
        return new Promise((resolve,reject) => {
          return setTimeout(() => resolve(true), 0);
        })
      }
}
