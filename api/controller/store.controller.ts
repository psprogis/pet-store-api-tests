import { JsonRequestWithValidation } from '../request';
import { definitions, operations } from '../../.temp/types';
import { BaseController } from './base.controller';

export class StoreController extends BaseController {

    async getOrderById(orderId: number | string) {
        return (await new JsonRequestWithValidation()        
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`store/order/${orderId}`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .send<operations['getOrderById']['responses']['200']['schema']>()
        ).body;
    }

    async placeOrder(order: Omit<definitions['Order'], 'id'>) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`store/order`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .method('POST')
            .body(order)
            .send<Required<operations['getOrderById']['responses']['200']['schema']>>()
        ).body;
    }

    async getInventory() {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`store/inventory`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body;
    }
}
