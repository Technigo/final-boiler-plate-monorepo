import { FormControl, FormHelperText, FormLabel, LinearProgress, Typography } from "@mui/joy";

import { checkFormIsValid, selectErrorMessage } from "../actions/apiActions";
import { FormEvent, useState } from "react";
import { createUser } from "../../../services/apiUser";
import { CreateUser, FormError } from "../../../types/userType";
import { useNavigate } from "react-router-dom";
import { currentUserState } from "../../../states/atoms/userAtoms";
import { useSetRecoilState } from "recoil";
import { Button } from "../../../ui/shadcn/Button";
import { Input } from "../../../ui/shadcn/Input";

const initialState = {
  name: { error: false, message: "" },
  email: { error: false, message: "" },
  password: { error: false, message: "" },
  passwordConfirm: { error: false, message: "" },
};

const initialDBerror = {
  status: false,
  message: "",
};

const minLength = 8;

export const SignUpForm = () => {
  const [formError, setFormError] = useState<FormError>(initialState);
  const [dbError, setDbError] = useState(initialDBerror);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const setCurrentUser = useSetRecoilState(currentUserState);

  const hanldleSubmit = async (e: FormEvent<HTMLFormElement> | undefined) => {
    const result = checkFormIsValid(e);
    setDbError(initialDBerror);
    setFormError(initialState);
    let userObj: CreateUser;
    if (result.success === false) {
      const selectedMessage = selectErrorMessage(result);
      return setFormError(selectedMessage);
    } else {
      const data = result;
      userObj = {
        name: data.data.name,
        email: data.data.email,
        password: data.data.passwords.password,
        passwordConfirm: data.data.passwords.passwordConfirm,
      };

      if (userObj) {
        const res = await createUser(userObj);
        if (!res.status) {
          setDbError({ status: true, message: res.message });
        } else if (userObj) {
          setCurrentUser({ name: userObj.name, login: true });
          navigate("/dashboard");
        }
      }
    }
  };
  return (
    <div>
      <div className="w-[300px] sm:w-[400px]">
        <h2 className="text-5xl text-center font-semibold text-red-dark font-display mb-6">
          Sign Up
        </h2>
        <form className="w-full" onSubmit={hanldleSubmit}>
          <FormControl id="name" className="mb-4" error={formError.name.error}>
            <FormLabel required={true}>Name</FormLabel>
            <Input name="name" placeholder="言語" className="p-2" />
            <FormHelperText>{formError.name.error && formError.name.message}</FormHelperText>
          </FormControl>
          <FormControl id="email" className="mb-4" error={formError.email.error}>
            <FormLabel required={true}>Email</FormLabel>
            <Input name="email" placeholder="gengo@google.com" className="p-2 " />
            <FormHelperText>{formError.email.error && formError.email.message}</FormHelperText>
          </FormControl>
          <FormControl id="password" className="mb-4" error={formError.password.error}>
            <FormLabel required={true}>Password : (at least 8 letters)</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password..."
              className="p-2 "
              onChange={(event) => setValue(event.target.value)}
            />
            <FormHelperText>
              {formError.password.error && formError.password.message}
            </FormHelperText>
            <LinearProgress
              determinate
              size="sm"
              value={Math.min((value.length * 100) / minLength, 100)}
              sx={{
                bgcolor: "#F5B9B0",
                color: "#E55039",
                marginTop: "10px",
              }}
            />
            <Typography level="body-xs" sx={{ alignSelf: "flex-end", color: "#25355F" }}>
              {value.length < 3 && "Very weak"}
              {value.length >= 3 && value.length < 6 && "Weak"}
              {value.length >= 6 && value.length < 10 && "Strong"}
              {value.length >= 10 && "Very strong"}
            </Typography>
          </FormControl>
          <FormControl
            id="passwordConfirm"
            className="mb-4"
            error={formError.passwordConfirm.error}
          >
            <FormLabel required={true}>Confirm Password</FormLabel>
            <Input
              name="passwordConfirm"
              placeholder="password..."
              className="p-2 "
              type="password"
              // startDecorator={<Key />}
            />
            <FormHelperText>
              {formError.passwordConfirm.error && formError.passwordConfirm.message}
            </FormHelperText>
          </FormControl>
          <div className="flex items-center justify-center">
            <Button>Register</Button>
          </div>
          {dbError && <p className="text-red-700 text-base">{dbError.message}</p>}
        </form>
      </div>
    </div>
  );
};
