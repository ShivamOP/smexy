const Discord = require("discord.js");

const urban = require("urban");

const bot = new Discord.Client();


module.exports = {
    name: "urban",
    desc: "Shows a list of cmds or info about a specific command.",
    usage: ">urban <word or sentence>",
    aliases: [],
    nsfw: true, 
    perms: "Members",
    async run(bot, message, args) {

    if(args.length < 1) return message.reply("Please enter something!");
    let XD = args.join(" "); 

    urban(XD).first(json => {
        if(!json) return message.reply("No results found!")

        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(json.word)
        .setDescription(json.definition)
        .addField("Upvotes", json.thumbs_up, true)
        .addField("Downvotes", json.thumbs_down, true)
        .setFooter(`Written by ${json.author}`)
        .setTimestamp();
        message.channel.send(embed)
    })


}
}
