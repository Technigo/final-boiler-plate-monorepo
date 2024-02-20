import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";

export const DeliveryDetails = () => {
  return (
    <>
      <RadioGroup
        aria-labelledby="delivery-options-label"
        defaultValue="office"
        name="delivery-options"
      >
        <FormControlLabel
          value="office"
          control={<Radio color="default"/>}
          label="Collect at Post Office"
        />
        <FormControlLabel
          value="home"
          control={<Radio color="default"/>}
          label="Home Delivery"
        />
      </RadioGroup>
    </>
  );
};
