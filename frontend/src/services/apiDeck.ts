import {
  DECK_CREATE_URL,
  ALL_DECK_URL,
  DECK_BY_ID_URL,
  DECK_WITH_CATEGOY_URL,
  DECK_WITH_DATE_CATEGOY_URL,
  ALL_DECK_DATES_URL,
} from "../statics/fetchUrls";

import { NewDeckType } from "../types/flashcardTypes";
import { findToken } from "../utils/apiHelpers";

export async function getDecksWithCategopry(categoryId: string, query: string) {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(
      categoryId === "all" ? ALL_DECK_URL(query) : DECK_WITH_CATEGOY_URL(categoryId, query),
      {
        method: "Get",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.status === "fail" || data.status === "error") {
      alert(data.message);
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw new Error("Couldn't get decks");
  }
}

export async function getDatesOfDecks(categoryId: string, query: string) {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");

  try {
    const res = await fetch(
      categoryId === "all"
        ? ALL_DECK_DATES_URL(query)
        : DECK_WITH_DATE_CATEGOY_URL(categoryId, query),
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.status === "fail" || data.status === "error") {
      alert(data.message);
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw new Error("Couldn't get dates");
  }
}

export async function getDeck(id: number | string | undefined) {
  if (id === undefined) return;
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(DECK_BY_ID_URL(id), {
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
    throw new Error("Couldn't get a deck");
  }
}

export async function createDeck(body: NewDeckType) {
  const accessToken = findToken();

  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(DECK_CREATE_URL, {
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

export async function deleteDeck(id: number | string) {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(DECK_BY_ID_URL(id), {
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

export async function updateDeck(id: number | string, body: NewDeckType) {
  const accessToken = findToken();
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(DECK_BY_ID_URL(id), {
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
