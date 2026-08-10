import {
  getAllCustomers,
  getCustomerById,
  findCustomerByEmail,
  updateCustomer,
  deactivateCustomer,
} from "@/app/repositories/customer.repository";

export async function getAllCustomersService() {
  return getAllCustomers();
}

export async function getCustomerByIdService(
  id: string
) {
  const customer = await getCustomerById(id);

  if (!customer) {
    throw new Error("Customer not found.");
  }

  return customer;
}

export async function updateCustomerService(
  id: string,
  input: {
    name: string;
    email: string;
    phone?: string;
    isActive?: boolean;
  }
) {
  const customer = await getCustomerById(id);

  if (!customer) {
    throw new Error("Customer not found.");
  }

  const existingCustomer =
    await findCustomerByEmail(input.email);

  if (
    existingCustomer &&
    existingCustomer.id !== id
  ) {
    throw new Error("Email already exists.");
  }

  return updateCustomer(id, {
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    isActive: input.isActive,
  });
}

export async function deleteCustomerService(
  id: string
) {
  const customer = await getCustomerById(id);

  if (!customer) {
    throw new Error("Customer not found.");
  }

  return deactivateCustomer(id);
}