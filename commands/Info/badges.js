'use strict';

const Discord = require('discord.js');

const emoji = [
 "828868633672417311","828868636985917460","828868634562396180","828868632661458954","828868636361228398","828868635199799316","828868640258261022","828868638064115713","828868635430092801","828868639671189534","828868639100895242","828868637577838612","828868632070979584"
]
module.exports = {
    name: "badges", 
    aliases: ["serverbadges", "server-badges"], 
    botPerms: ["MANAGE_GUILD"], 
    userPerms: ["MANAGE_GUILD"], 
    async run(bot,message, args) {
   let brigade = [];
    let partner = [];
    let events = [];
    let brillance = [];
    let bravery = [];
    let balance = [];
    let hunter_gold = [];
    let hunter = [];
    let support = [];
    let developers = [];
    let nitro = [];

  
const f = (emote) => {
  return bot.emojis.cache.get(emote).toString();
}
    message.guild.members.cache.forEach(async(m) => {
        const flags = m.user.flags || await m.user.fetchFlags();
        if(flags.toArray().includes('DISCORD_EMPLOYEE')) brigade.push(m.id);
        if(flags.toArray().includes('DISCORD_PARTNER')) partner.push(m.id);
        if(flags.toArray().includes('HYPESQUAD_EVENTS')) events.push(m.id);
        if(flags.toArray().includes('HOUSE_BRILLIANCE')) brillance.push(m.id);
        if(flags.toArray().includes('HOUSE_BRAVERY')) bravery.push(m.id);
        if(flags.toArray().includes('HOUSE_BALANCE')) balance.push(m.id);
        if(flags.toArray().includes('BUGHUNTER_LEVEL_2')) hunter_gold.push(m.id);
        if(flags.toArray().includes('BUGHUNTER_LEVEL_1')) hunter.push(m.id);
        if(flags.toArray().includes('EARLY_SUPPORTER')) support.push(m.id);
        if(flags.toArray().includes('VERIFIED_DEVELOPER')) developers.push(m.id);
        let xxx = m.user.avatarURL({ dynamic: true });
        if(xxx.includes('gif')) nitro.push(m.id);
    });

    let description = `${f(emoji[0])} Discord Employee **${brigade.length}**
    ${f(emoji[1])} Discord Partner **${partner.length}**
    ${f(emoji[2])} Hypesquad Events **${events.length}**
    ${f(emoji[3])} Brillance **${brillance.length}**
    ${f(emoji[4])} Bravery **${bravery.length}**
    ${f(emoji[5])} Balance **${balance.length}**
    ${f(emoji[6])} BugHunter Gold **${hunter_gold.length}**
    ${f(emoji[7])} BugHunter **${hunter.length}**
    ${f(emoji[8])} Early Supporter **${support.length}**
    ${f(emoji[9])} Verified Developer **${developers.length}**
    ${f(emoji[10])} Nitro **${nitro.length}** (not exact)
    ${f(emoji[11])} Server Booster **${message.guild.members.cache.filter(m => m.premiumSinceTimestamp).size}** (not exact)
    ${f(emoji[12])} Bot **${message.guild.members.cache.filter(m => m.user.bot).size}**`;

    const embed = new Discord.MessageEmbed()
  .setTitle(`Badges List of members of ${message.guild.name}`)    .setThumbnail(message.guild.iconURL({dynamic:true}))
    .setColor('#41749C')
    .setDescription(description);
    message.channel.send(embed);
  

  
    }
}