const { MessageEmbed } = require('discord.js'); // npm i discord.js

const moment = require('moment'); // npm i moment

const { EMSGSIZE } = require('constants'); // npm i contants

module.exports = {
    name: 'emojiinfo',
    description: 'Shows some information on the emoji you provided!',
    aliases: [ 'emoji-info', 'emote-info', 'emoteinfo'],
    // guildOnly: true,
   // group: 'info',
  //  parameters: ['Emoji'],
  // clientPermissions: ['EMBED_LINKS'],
   // examples: ['emoji <emoji name | emoji>'],
     async run(bot, message, args) {
        const emote = args[0];
        if(!emote) return message.reply('Please provide a custom emoji from this guild!')
        const regex = emote.replace(/^<a?:\w+:(\d+)>$/, '$1');
        
        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emote || emj.id === regex);
        if(!emoji) return message.reply('Please provide a valid custom emoji from this guild!');
        
        const authorFetch = await emoji.fetchAuthor();
       const checkOrCross = (bool) => bool ? '`✅`' : '`❎`';    //true = ✅ false = ❎
        
        const embed = new MessageEmbed()
       .setTimestamp()
      // .setAuthor(`Emoji information for ${emoji.name.toLowerCase()}`, message.guild.iconURL({ dynamic: true}))
        .setColor("RANDOM")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(emoji.url)
        .addField('General', [
            `**❯ ID:** ${emoji.id}`,
            `**❯ URL:** [Link To Emoji](${emoji.url})`,
            `**❯ Author:** ${authorFetch.tag} (${authorFetch.id})`,
            `**❯ Time Created:** ${moment(emoji.createdTimestamp).format('LT')} ${moment(emoji.createdTimestamp).format('LL')} (${moment(emoji.createdTimestamp).fromNow()})`,
            `**❯ Accessable by:** ${emoji.roles.cache.map((role) => role.name).join(', ') || 'Everyone'}`,
`\u200b`, 
        ])
        .addField('Others', [ 
            `**❯ Require Colons:** ${checkOrCross(emoji.requireColons)}`, 
`**❯ Animated:** ${checkOrCross(emoji.animated)}`, 
`**❯ Deletable:** ${checkOrCross(emoji.deleteable)}`, 
`**❯ Managed:** ${checkOrCross(emoji.managed)}`
        ])
        return message.channel.send(`Information About ${emoji.toString()} Emoji`,embed)
        },
};