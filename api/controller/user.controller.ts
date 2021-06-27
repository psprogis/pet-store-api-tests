import { BaseController } from './base.controller';
import { JsonRequestWithValidation } from '../request';
import {definitions, operations} from '../../.temp/types';
import { AllureStep } from '../../utils/allureStep';

export class UserController extends BaseController {

    @AllureStep('[UserController] login')
    async login(credentials: { username: string, password: string }) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`user/login`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .searchParams(credentials)
            .send<operations['loginUser']['responses']['200']['schema']>()
        ).headers['token'] as string;
    }

    @AllureStep('[UserController] register')
    async register(userToCreate: Omit<definitions["User"], "id" | "userStatus">) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`user/register`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .body(userToCreate)
            .method('POST')
            .send<operations['registerUser']['responses']['200']['schema']>()
        ).body;
    }
}
