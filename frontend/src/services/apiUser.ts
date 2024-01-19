import { CREATE_USER_API, LOGIN_USER_API, UPDATE_GET_USER_API } from "../statics/fetchUrls";
import { CreateUser, LoginBody, UpdateUserBody } from "../types/userType";
import { findToken } from "../utils/apiHelpers";

export const createUser = async (formData: CreateUser) => {
  try {
    const res = await fetch(CREATE_USER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.status === 201) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userName", data.name);
      alert("Created a new User");
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const loginUser = async (formData: LoginBody) => {
  try {
    const res = await fetch(LOGIN_USER_API, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });
    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userName", data.name);
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    console.error(err);
    return { err: true, message: err };
  }
};

export async function getUser() {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(UPDATE_GET_USER_API, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "fail" || data.status === "error") {
      alert(data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw new Error("Couldn't get a user");
  }
}

export async function updateUser(body: UpdateUserBody) {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(UPDATE_GET_USER_API, {
      method: "PUT",
      headers: { Authorization: accessToken, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
