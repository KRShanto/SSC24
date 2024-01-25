"use server";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function register({
  name,
  email,
  password,
}: RegisterData): Promise<any> {
  return true;
}
