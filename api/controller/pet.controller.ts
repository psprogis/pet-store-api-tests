import { URLSearchParams } from 'url';
import { JsonRequestWithValidation } from '../request';
import { definitions, operations } from '../../.temp/types';
import { BaseController } from './base.controller';

const HOST = 'http://localhost/v2';

export class PetController extends BaseController {

    async getById(id: number | string) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet/${id}`)
            .headers({ token: this.params.token })
            .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;
    }

    async findByTags(tags: string | string[]) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet/findByTags`)
            .headers({ token: this.params.token })
            .searchParams(new URLSearchParams({tags}))
            .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body;
    }

    async findByStatus(status: string | string[]) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet/findByStatus`)
            .headers({ token: this.params.token })
            .searchParams(new URLSearchParams({status}))
            .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body;
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet`)
            .headers({ token: this.params.token })
            .method('POST')
            .body(pet)
            .send<Required<operations['addPet']['responses']['200']['schema']>>()
        ).body;
    }

    async update(pet: definitions['Pet']) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet`)
            .headers({ token: this.params.token })
            .method('PUT')
            .body(pet)
            .send<operations['updatePet']['responses']['200']['schema']>()
        ).body;
    }

    async delete(id: number | string) {
        return (await new JsonRequestWithValidation()
            .url(`${HOST}/pet/${id}`)
            .headers({ token: this.params.token })
            .method('DELETE')
            .send<{ message: string }>()
        ).body;
    }
}
