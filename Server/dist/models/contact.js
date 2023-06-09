"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
const Schema = _mongoose.default.Schema;
const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Firstname is required"]
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"]
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/, "Please enter a valid email"]
  },
  phone: {
    type: Number,
    required: [true, "Phone is required"]
  },
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  emailVerificationCode: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model("Contact", ContactSchema);
exports.default = _default;