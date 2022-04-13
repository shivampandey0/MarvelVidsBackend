const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: "Name is a required field",
    },
    street: {
      type: String,
      required: "House no, street details required",
    },
    locality: {
      type: String,
      required: "Area/locality attribute is required",
    },
    city: {
      type: String,
      required: "City value is required",
    },
    state: {
      type: String,
      required: "State/Province value is required",
    },
    country: {
      type: String,
      required: "Country/Region attribute is required",
    },
    pinCode: {
      type: Number,
      minLength: [6, "Invalid pinCode"],
      maxLength: [6, "Invalid pinCode"],
      required: "Area pincode is required",
      validate: {
        validator: (pinCode) => {
          return /^[1-9][0-9]{5}$/.test(pinCode);
        },
        message: (props) => `${props.value} is not a valid area pincode!`,
      },
    },
    mobileNo: {
      type: Number,
      minLength: [10, "Invalid mobile number"],
      maxLength: [10, "Invalid mobile number"],
      required: "Mobile number is required",
      validate: {
        validator: (mobileNo) => {
          return /^[6-9][0-9]{9}$/.test(mobileNo);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    active: Boolean
  },
  {
    timestamps: true,
  }
);

const addressesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "UserId owning this address details is required",
  },
  addresses: [addressSchema],
});

const Address = mongoose.model("Address", addressesSchema);

module.exports = Address;
