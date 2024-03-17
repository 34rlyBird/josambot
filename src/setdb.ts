import { Guild } from "discord.js";
import { env } from "process";
import ScheModel from "./schemas/schedule";
import ClearCollections from "./db";
import { i2nModel } from "./schemas/id2nick";

if (!env.SEASON3_SCHEDULES) {
  throw new Error("SEASON3_SCHEDULES is not defined");
}
const schedules = env.SEASON3_SCHEDULES.split(",").map((s) => {
  const [id, offday] = s.split(":");
  return { id, offday };
});

const setupdb = async (guild: Guild) => {
  await ClearCollections();
  ScheModel.insertMany(schedules);
  console.log("schedules inserted");
  guild.members.fetch().then((members) => {
    members.forEach((member) => {
      let { nickname } = member;
      if (!nickname) {
        nickname = member.user.displayName;
      }
      const mem = { id: member.user.username, nick: nickname };
      i2nModel.create(mem);
    });
  });
  console.log("id2nicks inserted");
};

export default setupdb;
