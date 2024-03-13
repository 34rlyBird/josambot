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

async function Id2Nick(getid: String) {
  const query = await i2nModel.find({ id: getid });
  return query.map((rec: any) => `${rec.nick}`).join("");
}

export { i2nModel, Id2Nick };