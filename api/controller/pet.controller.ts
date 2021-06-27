import { URLSearchParams } from 'url';
import { JsonRequestWithValidation } from '../request';
import { definitions, operations } from '../../.temp/types';
import { BaseController } from './base.controller';
import { AllureStep } from '../../utils/allureStep';

export class PetController extends BaseController {

    @AllureStep('[PetController] getById')
    async getById(id: number | string) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`pet/${id}`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;
    }

    @AllureStep('[PetController] findByTags')
    async findByTags(tags: string | string[]) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`pet/findByTags`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .searchParams(new URLSearchParams({tags}))
            .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body;
    }

    @AllureStep('[PetController] findByStatus')
    async findByStatus(status: string | string[]) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`pet/findByStatus`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .searchParams(new URLSearchParams({status}))
            .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body;
    }

    @AllureStep('[PetController] addNew')
    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`pet`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .method('POST')
            .body(pet)
            .send<Required<operations['addPet']['responses']['200']['schema']>>()
        ).body;
    }

    @AllureStep('[PetController] update')
    async update(pet: definitions['Pet']) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`pet`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .method('PUT')
            .body(pet)
            .send<operations['updatePet']['responses']['200']['schema']>()
        ).body;
    }

    @AllureStep('[PetController] delete')
    async delete(id: number | string) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .url(`pet/${id}`)
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .method('DELETE')
            .send<{ message: string }>()
        ).body;
    }
}
