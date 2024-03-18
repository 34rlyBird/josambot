import mongoose from "mongoose";

const { Schema } = mongoose;

// Schema to save id & nickname pair
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

/**
 * Model can insert, update and so on
 * {id: string, nick: string}
 */
const i2nModel = mongoose.model("Id2Nick", Id2NickSchema);

/**
 * Translate id to nickname
 * @param {string} getid - id to translate
 * @returns {string} - nickname
 */
async function GetName(getid: string): Promise<string> {
  const query = await i2nModel.find({ id: getid });
  const retName = query.map((rec) => `${rec.nick}`).join("");
  return retName;
}

export { i2nModel, GetName };
