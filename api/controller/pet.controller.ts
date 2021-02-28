import { URLSearchParams } from 'url';
import { JsonRequest } from 'http-req-builder'
import { definitions, operations } from "../../.temp/types";
import { loadAPISpec, validate } from '../validator';

const HOST = 'http://localhost/v2';

export class PetController {

    async getById(id: number | string) {
        const body = (
            await new JsonRequest()
            .url(`${HOST}/pet/${id}`)
            .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;

        const apiSpec = await loadAPISpec();
        const schema = apiSpec.paths['/pet/{petId}']['get']['responses']['200']['schema'];

        validate(schema, body);
        return body;
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet/findByTags`)
            .searchParams(new URLSearchParams({tags}))
            .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body;
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet/findByStatus`)
            .searchParams(new URLSearchParams({status}))
            .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body;
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet`)
            .method('POST')
            .headers({token: 'special-key'})
            .body(pet)
            .send<operations['addPet']['responses']['200']['schema']>()
        ).body;
    }

    async update(pet: definitions['Pet']) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet`)
            .method('PUT')
            .headers({token: 'special-key'})
            .body(pet)
            .send<operations['updatePet']['responses']['200']['schema']>()
        ).body;
    }

    async delete(id: number | string) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet/${id}`)
            .method('DELETE')
            .headers({token: 'special-key'})
            .send<definitions['AbstractApiResponse']>()
        ).body;
    }
}
