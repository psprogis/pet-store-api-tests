import {definitions} from '../.temp/types';
import {ApiClient} from '../api/client';
import { strict as assert } from 'assert'

describe('User', () => {
    it('can register', async () => {
        const userToCreate: Omit<definitions['User'], 'id' | 'userStatus'> = {
            firstName: 'Test',
            lastName: 'Test',
            email: `user+${Date.now()}@example.com`,
            phone: '1234567890',
            username: `user${Date.now()}`,
            password: '123456'
        };

        const createdUser = await ApiClient.unauthorized().user.register(userToCreate);

        assert.deepEqual(createdUser, {
            ...userToCreate,
            id: createdUser.id,
            userStatus: createdUser.userStatus
        });
    });
})
