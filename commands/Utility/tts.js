const Discord = require('discord.js');

const bot = new Discord.Client();

module.exports = {
    name: "tts",

    aliases: ['tts-text'],
        async run(bot, message, args) {
const discordTTS = require("discord-tts");
 const voiceChannel = message.member.voice.channel;
 const text = args.join(' ');

 if(!voiceChannel) return message.channel.send({embed: {
color: "RED", description: "You have to be connected to a voice channel before you can use this command!"}});
 if(!text) return message.channel.send('Please enter something to convert to speech!');

 voiceChannel.join().then(connection => { 

 const stream = discordTTS.getVoiceStream(text)

 const dispatcher = connection.play(stream);

 dispatcher.on("finish",()=> {
message.react('🔉');
voiceChannel.leave();
})

 })
}
}