import mongoose = require("mongoose");

const { Schema } = mongoose;

const MsgSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});

const msgModel = mongoose.model("Msg", MsgSchema);

export default msgModel;
