const Discord = require("discord.js");
const fetch = require('node-fetch');
const bot = new Discord.Client();


module.exports = {
 name: "binary", 
 aliases: [], 
async run(bot, message, args) {
const text = args.join(" ") 
if(!args[0]) return message.reply(`Please enter some text or a binary code to be encoded or decoded.`)

if(text.includes("1") || text.includes("0"))  {
fetch(`https://some-random-api.ml/binary?decode=${text}`)

        .then(response => response.json())
        .then(data => {
          let sss = data.text
message.channel.send(sss)
}) 
} else {
fetch(`https://some-random-api.ml/binary?text=${text}`)
        .then(response => response.json())
        .then(data => {
          let ss = data.binary
message.channel.send(ss)
}) 
}
   } 
}