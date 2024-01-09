import { userStore } from "../../stores/userStore"

import { Input } from "../../components/inputs/Input";
import { InputReadOnly } from "../../components/inputs/InputReadOnly";

export const PersonalInfo = () => {

    const { email, setEmail } = userStore()

  return (
    <>
    <Input
            type="email"
            name={"email_from"}
            id={"emailFrom"}
            placeholder="your.email@email.com"
            onChange={email}
            value={email}
            ariaLabel="Email input."
            labelTxt={"Please put in your email"}
          />
          <p>*These inputs are already filled in and can't be changed, since this is not a real web shop.</p>
          <InputReadOnly
            type="text"
            placeholder="Daisy Evergreen"
            ariaLabel="Name input."
            value={"Lily Landersen"}
            readOnly={true}
          />
          <InputReadOnly
            type="text"
            placeholder="+46 12 123 12 12"
            ariaLabel="Phone input."
            value={"+46 12 123 12 12"}
            readOnly={true}
          />
          <InputReadOnly
            type="text"
            placeholder="Lily Lane 12"
            ariaLabel="Address input."
            value={"Lily Lane 12"}
            readOnly={true}
          />
          <InputReadOnly
            type="text"
            placeholder="123 45"
            ariaLabel="ZIP input."
            value={"123 45"}
            readOnly={true}
          />
          <InputReadOnly
            type="text"
            placeholder="Gardenville"
            ariaLabel="City input."
            value={"Lilytown"}
            readOnly={true}
          />
    </>
  )
}
