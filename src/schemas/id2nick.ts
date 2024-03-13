import mongoose = require("mongoose");
const { Schema } = mongoose;

const Id2NickSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  nick: {
    type: String,
    required: true
  }
});

const i2nModel = mongoose.model("Id2Nick", Id2NickSchema);

async function GetName(getid: String) {
  const query = await i2nModel.find({ id: getid });
  const retName = query.map((rec: any) => `${rec.nick}`).join("");
  const logging = "In GetName... (id) " + getid + "  -> (name) " + retName;
  console.log(logging);
  return retName;
}

export { i2nModel, GetName };