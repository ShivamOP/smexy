// SHELL / TERMINAL / CONSOLE / EXEC command. 

const Discord = require('discord.js');
const bot = new Discord.Client();
const process = require('child_process');
module.exports = {
    name: "terminal",
    desc: "A command to use terminal/console commands from discors only.", 
    owner: true, 
    botperms: [], 
    userperms: [], 
    aliases: ['console', 'shell'],
        async run(bot, message, args) {
          
const msg = await message.channel.send(`Please wait, this may take a white.`);

try { 
  process.exec(args.join(" ") , (error, stdout) => { let result = (stdout || error);
message.channel.send(result, { code: "asciidoc", split: "\n"}).then(msg => msg.delete())
  }) 
  } catch (err) {
  message.channel.send(`An error occurred: \`${err}\``)
}

}

}


// My Discord Tag 😂 :- VΣX丶ПΣӨП丶SHIVAM _ 🍷🌹🖤†#6969