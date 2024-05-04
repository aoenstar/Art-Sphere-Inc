import prisma from '../prisma-client';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

const passwordHashSaltRounds = 10;
const removeSensitiveDataQuery = [
  '-password',
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

const removeSensitiveDataQueryKeepPassword = [
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

interface CreateUserParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  institution?: string;
  age_group?: string;
  zipcode?: number;
  gender?: string;
  profile_picture?: string;
  hours_goal?: number;
}

const createUser = async (params: CreateUserParams) => {
  const hashedPassword = await hash(params.password, passwordHashSaltRounds);
  if (!hashedPassword) {
    return null;
  }

  params.password = hashedPassword;

  const user: User = await prisma.user.create({
    data: {
      ...params,
      created_at: new Date(),
      last_active: new Date(),
    },
  });
  return user;
};

const getUserById = async (user_id: number) => {
  const user: User | null = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  return user;
};

const getUserByEmail = async (email: string) => {
  const user: User | null = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};

interface UpdateUserParams {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  institution?: string;
}

const updateUser = async (user_id: number, params: UpdateUserParams) => {
  if (params.password) {
    const hashedPassword = await hash(params.password, passwordHashSaltRounds);
    if (!hashedPassword) {
      return null;
    }

    params.password = hashedPassword;
  }
  Object.keys(params).forEach((key) => {
    if (params[key as keyof UpdateUserParams] == null)
      delete params[key as keyof UpdateUserParams];
  });

  const profileUpdate: User = await prisma.user.update({
    where: {
      user_id,
    },
    data: {
      ...params,
    },
  });
  return profileUpdate;
};

export { createUser, updateUser, getUserById, getUserByEmail };
