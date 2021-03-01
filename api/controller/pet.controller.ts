import { URLSearchParams } from 'url';
import { JsonRequestWithValidation } from '../request';
import { definitions, operations } from "../../.temp/types";

const HOST = 'http://petstore.swagger.io/v2';

export class PetController {

    async getById(id: number | string) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet/${id}`)
            .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;
    }

    async findByTags(tags: string | string[]) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet/findByTags`)
            .searchParams(new URLSearchParams({tags}))
            .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body;
    }

    async findByStatus(status: string | string[]) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet/findByStatus`)
            .searchParams(new URLSearchParams({status}))
            .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body;
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet`)
            .method('POST')
            .body(pet)
            .send<operations['addPet']['responses']['200']['schema']>()
        ).body;
    }

    async update(pet: definitions['Pet']) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet`)
            .method('PUT')
            .body(pet)
            .send<operations['updatePet']['responses']['200']['schema']>()
        ).body;
    }

    async delete(id: number | string) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet/${id}`)
            .method('DELETE')
            .send<definitions['AbstractApiResponse']>()
        ).body;
    }
}
