import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
  console.log("Bot is ready");
});
client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});
client.login(token);
