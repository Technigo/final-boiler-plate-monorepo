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
        placeholder="Rhoda Dendron"
        ariaLabel="Name input."
        value={"Rhoda Dendron"}
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
        placeholder="12 Dendron Rhode"
        ariaLabel="Address input."
        value={"12 Dendron Rhode"}
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
          placeholder="Rhodonia"
          ariaLabel="City input."
          value={"Rhodonia"}
          readOnly={true}
        />
    </>
  );
};
