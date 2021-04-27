



module.exports = {
    name: "autoroles",
    aliases: ["autorole"],
        async run(bot, message, args, prefix) {
if(!message.member.hasPermission('MANAGE_ROLES')) return message.reply("You need \`MANAGE_ROLES\` permission to use this command") 

const { MessageEmbed } = require("discord.js");
message.channel.send(
new MessageEmbed()
.setColor("GREEN")
.setTitle("Auto Roles") 
.setDescription(`Autoroles are the roles which are automatically assigned upon joining of new members in the server.`) 
.addField("Set Auto-Role", `\`${prefix}autorole-add\``) 
.addField("Delete Auto-Role", `\`${prefix}autorole-remove\``) 
.addField("List Auto-Roles", `\`${prefix}autorole-list\``) 
);

}


}