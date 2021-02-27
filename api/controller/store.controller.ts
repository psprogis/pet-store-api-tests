import { JsonRequest } from "http-req-builder";
import { operations } from "../../.temp/types";

const HOST = 'http://localhost/v2';

export class StoreController {

    async getInventory() {
        return (
            await new JsonRequest()
            .url(`${HOST}/store/inventory`)
            .headers({token: 'special-key'})
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body;
    }
}
