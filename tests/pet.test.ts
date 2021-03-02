import { strict as assert } from 'assert';
import { definitions } from '../.temp/types';
import { ApiClient } from '../api/client';

describe('Pet', function() {

    it('can be received by his id', async function() {
        const responseBody = await ApiClient.unauthorized().pet.getById(1);

        assert(responseBody.id == 1, `Expected API to return id = 1, but got ${responseBody.id}`);
    });

    it('can be received by status', async function() {
        const client = ApiClient.unauthorized();

        let responseBody = await client.pet.findByStatus('available');
        assert(responseBody.length > 0, 'no available')

        responseBody = await client.pet.findByStatus('pending');
        assert(responseBody.length > 0, 'no pending');

        responseBody = await client.pet.findByStatus('sold');
        assert(responseBody.length > 0, 'no sold');

        // Multiple statuses are applicable as well
        responseBody = await client.pet.findByStatus(['pending', 'available']);
        assert(responseBody.length > 0)

        assert(responseBody.some((pet) => pet.status == 'available'));
        assert(responseBody.some((pet) => pet.status == 'pending'));
        assert(!responseBody.some((pet) => pet.status == 'sold'));
    });

    it('can be received by tag', async function() {
        const client = ApiClient.unauthorized();
        const responseBody = await client.pet.findByTags('tag1')

        assert(responseBody.length > 0)
        assert(responseBody.every((pet) => pet.tags.some((tag) => tag.name == 'tag1')));
    });

    it('can be added, updated, and deleted', async function() {
        const adminClient = await ApiClient.loginAs({ username: 'admin', password: 'admin' });
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
        const addedPet = await adminClient.pet.addNew(petToCreate);
        assert.deepEqual(
            addedPet,
            {
                ...petToCreate,
                id: addedPet.id
            },
            `Expected created pet to match data used upon creation`
        )
        const foundAddedPet = await adminClient.pet.getById(addedPet.id);
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
        const updatedPet = await adminClient.pet.update(newerPet);
        assert.deepEqual(
            updatedPet,
            {
                ...newerPet,
                id: addedPet.id
            },
            `Expected updated pet to equal data used upon updating`
        )
        await adminClient.pet.delete(addedPet.id);

        // TODO: assert 404 error on attempt to get pet that was deleted
    });

});
