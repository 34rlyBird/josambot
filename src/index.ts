import { Client, GatewayIntentBits, Partials } from "discord.js";
import * as dotenv from "dotenv";
import "./opendb"
import Msg  from "./schemas/msg";

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
  } else if (message.content === "!read") {
    message.reply("그동안 저에게 하신 말들이에요...");
    const query = await Msg.find({});
    message.reply(query.map((msg) => `${msg.name}: ${msg.msg}`).join("\n"));
  } else {
    Msg.create({ name: message.author.username, msg: message.content })
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
