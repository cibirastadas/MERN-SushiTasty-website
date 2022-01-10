const validateTelephone = new RegExp("^(\\+[0-9]{11})$");
const validateEmail = new RegExp("^([^.@]+)(.[^.@]+)*@([^.@]+.)+([^.@]+)$");
export const validateInfo = (values, isLogin) => {
  let errors = {};
  if (!values.name.trim() && !isLogin) {
    errors.name = "Prašome įveskite naudotojo varda";
  }
  if (!values.email) {
    errors.email = "Prašome įveskite elektroninį paštą";
  }
  if (values.email) {
    if (!validateEmail.test(values.email)) {
      errors.email = "Netinkamas elektroninio pašto formatas";
    }
  }
  if (!values.password) {
    errors.password = "Prašome įveskite slaptažodį";
  } else if (values.password.length < 6) {
    errors.password = "Slaptažodis turi būti, bent iš 6 raidžių ar daugiau";
  }
  if (!values.password2 && !isLogin) {
    errors.password2 = "Prašome įveskite slaptažodį";
  } else if (values.password !== values.password2 && !isLogin) {
    errors.password2 = "Pakartotinis slaptažodis nesutampa";
  }
  return errors;
};
export const validateUserProfilPassword = (values) => {
  let errors = {};
  if (!values.password) {
    errors.password = "Prašome įveskite slaptažodį";
  } else if (values.password.length < 6 || values.oldPassword.length < 6) {
    errors.password = "Slaptažodis turi būti, bent iš 6 raidžių ar daugiau";
  }
  if (!values.oldPassword) {
    errors.oldPassword = "Prašome įveskite slaptažodį";
  } else if (values.oldPassword.length < 6) {
    errors.oldPassword = "Slaptažodis turi būti, bent iš 6 raidžių ar daugiau";
  }
  if (!values.password2) {
    errors.password2 = "Prašome įveskite slaptažodį";
  } else if (values.password !== values.password2) {
    errors.password2 = "Pakartotinis slaptažodis nesutampa";
  }
  return errors;
};
export const validateUserProfileInformation = (values) => {
  let errors = {};
  if (!values.name.trim()) {
    errors.name = "Prašome įveskite naudotojo varda";
  }
  if (!values.email) {
    errors.email = "Prašome įveskite elektroninį paštą";
  }
  if (values.email) {
    if (!validateEmail.test(values.email)) {
      errors.email = "Netinkamas elektroninio pašto formatas";
    }
  }
  return errors;
};
export const validateOrderPayment = (values) => {
  let errors = {};
  if (!values.deliveryType) {
    errors.deliveryType = "Pasirinkite pristatymo būdą";
  }
  if (values.deliveryType === "DeliveryHome" && !values.deliveryAddressId) {
    errors.deliveryAddressId = "Prašome pasirinkite pristatymo adresą";
  }
  if (!values.timeToMake.getHours()) {
    errors.timeToMake = "Pasirinkite pristatymo laiką ir datą!";
  }
  return errors;
};

export const validateAddress = (values) => {
  let errors = {};
  if (!values.city) {
    errors.city = "Prašome įveskite miestą";
  }
  if (!values.street) {
    errors.street = "Prašome įveskite gatvę";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Prašome įveskite telefono numerį";
  }
  if (values.phoneNumber) {
    if (!validateTelephone.test(values.phoneNumber)) {
      errors.phoneNumber = "Neteisingas telefono numerio formatas ";
    }
  }
  if (!["Other", "Work", "Home"].includes(values.addressType)) {
    errors.addressType = "Pasirinkite adreso tipą";
  }
  return errors;
};
export const validateProducts = (
  { name, description, price, image, units, amount, categoryId, category },
  selectedCategoryName
) => {
  const unitsRequired = ["sušiai", "sušių padėklai"];
  const amountRequired = ["gėrimai"];
  let errors = {};
  if ((!selectedCategoryName && !categoryId) || !category) {
    errors.category = "Prašome pasirinkite kategoriją";
    return errors;
  }
  if (!name) {
    errors.name = "Prašome įveskite pavadinimą";
  }
  if (!description) {
    errors.description = "Prašome įveskite aprašymą";
  }
  if (!price) {
    errors.price = "Prašome įveskite kainą";
  }
  if (!image) {
    errors.image = "Prašome įkelkite nuotrauką";
  }
  if (!amountRequired.includes(selectedCategoryName.toLowerCase())) {
    errors.amount = { disabled: true };
  }
  if (amountRequired.includes(selectedCategoryName.toLowerCase()) && !amount) {
    errors.amount = "Prašome įveskite kiekį";
  }
  if (!unitsRequired.includes(selectedCategoryName.toLowerCase())) {
    errors.units = { disabled: true };
  }
  if (unitsRequired.includes(selectedCategoryName.toLowerCase()) && !units) {
    errors.units = "Prašome įveskite vienetų sk.";
  }
  return errors;
};

export const validateFeedbacks = ({ rating, userText, adminText }, isAdmin) => {
  let errors = {};
  if (isAdmin && !adminText) {
    errors.adminText = "Prašome įveskite tekstą";
  }
  if (!rating && !isAdmin) {
    errors.rating = "Prašome pasirinkite įvertinimą";
  }
  if (!userText && !isAdmin) {
    errors.userText = "Prašome įveskite tekstą";
  }
  return errors;
};
