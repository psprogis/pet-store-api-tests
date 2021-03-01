import { strict as assert } from 'assert';
import { PetController } from '../api/controller/pet.controller';
import { definitions } from "../.temp/types";

const pet = new PetController();

describe('Pet', function() {

    it('can be received by his id', async function() {
        const body = await pet.getById(1);

        assert(body.id == 1, `Expected API to return id = 1, but got ${body.id}`);
    });

    it('can be received by status', async function() {
        this.timeout(10 * 1000);

        let petResp = await pet.findByStatus('available');
        assert(petResp.length > 0, 'no available')

        petResp = await pet.findByStatus('pending');
        assert(petResp.length > 0, 'no pending');

        petResp = await pet.findByStatus('sold');
        assert(petResp.length > 0, 'no sold');

        // Multiple statuses are applicable as well
        petResp = await pet.findByStatus(['pending', 'available']);
        assert(petResp.length > 0)

        assert(petResp.some((pet) => pet.status == 'available'));
        assert(petResp.some((pet) => pet.status == 'pending'));
        assert(!petResp.some((pet) => pet.status == 'sold'));
    });

    it('can be received by tag', async function() {
        const petResp = await pet.findByTags('tag1')

        assert(petResp.length > 0)
        assert(petResp.every((pet) => pet.tags.some((tag) => tag.name == 'tag1')));
    });

    it('can be added, updated, and deleted', async function() {
        const petToCreate: Omit<definitions['Pet'], 'id'> = {
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "Cat",
            "photoUrls": [
                "http://test.com/image.jpg"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }
        const addedPet = await pet.addNew(petToCreate);
        assert.deepEqual(
            addedPet,
            {
                ...petToCreate,
                id: addedPet.id
            },
            `Expected created pet to match data used upon creation`
        )
        const foundAddedPet = await pet.getById(addedPet.id);
        assert.deepEqual(
            foundAddedPet,
            {
                ...petToCreate,
                id: addedPet.id
            },
            `Expected found pet to match created pet`
        )
        const newerPet: definitions['Pet'] = {
            id: addedPet.id,
            category: {
                id: 1,
                name: "string2"
            },
            name: "Dog",
            photoUrls: [
                "http://test.com/image2.jpg"
            ],
            tags: [
                {
                    id: 1,
                    name: "string2"
                }
            ],
            status: "pending"
        }
        const updatedPet = await pet.update(newerPet);
        assert.deepEqual(
            updatedPet,
            {
                ...newerPet,
                id: addedPet.id
            },
            `Expected updated pet to equal data used upon updating`
        )
        await pet.delete(addedPet.id);

        // TODO: assert 404 error on attempt to get pet that was deleted
    });

});
