import { Client, GatewayIntentBits, Partials } from "discord.js";
import * as dotenv from "dotenv";
import "./opendb"
import Sch from "./schemas/schedule";

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
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
  } else if (message.content === "!offday") {
    const query = await Sch.find({ name: message.author.username });
    message.reply(query.map((msg) => `${msg.offday}`).join("\n"));
  } else if (message.content === "!offdayall") {
    const query = await Sch.find();
    message.reply(query.map((msg) => `${msg.name}: ${msg.offday}`).join("\n"));
  } else if (message.content === "!todayoffmem") {
    const today = new Date(message.createdTimestamp).getDay();
    const offday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const query = await Sch.find({ offday: offday[today] });
    message.reply(query.map((msg) => `${msg.name}`).join("\n"));
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
client.login(token);
