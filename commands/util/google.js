const cheerio = require('cheerio');
const request = require('node-superfetch');
const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
    name: "google",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: [],
        async run(bot, message, args) {

if(!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send(`Hey <@${message.author.id}>, I need \`EMBED_LINKS\` perm to run that command !`);

let googleKey = "AIzaSyBPjn71e-VyzuFLwYol7T3ZtNiIexn-j40";
let csx = "c87d483ec2e09004d";
let query = args.join(" ");
let result;

if (!query) return message.channel.send("Please enter the query.");
href = await search(query);
if (!href) return message.channel.send("Unknown search.");

const embed = new Discord.MessageEmbed()
.setTitle(href.title)
.setDescription(href.snippet)
.setColor('RANDOM')
.setTimestamp()
.setFooter("Powerded by Google")
.setURL(href.link)
.setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)

return message.channel.send(embed);

async function search(query) {
    const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
        key: googleKey, cx: csx, safe: "off", q: query
    });

    if (!body.items) return null;
    return body.items[0];


}
}
}