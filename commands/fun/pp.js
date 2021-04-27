const { MessageEmbed}= require("discord.js")

module.exports = {
name: "pp", 
aliases: ["pipi"], 
run: async(bot, message, args, prefix) => {
const user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
let pipi = [
"8D",
    "8=D",
    "8==D",
    "8===D",
    "8====D",
    "8=====D",
    "8======D",
    "8=======D",
    "8========D",
    "8=========D",
    "8==========D",
    "8===========D",
    "8============D",
    "8=============D",
    "8==============D",    
    "8===============D",    
    "8================D",
]
let pp = pipi[Math.floor(Math.random() * pipi.length)];
/* if(user.id === "745867528651276318") pp = pipi.pop();
if(user.id === "494738882617933830") pp = pipi.shift(); */
const embed = new MessageEmbed() 
.setColor("RANDOM") 
.setTitle("peepee size machine")
.setDescription(`${user.toString()}\'s pp\n${pp}`)
message.lineReply(embed);
}
}