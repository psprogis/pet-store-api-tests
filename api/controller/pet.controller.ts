import { URLSearchParams } from 'url';
import { JsonRequest } from '../request'

const HOST = 'http://localhost/v2';

export class PetController {

    async addNew(pet: {
        category: { id: number; name: string; };
        name: string; photoUrls: string[];
        tags: { id: number; name: string; }[];
        status: string;
    }) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet`)
            .method('POST')
            .body(pet)
            .send()
        ).body;
    }

    async update(pet: {
        id: number,
        category: { id: number; name: string; };
        name: string; photoUrls: string[];
        tags: { id: number; name: string; }[]; status: string;
    }) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet`)
            .method('PUT')
            .body(pet)
            .send()
        ).body;
    }

    async delete(id: number | string) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet/${id}`)
            .method('DELETE')
            .send()
        ).body;
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet/findByTags`)
            .searchParams(new URLSearchParams({tags}))
            .send()
        ).body;
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequest()
            .url(`${HOST}/pet/findByStatus`)
            .searchParams(new URLSearchParams({status}))
            .send()
        ).body;
    }

    async getById(id: number | string) {
        return (
            await new JsonRequest()
                .url(`${HOST}/pet/${id}`)
                .send()
        ).body;
    }
}
