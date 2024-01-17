import { InputField } from "../../components/inputs/InputField";
import { InputReadOnly } from "../../components/inputs/InputReadOnly";

export const PersonalInfo = () => {
  return (
    <>
      <p className="p-small">
        *These inputs are already filled in and can't be changed, since this is
        not a real web shop.
      </p>
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
  );
};
