import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getAllCustomers() {
  return prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCustomerById(id: string) {
  return prisma.user.findFirst({
    where: {
      id,
      role: "CUSTOMER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function findCustomerByEmail(
  email: string
) {
  return prisma.user.findFirst({
    where: {
      email,
      role: "CUSTOMER",
    },
  });
}

export async function updateCustomer(
  id: string,
  data: Prisma.UserUpdateInput
) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function deactivateCustomer(
  id: string
) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
    },
  });
}