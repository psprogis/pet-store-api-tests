import { JsonRequestWithValidation } from '../request';
import { operations } from "../../.temp/types";

const HOST = 'http://petstore.swagger.io/v2';

export class StoreController {

    async getInventory() {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/store/inventory`)
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body;
    }
}
