const Discord = require("discord.js");
const discord = require("discord.js");
const { MessageEmbed, MessageAttachment} = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const db = require("quick.db")
module.exports = {
  name: "eval",
  description: "Evaluates a js code.",
  owner: true, 
  userperms: [], 
  botperms: [], 
  aliases: ['e'],

  async run(bot, message, args, prefix) {

    let stop;
    let time;
    let start;
function clean(text) {
            if (typeof text === "string")
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203))    .replace(new RegExp(bot.token, "gi"), "[TOKEN]");
            else return text;
        }

      

        try {
           let code = args.join(" ");
if(code.includes("await")) code = "(async () => {" + code + " })()";
          start = process.hrtime();
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            message.react("✅");
 const des = `\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\``
      stop = process.hrtime(start);
time = `${(((stop[0] * 1e9) + stop[1])) / 1e6} ms`;
  if(des.length < 2000) { 
await message.channel.send(`*Executed in ${time}*\n${des}`)
} else {  
      const output = new Discord.MessageAttachment(Buffer.from(des), "output.txt");
        await message.channel.send(`*Executed in ${time}*`, output)
}
          
        } catch (err) {
            message.react("⚠");
      stop = process.hrtime(start);
 time = `${(((stop[0] * 1e9) + stop[1])) / 1e6} ms`;
 const des = `\`\`\`py` + '\n' + clean(err) + `\n` + `\`\`\``
 if(des.length < 2000) { 
await message.channel.send(`*Executed in ${time}*\n${des}`)
} else {  
      const error = new Discord.MessageAttachment(Buffer.from(des) , "error.txt");
        await message.channel.send(`*Executed in ${time}*`, error);
}
        }


    }
}


     
     