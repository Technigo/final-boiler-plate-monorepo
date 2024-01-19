import { CATEGORY_ID_URL, CATEGORY_URL } from "../statics/fetchUrls";
import { NewCategory } from "../types/flashcardTypes";
import { findToken } from "../utils/apiHelpers";

export async function getCategories() {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(CATEGORY_URL, {
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
    console.log(err);
  }
}

export async function createCategory(body: NewCategory) {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(CATEGORY_URL, {
      method: "POST",
      headers: { Authorization: accessToken, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteCategory(id: number | string) {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(CATEGORY_ID_URL(id), {
      method: "DELETE",
      headers: { Authorization: accessToken },
    });
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateCategory(id: number | string, body: { category: string }) {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(CATEGORY_ID_URL(id), {
      method: "PUT",
      headers: { Authorization: accessToken, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
