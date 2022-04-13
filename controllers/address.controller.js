const Address = require("../models/address.model");
const { extend, concat } = require("lodash");

const findUserAddress = async (req, res, next) => {
  try {
    const { user } = req;
    let address = await Address.findOne({ userId: user._id });

    if (!address) {
      address = new Address({ userId: user._id, addresses: [] });
      address = await address.save();
    }
    req.address = address;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive address details",
      errorMessage: error.message,
    });
  }
};

const getUserAddressList = async (address) => {
  let addressList = address.addresses.filter((addr) => addr.active);
  addressList = addressList.map((addr) => {
    addr.active = undefined;
    addr.createdAt = undefined;
    addr.updatedAt = undefined;
    return addr;
  });
  return addressList;
};

const getUserAddress = async (req, res) => {
  try {
    let { address } = req;
    let addressList = await getUserAddressList(address);
    res.json({ success: true, address: addressList });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive the address details",
      errMessage: err.message,
    });
  }
};

const updateUserAddress = async (req, res) => {
  const addressUpdates = req.body;
  let { address } = req;
  let resStatus;
  if (addressUpdates._id) {
    resStatus = 200;
    for (let addr of address.addresses) {
      if (addr._id == addressUpdates._id) {
        addr = extend(addr, addressUpdates);
        addr.active = true;
        break;
      }
    }
  } else {
    resStatus = 201;
    address = extend(address, {
      addresses: concat(address.addresses, { ...addressUpdates, active: true }),
    });
  }

  let updatedAddress = await address.save();
  updatedAddress = await getUserAddressList(updatedAddress);
  res.status(resStatus).json({ success: true, address: updatedAddress });
};

const removeUserAddress = async (req, res) => {
  const { _id } = req.body;
  let { address } = req;
  for (let addr of address.addresses) {
    if (addr._id == _id) {
      addr.active = false;
      break;
    }
  }
  let addressList = await address.save();
  addressList = await getUserAddressList(address);
  res.json({ success: true, address: addressList });
};

module.exports = {
  findUserAddress,
  getUserAddress,
  updateUserAddress,
  removeUserAddress,
};
