import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import { useEditUser } from "../../../hooks/useEditUser";
import { User } from "../../../types/userType";
import { Label } from "../../../ui/shadcn/Label";
import { Input } from "../../../ui/shadcn/Input";
import { EMAIL_SCHEMA, NAME_SCHEMA } from "../../../utils/zod";

export const InputUser = ({
  storedValue,
  label,
  objKey,
  centerText = true,
}: {
  storedValue?: string;
  label: string;
  objKey: string;
  centerText?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(storedValue);
  const { editUser } = useEditUser();

  const handleUpdateGoal = () => {
    if (value === "" || value === storedValue) return;
    if (objKey === "name") {
      const result = NAME_SCHEMA.safeParse(value);
      if (!result.success) return alert("Please enter valid name");
    } else if (objKey === "email") {
      const result = EMAIL_SCHEMA.safeParse(value);
      if (!result.success) return alert("Please enter valid email");
    }
    const newData = { [objKey]: value } as User;
    editUser(newData);
  };

  return (
    <fieldset className="w-full max-w-[500px] mx-auto break-words min-h-[80px] shadow-sm rounded-md px-2.5 py-3">
      {isEditing ? (
        <div
          className={`flex flex-col ${
            centerText ? "justify-center items-center" : ""
          } gap-4 relative`}
        >
          <Label className="font-semibold uppercase text-sm">{label}</Label>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
            <Input
              defaultValue={value}
              className="text-base w-full"
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="bg-blue-dark w-8 h-8 rounded-full hover:bg-blue-dark/80 transition-colors "
              onClick={() => {
                setIsEditing((prev) => !prev);
                handleUpdateGoal();
              }}
            >
              <CheckIcon sx={{ width: "22px", color: "#fff" }} />
            </button>
          </div>
        </div>
      ) : (
        <div className={`flex flex-col ${centerText ? "justify-center text-center" : ""} `}>
          <div className={`flex gap-4 items-center w-full  ${centerText ? "justify-center" : ""}`}>
            <Label className="font-semibold uppercase text-sm">{label}</Label>

            <button onClick={() => setIsEditing((prev) => !prev)}>
              <ModeEditOutlineIcon
                sx={{
                  width: "16px",
                  color: "#888",
                  transition: "all .3s ease",
                  "&:hover": { color: "#555" },
                }}
              />
            </button>
          </div>
          <p className="mt-4 text-base">{value}</p>
        </div>
      )}
    </fieldset>
  );
};
