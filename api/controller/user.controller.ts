import { BaseController } from './base.controller';
import { JsonRequestWithValidation } from '../request';
import { operations } from '../../.temp/types';

const HOST = 'http://localhost/v2';

export class UserController extends BaseController {
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
}
