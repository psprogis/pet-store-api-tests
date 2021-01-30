import {strict as assert} from 'assert';
import { PetController } from '../api/controller/pet.controller';

const pet = new PetController();

describe('User can', function() {

    it('receive pet by his id', async function() {
        const body = await pet.getById(1);

        assert(body.id == 1, `Expected API to return id = 1, but got ${body.id}`);
    });

    it('can be received by status', async function() {
        let petResp = await pet.findByStatus('available');
        assert(petResp.length > 0, 'no availabe')

        petResp = await pet.findByStatus('pending');
        assert(petResp.length > 0, 'no pending')

        petResp = await pet.findByStatus('sold');
        assert(petResp.length > 0, 'no sold')

        // Multiple statuses are applicable as well
        // petResp = await pet.findByStatus(['pending', 'available']);
        // assert(petResp.length > 0)

        // assert(petResp.some((pet: any) => pet.status == 'available'));
        // assert(petResp.some((pet: any) => pet.status == 'pending'));
        // assert(!petResp.some((pet: any) => pet.status == 'sold'));
    });

    it('can be received by tag', async function() {
        const petResp = await pet.findByTags('tag1')

        assert(petResp.length > 0)
        assert(petResp.every((pet: any) => pet.tags.some((tag: any) => tag.name == 'tag1')))
    });

});