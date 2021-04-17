import { CookieJar } from 'tough-cookie';
import { CONFIG } from '../config/env';
import { ControllerOptions } from './controller/base.controller';
import { PetController } from './controller/pet.controller';
import { StoreController } from './controller/store.controller';
import { UserController } from './controller/user.controller';

export class ApiClient {
    public readonly pet: PetController;
    public readonly store: StoreController;
    public readonly user: UserController;

    constructor(options?: Partial<ControllerOptions>) {
        const defaultOptions = {
            cookieJar: new CookieJar(),
            prefixUrl: CONFIG.PETSTORE_URL,
            prefixPath: CONFIG.PETSTORE_API_PREFIX_PATH,
        };

        const mergedParams = {
            ...defaultOptions,
            ...options,
        };

        this.pet = new PetController(mergedParams);
        this.store = new StoreController(mergedParams);
        this.user = new UserController(mergedParams);
    }

    static unauthorized() {
        return new ApiClient();
    }

    static async loginAs(credentials: {username: string, password: string}) {
        return new ApiClient({
            token: await ApiClient.unauthorized().user.login(credentials)
        });
    }
}
