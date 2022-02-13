import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomerRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomerRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Stany Cruz',
      email: 'test@test.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should note be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Stany Cruz',
      email: 'test@test.com',
    });

    expect(
      createCustomer.execute({
        name: 'Stany Cruz',
        email: 'test@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
