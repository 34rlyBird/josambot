import mongoose from "mongoose";

const { Schema } = mongoose;

const Id2NickSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  nick: {
    type: String,
    required: true,
  },
});

const i2nModel = mongoose.model("Id2Nick", Id2NickSchema);

async function GetName(getid: string) {
  const query = await i2nModel.find({ id: getid });
  const retName = query.map((rec) => `${rec.nick}`).join("");
  return retName;
}

export { i2nModel, GetName };
