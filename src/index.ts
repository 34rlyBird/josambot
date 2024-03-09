import { Client, GatewayIntentBits } from "discord.js";

const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
  console.log("Bot is ready");
});
client.on("messageCreate", (message) => {
  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});
client.login(token);
