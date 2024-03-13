import { Client, GatewayIntentBits, Partials, Events } from "discord.js";
import * as dotenv from "dotenv";
import "./opendb"
import Sch from "./schemas/schedule";
import { W } from "mongodb";

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel, Partials.Reaction, Partials.Message],
});

client.once("ready", () => {
  console.log("Bot is ready");
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  console.log(message.content);
  if (message.content === "!ping") {
    message.reply("Pong!");
  } else if (message.content === "!offday" || message.content === "!쉬는날") {
    const query = await Sch.find({ name: message.author.username });
    const answer = message.member?.nickname + "님의 쉬는 날은 " + query.map((msg: any) => `${msg.offday}`).join("") +"네요.";
    message.reply(answer);
  } else if (message.content === "!offdayall" || message.content === "!모두의쉬는날") {
    const query = await Sch.find();
    message.reply(query.map((msg: any) => `${msg.name}님은 ${msg.offday}에 쉬시는군요.`).join("\n"));
  } else if (message.content === "!todayoffmem" || message.content === "!쉬는사람") {
    const today = new Date(message.createdTimestamp).getDay();
    const offday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const query = await Sch.find({ offday: offday[today] });
    message.reply(query.map((msg: any) => `${msg.name}`).join("\n"));
  }
  // check if message contains image
  if (message.attachments.some((attachment) => attachment.contentType?.startsWith("image"))) {
    // add +1, -1 reaction
    message.react("👍");
    message.react("👎");
  }
});
// on reaction
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }

  console.log(`Reaction added by ${user.tag}`);
  console.log(reaction.emoji.name);

  if (reaction.emoji.name === "👍") {
    console.log("👍", reaction.count);
  }
  if (reaction.emoji.name === "👎") {
    console.log("👎", reaction.count);
  }
});
client.once(Events.ClientReady , async (client) => {
  const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID!);

  if (!guild) {
    console.error("No guild found");
    return;
  }

  let res = await guild.members.fetch();
  res.forEach((member: any) => {
    console.log(member.user.username);
  });
})
client.login(token);
