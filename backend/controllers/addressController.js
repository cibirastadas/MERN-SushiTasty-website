import Address from "../models/addressModel.js";
export const getAllUserAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.params.userId });
    res.json(addresses);
  } catch (err) {
    res.json({ msg: err });
  }
};
export const createNewAddress = async (req, res, next) => {
  try {
    const address = Address({
      user: req.body.userId,
      city: req.body.city,
      street: req.body.street,
      phoneNumber: req.body.phoneNumber,
      additionalInformation: req.body.additionalInformation,
      addressType: req.body.addressType,
    });
    await address.save();
    res.json({ msg: "Adresas buvo sekmingai pridėtas", address });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const deleteAddressById = async (req, res, next) => {
  try {
    await Address.deleteOne({ _id: req.params.id });
    res.status(200).send("Adresas buvo sėkmingai ištryntas");
  } catch (err) {
    res.json({ message: err });
  }
};

export const updateAddressById = async (req, res, next) => {
  try {
    await Address.updateOne(
      { _id: req.params.addressId },
      {
        $set: {
          city: req.body.city,
          street: req.body.street,
          phoneNumber: req.body.phoneNumber,
          additionalInformation: req.body.additionalInformation,
          addressType: req.body.addressType,
        },
      }
    );
    res.status(200).send("Adresas buvo sėkmingai atnaujintas");
  } catch (err) {
    res.json({ msg: err });
  }
};
