import { User } from "../types";

const API_URL = process.env.API_URL || "http://localhost:8000";

export const login = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  try {
    console.log(user);
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, user }),
    });
    console.log("res: ", res);
    // if (res.status === 200) {
    //   const result = await res.json();
    //   return result;
    // } else if (res.status === 400) {
    //   const result = await res.json();
    //   return result;
    // }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const register = async ({
  email,
  username,
  password,
}: Pick<User, "email" | "username" | "password">) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email, username }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async ({}) => {
  try {
    const res = await fetch(`${API_URL}/auth/logout`);

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
