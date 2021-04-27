module.exports = async(bot, oldMember, newMember) => {
    if (newMember.guild) return;

const { MessageEmbed } = require("discord.js");
const guild = newMember.guild;
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "Smexy Logger");
if(log) {
  
if((oldMember.avatar !== newMember. avatar) && (oldMember.tag !== newMember.tag)) return; 

    const avatar = newMember.user.displayAvatarURL({ dynamic: true });

    const embed = new MessageEmbed() 
      .setAuthor(`${newMember.user.tag}`, avatar)
      .setTimestamp()
.setFooter(`User ID: ${newMember.user.id}`) 
.setDescription(`${newMember.toString()} was **updated**`)
      .setColor("ORANGE");

    if (oldMember.nickname !== newMember.nickname) {
      const oldNickname = oldMember.nickname || "None";
      const newNickname = newMember.nickname || "None";
      embed
        
        .setDescription(`${newMember.toString()} **nickname** was updated`)
.addField(`❯ Old Member Nickname`, oldNickname)
.addField(`❯ New Member Nickname`, newNickname)
      
    }

    if (newMember.roles.cache.size > oldMember.roles.cache.size) {
      
      const role = oldMember.roles.cache
        .difference(newMember.roles.cache).map(role => role.toString()).join(" ");
      embed
      .setDescription(`${newMember.toString()} **roles** were updated`)
        .addField("❯ Roles Added", role);
    }
      
    

    if (newMember.roles.cache.size < oldMember.roles.cache.size) {
      const role = newMember.roles.cache
        .difference(oldMember.roles.cache).map(role => role.toString()).join(" ");
      embed
            .setDescription(`${newMember.toString()} **roles** were updated`)
        .addField("❯ Roles Removed", role);
      
    }
    

    if (oldMember.premiumSince && !newMember.premiumSince) {
      embed
      .setColor("#9610D4")
        .setDescription(
          `${newMember.user.toString()} just **unboosted** the server`
        );
      
    }
if((oldMember.premiumSince && newMember.premiumSince && (oldMember.nickname === newMember.nickname) && (oldMember.roles.cache.size < newMember.roles.cache.size) && (oldMember.roles.cache.size > newMember.roles.cache.size)) || (!oldMember.premiumSince && newMember.premiumSince) && (oldMember.avatar === newMember. avatar) && (oldMember.tag === newMember.tag)) {
embed
.setColor("#9610D4")
        .setDescription(
          `${newMember.user.toString()} just **boosted** the server`
        );
}

return log.send({
username: "Smexy", 
avatarURL: " https://cdn.discordapp.com/emojis/815236313116573727.png", 
embeds: [embed]
})
}
  
}

