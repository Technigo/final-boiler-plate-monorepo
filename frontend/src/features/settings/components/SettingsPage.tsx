import { ChangeEvent, useState } from "react";
import { Box, RadioGroup, Sheet, Radio } from "@mui/joy";
import Done from "@mui/icons-material/Done";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { radioClasses } from "@mui/joy/Radio";

import { useUser } from "../../../hooks/useUser";

import { Spinner } from "../../../ui/generic/Spinner";
import { useEditUser } from "../../../hooks/useEditUser";
import { InputUser } from "./InputUser";
import { Label } from "../../../ui/shadcn/Label";
import { Input } from "../../../ui/shadcn/Input";
import { Button } from "../../../ui/shadcn/Button";
import { PASSWORD_SCHEMA } from "../../../utils/zod";

export const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  //hooks for api
  const { isPending, data } = useUser();
  const { editUser } = useEditUser();

  if (isPending) return <Spinner />;
  const userData = data.data.data;

  const handleUpdatePassword = () => {
    const passwordObj = { password: value, passwordConfirm: confirmValue };
    //checks if the passwords are correct
    const result = PASSWORD_SCHEMA.safeParse(passwordObj);
    if (!result.success) return alert("Please enter correct password");
    editUser(passwordObj);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    editUser({ theme: event.target.value });
  };

  return (
    <div className="w-10/12 sm:w-2/3 md:w-1/2 mx-auto">
      <h2 className="font-jp font-thin text-xl md:text-2xl text-blue-dark mb-4 text-center w-full">
        セッティング
      </h2>
      <div className="w-full">
        <div className="w-full pb-6 flex flex-col items-center mt-8">
          <Box sx={{ resize: "horizontal", overflow: "hidden", px: 2 }}>
            <Label className="font-semibold uppercase text-sm mb-4 block text-center">
              Theme Color
            </Label>

            <RadioGroup
              aria-labelledby="theme color"
              defaultValue="warning"
              sx={{ gap: 2, flexWrap: "wrap", flexDirection: "row" }}
              onChange={handleChange}
            >
              {(["primary", "neutral", "danger", "success", "warning"] as const).map((color) => (
                <Sheet
                  key={color}
                  sx={{
                    position: "relative",
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    bgcolor: `${color}.solidActiveBg`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Radio
                    overlay
                    variant="solid"
                    color={color}
                    checkedIcon={<Done />}
                    value={color}
                    slotProps={{
                      input: { "aria-label": color },
                      radio: {
                        sx: {
                          display: "contents",
                          "--variant-borderWidth": "2px",
                        },
                      },
                    }}
                    sx={{
                      "--joy-focus-outlineOffset": "4px",
                      "--joy-palette-focusVisible": (theme) => theme.vars.palette[color][500],
                      [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                        outlineWidth: "2px",
                      },
                    }}
                  />
                </Sheet>
              ))}
            </RadioGroup>
          </Box>
        </div>
        <div className="grid gap-6 pt-6 items-center">
          <div className="px-4">
            <InputUser
              storedValue={userData.email}
              label="EMAIL"
              objKey="email"
              centerText={false}
            />
          </div>
          <div className="px-4">
            <InputUser storedValue={userData.name} label="NAME" objKey="name" centerText={false} />
          </div>
          <div className="px-4">
            <fieldset className=" flex items-center gap-2 flex-col px-4 rounded-md p-2.5 shadow-sm max-w-[500px] mx-auto">
              <div className="w-full flex items-center text-start gap-6 ">
                <legend className="font-semibold uppercase text-sm">PASSWORD</legend>
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
              {isEditing && (
                <div className="flex flex-col gap-6 my-3">
                  <div className="flex flex-col  sm:flex-row  gap-4 relative">
                    <Input onChange={(e) => setValue(e.target.value)} placeholder="password" />

                    <Input
                      onChange={(e) => setConfirmValue(e.target.value)}
                      placeholder="password confirm"
                    />
                  </div>
                  <Button
                    className="button text-xs mt-2 w-[160px] mx-auto"
                    onClick={() => {
                      handleUpdatePassword();
                      setIsEditing((prev) => !prev);
                    }}
                  >
                    Change password
                  </Button>
                </div>
              )}
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};
