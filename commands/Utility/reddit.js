
const Discord = require('discord.js');
const request = require('node-superfetch');

module.exports = {
name: "reddit", 
async run(bot, message, args) {
    if(!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send(`Hey <@${message.author.id}>, I need \`EMBED_LINKS\` perm to run that command !`);


    try {
        let user = args[0];
        if (!user) return message.channel.send(`Please provide a reddit user username.`);

        const { body } = await request.get(`https://www.reddit.com/user/${user}/about.json`);
        const { data } = body;

        if (data.hide_from_robots) return message.channel.send("This user is hidden.");

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(data.icon_img.replace(/(amp;)/gi, ""))
        .setURL(`https://www.reddit.com/user/${user}`)
        .setTitle(`/u/${data.name}`)
        .addField("Username", data.name, true)
        .addField("ID", data.id, true)
        .addField("Karma", Number(data.total_karma), true)
        .addField("Date Created", require("moment").utc(data.created_utc * 1000).format("MM/DD/YYYY h:mm A"), true)
        .addField("Gold/Premium?", data.is_gold ? "True (✅)" : "False (<:no:782555002551140362>)", true)
        .addField("Verified", data.verified ? "True (✅)" : "False (❌)", true)
        return message.channel.send(`**REDDIT**`,embed);
    } catch (error) {
        if (error.status === 404) return message.channel.send("User not found.")
        return message.channel.send(`An error occured: **${error.message}**`)
    }
}

}