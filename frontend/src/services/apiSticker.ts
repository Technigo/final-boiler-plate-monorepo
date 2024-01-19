import { ALL_STICKER_API, STICKER_BY_ID } from "../statics/fetchUrls";
import { Sticker } from "../types/userType";
import { findToken } from "../utils/apiHelpers";

export async function getStickers() {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(ALL_STICKER_API, {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "fail" || data.status === "error") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function createSticker(body: Sticker) {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(ALL_STICKER_API, {
      method: "POST",
      headers: { Authorization: accessToken, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.status === "fail" || data.status === "error") {
      alert(data.message);
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteSticker(id: number | string | undefined) {
  if (id === undefined) return;
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(STICKER_BY_ID(id), {
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

export async function updateSticker(id: string | undefined, body: Sticker) {
  if (id === undefined) return;
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(STICKER_BY_ID(id), {
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
