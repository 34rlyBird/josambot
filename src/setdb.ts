import { Guild } from "discord.js";
import ScheModel from "./schemas/schedule";
import { dropCollection, isColExists } from "./db";
import { i2nModel } from "./schemas/id2nick";

// Initialize schedule data from env
if (!process.env.SEASON3_SCHEDULES) {
  throw new Error("SEASON3_SCHEDULES is not defined");
}
const schedules = process.env.SEASON3_SCHEDULES.split(",").map((s) => {
  const [id, offday] = s.split(":");
  return { id, offday };
});

/**
 * initialize db for needed collecitons
 * @param {Guild} guild - guild to setup
 */
const setupdb = async (guild: Guild) => {
  const sche = await isColExists("schedules");

  // Insert only when the collection is dropped
  await dropCollection("schedules");
  await ScheModel.insertMany(schedules);
  console.log("schedules inserted");

  // Insert ID & Nick every time
  await dropCollection("id2nicks");
  const members = await guild.members.fetch();
  await Promise.all(
    members.map(async (member) => {
      let { nickname } = member;
      if (!nickname) {
        nickname = member.user.displayName;
      }
      const mem = { id: member.user.username, nick: nickname };
      await i2nModel.create(mem);
    }),
  );
  console.log("id2nicks inserted");
};

export default setupdb;
