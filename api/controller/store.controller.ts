import { JsonRequestWithValidation } from '../request';
import {definitions, operations} from "../../.temp/types";
import {BaseController} from "./base.controller";

const HOST = 'http://localhost/v2';

export class StoreController extends BaseController {

    async getOrderById(orderId: number | string) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/store/order/${orderId}`)
            .headers({ token: this.params.token })
            .send<operations['getOrderById']['responses']['200']['schema']>()
        ).body;
    }

    async placeOrder(order: Omit<definitions['Order'], 'id'>) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/store/order`)
            .headers({ token: this.params.token })
            .method('POST')
            .body(order)
            .send<Required<operations['getOrderById']['responses']['200']['schema']>>()
        ).body;
    }

    async getInventory() {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/store/inventory`)
            .headers({ token: this.params.token })
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body;
    }
}
