import { useState } from "react";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { Input } from "../../components/inputs/Input";
import { InputReadOnly } from "../../components/inputs/InputReadOnly";

//import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

export const PaymentInfo = () => {
    const [paymentMethod, setPaymentMethod] = useState("klarna")
    const [showKlarna, setShowKlarna] = useState(true); 
    const [showCard, setShowCard] = useState(false);

    // const handleShowKlarna = () => {
    //     setShowKlarna(!showKlarna);
    //     setShowCard(false);
    // };

    // const handleShowCard = () => {
    //     setShowCard(!showCard);
    //     setShowKlarna(false);
    // };

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setPaymentMethod(value);

        if (value === "klarna") {
            setShowKlarna(true);
            setShowCard(false)
        } else if (value === "card") {
            setShowKlarna(false);
            setShowCard(true);
        }
    };

  return (
    <>
          <RadioGroup
    aria-labelledby="payment-options-label"
    defaultValue={paymentMethod}
    name="payment-options"
    onChange={handleRadioChange}
  >
    <FormControlLabel value="klarna" control={<Radio />} label="Pay with Klarna"  />
    
    <FormControlLabel value="card" control={<Radio />} label="Pay with Card" />
    </RadioGroup>
  {showKlarna && 
                <>
                <h2>Klarna</h2>
                {/* <svg data-testid="LocalPostOfficeIcon"></svg> */}
                <ul>
                <li>Safe and easy</li>
                <li>Pay directly, with invoice or partial payments</li>
                <li>Save your card and banc card</li>
                </ul>
                </>}
                {showCard && 
              (<>
              <p>*These inputs are already filled in and can't be changed, since this is not a real web shop.</p>
              <InputReadOnly
                type="text"
                value="Lily Landersen"
                ariaLabel="Card holder input."
                readOnly={true}
              />
              <InputReadOnly
                type="number"
                value="XXXX XXXX XXXX XXXX"
                ariaLabel="City input."
                readOnly={true}
              />
              <InputReadOnly
                type="number"
                value="MM/YY"
                ariaLabel="City input."
                readOnly={true}
              />
              <InputReadOnly
                type="number"
                value="CVC"
                ariaLabel="City input."
                readOnly={true}
              />
                </>)}
  
    </>
  )
}

// <ul>
// <li>
// <Input type={"radio"} name="paymentMethod" value={true} labelTxt={"Pay with Klarna"} onChange={() => handleShowKlarna()}/>
// {showKlarna && 
//     <ul>
//     <li>Safe and easy</li>
//     <li>Pay directly, with invoice or partial payments</li>
//     <li>Save your card and banc card</li>
//     </ul>}

// </li>
// <li>
// <Input type={"radio"} name="paymentMethod" labelTxt={"Pay with card"} onChange={() => handleShowCard()}/> 
// {showCard && 
//   (<>
//   <InputReadOnly
//     type="text"
//     value="Lily Landersen"
//     ariaLabel="Card holder input."
//     readOnly={true}
//   />
//   <InputReadOnly
//     type="number"
//     value="XXXX XXXX XXXX XXXX"
//     ariaLabel="City input."
//     readOnly={true}
//   />
//   <InputReadOnly
//     type="number"
//     value="MM/YY"
//     ariaLabel="City input."
//     readOnly={true}
//   />
//   <InputReadOnly
//     type="number"
//     value="CVC"
//     ariaLabel="City input."
//     readOnly={true}
//   />
//     </>)}
// </li>

// </ul>
