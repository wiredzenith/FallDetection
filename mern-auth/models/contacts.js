const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});
module.exports = Contacts = mongoose.model("contact", ContactsSchema);
