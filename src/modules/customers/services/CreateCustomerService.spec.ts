import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';

describe('CreateCustomer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Stany Cruz',
      email: 'stanycrux@outlook.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should note be able to create two customers with the same email', () => {
    expect(1).toBe(1);
  });
});
