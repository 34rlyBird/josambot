import { Client, GatewayIntentBits, Partials, Events } from "discord.js";
import * as dotenv from "dotenv";
import ScheModel from "./schemas/schedule";
import setupdb from "./setdb";
import { GetName } from "./schemas/id2nick";
import GetDay from "./schemas/getday";

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
// on message
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  console.log(message.content);
  // Basic commands
  if (message.content === "!ping") {
    await message.reply("Pong!");
  }
  // 메세지를 보낸 사람의 쉬는 날 안내
  else if (message.content === "!offday" || message.content === "!쉬는날") {
    const query = await ScheModel.find({ id: message.author.username });
    await message.reply(
      (
        await Promise.all(
          query.map(async (sche) => {
            // Document.id is typed as any by mongoose
            const answer = `${await GetName(sche.id as string)}님의 쉬는 날은 ${sche.offday}요일이네요.`;
            // Additional message if today is offday
            if (GetDay(sche.offday) === new Date(message.createdTimestamp).getDay()) {
              return `${answer} 오늘은 쉬는 날이에요!`;
            }
            return answer;
          }),
        )
      ).join("\n"),
    );
  }
  // 모든 회원의 쉬는 날 안내
  else if (message.content === "!offdayall" || message.content === "!모두의쉬는날") {
    const query = await ScheModel.find();
    const offdays = ["월", "화", "수", "목", "금"];
    const repArr = await Promise.all(
      // Document.id is typed as any by mongoose
      query.map(async (sche) => ({ name: await GetName(sche.id as string), offday: sche.offday })),
    );
    let answer = "";
    // sort with offday
    for (let i = 0; i < 5; i += 1) {
      const rep = repArr
        .filter((sche) => sche.offday === offdays[i])
        .map((sche) => sche.name)
        .join(", ")
        .replace(/, ([^,]*)$/, " 그리고 $1");
      if (rep !== "") answer += `${rep}님은 ${offdays[i]}요일에 쉬어요!\n`;
    }
    await message.reply(answer);
  }
  // 오늘 쉬는 사람 안내
  else if (message.content === "!todayoffmem" || message.content === "!쉬는사람") {
    const today = new Date(message.createdTimestamp).getDay();
    const offday = ["일", "월", "화", "수", "목", "금", "토"];
    // if today is weekend
    if (today === 0 || today === 6) {
      await message.reply("오늘은 주말! 조삼모사를 하지 않는 날이네요.");
    }
    // weekday
    else {
      const query = await ScheModel.find({ offday: offday[today] });
      // Document.id is typed as any by mongoose
      const rep = (await Promise.all(query.map(async (sche) => `${await GetName(sche.id as string)}`)))
        .join(", ")
        .replace(/, ([^,]*)$/, " 그리고 $1");
      if (rep === "") await message.reply(`오늘은 ${offday[today]}요일이네요. \n모두 나오는 날이에요!`);
      else await message.reply(`오늘은 ${offday[today]}요일이네요. \n${rep}님이 쉬는 날이에요!`);
    }
  }
  // check if message contains image
  if (message.attachments.some((attachment) => attachment.contentType?.startsWith("image"))) {
    // add +1, -1 reaction
    await Promise.all([message.react("👍"), message.react("👎")]);
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

// Set up database here
client.once(Events.ClientReady, async (cli) => {
  const guild = cli.guilds.cache.get(process.env.DISCORD_GUILD_ID!);

  if (!guild) {
    console.error("No guild found");
    return;
  }

  await setupdb(guild);
});

void client.login(token);
