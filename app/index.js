// Discord bot implements
const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");
const Handler = require('./handler.js');

client.login(process.env.DISCORD_BOT_TOKEN);

client.on("message", async msg => {
  if (msg.author.bot) {
    if (msg.content.startsWith("/poll")) {
      if (msg.author.username === "ブキチ") {
        console.log(msg.author.username);
        msg.delete();
      }
    }      
    // ステージ情報
    if (msg.content === "stageinfo") {
      Handler.call(msg);
      msg.delete();
    }
    return;
  }
  if (msg.content.match("ボーリング")) {
    msg.channel.send("「ボウリング」とは、前方に正三角形に並べられた10本のピンと呼ばれる棒をめがけボールを転がし、倒れたピンの数によって得られる得点を競うスポーツでし。"
+ "専用施設のボウリング場に設置された細長いレーンの上で行われる屋内競技で、レーンの長さが約23m、ピンまでの距離は約18mで行われるのが一般的でし。"
+ "英語では “bowling” と書き、球を意味する “ball” ではなく、ラテン語で「泡」や「こぶ」を意味する “bowl” が語源とされているでし。"
+ "\n文部科学省は国語審議会で、球技を指す場合は「ボウリング」表記を用い、掘削を意味する「ボーリング」と区別することを推奨しているでし。"
);
  }
  Handler.call(msg);
});

client.on("guildMemberAdd", member => {
    const guild = member.guild;
    guild.channels
        .find("id", "414095683746922517")
        .send(
            `<@!${
        member.user.id
      }> たん、よろしくお願いします！\nまずは ${guild.channels.find(
        "id",
        "477067128479023115"
      )} と ${guild.channels.find(
        "id",
        "477067552015515658"
      )} をよく読んでから ${guild.channels.find(
        "id",
        "417591840250920971"
      )} で自己紹介も兼ねて自分のフレコを貼ってください\n\n${
        guild.name
      }のみんなが歓迎していますよ〜`
        )
        .then(sentMessage => sentMessage.react("👍"));
});

client.on("guildMemberRemove", member => {
  const guild = member.guild;
  guild.channels
    .find("id", "709400703751422074")
    .send(`${member.user.tag}さんが退部しました。`);
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});