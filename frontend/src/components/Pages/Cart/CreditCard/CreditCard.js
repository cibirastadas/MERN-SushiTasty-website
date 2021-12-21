import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
const CreditCard = ({ handleChangeCard, values, handleSetFocusCard }) => {
  return (
    <div>
      <Cards
        number={values.creditCard.number}
        name={values.creditCard.name}
        expiry={values.creditCard.expiry}
        cvc={values.creditCard.cvc}
        focused={values.creditCard.focus}
      ></Cards>
      <input
        type="tel"
        name="number"
        placeholder="Card Number"
        value={values.creditCard.number}
        onChange={handleChangeCard}
        onFocus={handleSetFocusCard}
      />
      <input
        type="text"
        name="name"
        placeholder="Vardas"
        value={values.creditCard.name}
        onChange={handleChangeCard}
        onFocus={handleSetFocusCard}
      />
      <input
        type="text"
        name="expiryexpiry"
        placeholder="Galiojimo laikas"
        value={values.creditCard.expiry}
        onChange={handleChangeCard}
        onFocus={handleSetFocusCard}
      />
      <input
        type="tel"
        name="cvc"
        placeholder="CVC"
        value={values.creditCard.cvc}
        onChange={handleChangeCard}
        onFocus={handleSetFocusCard}
      />
    </div>
  );
};

export default CreditCard;
