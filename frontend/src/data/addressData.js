export const addressType = Object.freeze({
  Home: "Namai",
  Work: "Darbas",
  Other: "Kita",
});

export const addressInputList = [
  {
    id: 1,
    label: "Adresas",
    placeholder: `Pvz.: „Savanorių pr. 157A" `,
    name: "street",
    type: "text",
    tag: "input",
  },
  {
    id: 2,
    label: "Telefono nr.",
    placeholder: `+3706 *6 *8 **0`,
    name: "phoneNumber",
    type: "tel",
    tag: "input",
  },
  {
    id: 3,
    label: "Papildoma informacija kurjeriui",
    placeholder: `Pvz.: „laiptine 2", „durų kodas 45", „buto aukšas 2", „ buto nr. 25"`,
    name: "additionalInformation",
    type: "textarea",
    tag: "textarea",
  },
];
export const addressRadioList = [
  {
    id: 1,
    label: "Namai",
    name: "addressType",
    value: "Home",
  },
  {
    id: 2,
    label: "Darbas",
    name: "addressType",
    value: "Work",
  },
  {
    id: 3,
    label: "Kita",
    name: "addressType",
    value: "Other",
  },
];
