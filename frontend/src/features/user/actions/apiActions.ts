import { FormEvent } from "react";
import { USER_SCHEMA } from "../../../utils/zod";
import { ZodError } from "zod";

export const checkFormIsValid = (event: FormEvent<HTMLFormElement> | undefined) => {
  event?.preventDefault();

  const formData = new FormData(event?.currentTarget);
  const formJson = Object.fromEntries((formData as any).entries());
  const newFormData: { [key: string]: any } = {};

  Object.keys(formJson).forEach((inputKey) => {
    if (inputKey !== "password" && inputKey !== "passwordConfirm") {
      const value = formData.get(inputKey) as FormDataEntryValue;
      newFormData[inputKey] = value;
    }
  });

  newFormData["passwords"] = {
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = USER_SCHEMA.safeParse(newFormData);

  return result;
};

export const selectErrorMessage = (result: { success: false; error: ZodError }) => {
  let formError = {
    name: { error: false, message: "" },
    email: { error: false, message: "" },
    password: { error: false, message: "" },
    passwordConfirm: { error: false, message: "" },
  };

  result.error.issues.forEach((issue) => {
    const key = issue.path.at(-1);
    if (key === undefined) return;

    Object.hasOwn(formError, key)
      ? (formError = { ...formError, [key]: { error: true, message: issue.message } })
      : "";
  });
  return formError;
};
