const { MessageEmbed } = require("discord.js") 
module.exports = async (bot, oldGuild, newGuild) => {
const embeds = [];
const guild = newGuild;
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "Smexy Logger");
if(log) {
const EMBED = new MessageEmbed()
.setColor("ORANGE") 
.setAuthor(newGuild.name, newGuild.iconURL({dynamic: true})) 
.setThumbnail(newGuild.iconURL({dynamic: true})) 
.setFooter(`Guild ID: ${newGuild.id}`) 
.setTimestamp() 
.setDescription(`**Server was updated**`)

embeds.push(EMBED)
    if (oldGuild.premiumTier < newGuild.premiumTier) {
      const embed1 = new MessageEmbed() 
        .setTitle("Server Boost Level UP")
        .setDescription(
          `This server is now on boost level **${newGuild.premiumTier}**`
        )
.setColor("#9610D4") 
.setTimestamp() 
.setFooter(`Guild ID: ${newGuild.id}`)
embeds.push(embed1)

    }
    if (oldGuild.premiumTier > newGuild.premiumTier) {
      const embed2 = new MessageEmbed() 
        .setTitle("Server Boost Level Down")
        .setDescription(
          `This server is now on boost level **${newGuild.premiumTier}**`
        ).setColor("#9610D4") 
setTimestamp() 
.setFooter(`Guild ID: ${newGuild.id}`)

embeds.push(embed2)

    }




    if (oldGuild.banner !== newGuild.banner) {
      const embed3 = new MessageEmbed() 
        .setTitle("Server Banner Updated")
.setTimestamp() 
.setColor("BLUE") 
.setDescription("❯ **Banner**")
.setImage(newGuild.bannerURL({dynamic: true})) 
.setThumbnail(newGuild.iconURL({dynamic: true}))
.setFooter(`Guild ID: ${newGuild.id}`)
embeds.push(embed3)
    }



    if (oldGuild.splash !== newGuild.splash) {
      const embed4 = new MessageEmbed() 
        .setTitle("Server Splash Updated")
.setTimestamp() 
.setColor("BLUE") 
.setDescription("❯ **Splash**")
.setImage(newGuild.splashURL({dynamic: true})) 
.setThumbnail(newGuild.iconURL({dynamic: true}))
.setFooter(`Guild ID: ${newGuild.id}`)
embeds.push(embed4)
    }



    if (oldGuild.icon !== newGuild.icon) {
      const embed5 = new MessageEmbed() 
        .setTitle("Server Icon Updated")
.setTimestamp() 
.setDescription("❯ **Icon**")
.setImage(newGuild.iconURL({dynamic: true})) 
.setColor("BLUE") 
.setThumbnail(newGuild.iconURL({dynamic: true}))
.setFooter(`Guild ID: ${newGuild.id}`)
embeds.push(embed5)
    }



 
    if (oldGuild.afkChannel !== newGuild.afkChannel) {
const e1 = new MessageEmbed() 
                    .setTitle("Server Afk Channel Updated")
.addField("❯ Old Afk Channel", oldGuild.afkChannel ? `${oldGuild.afkChannel} (${oldGuild.afkChannel.id})` : `None`) 
.addField("❯ New Afk Channel",newGuild.afkChannel ? `${newGuild.afkChannel} (${newGuild.afkChannel.id})` : `None`) 
.setColor("GREEN") 
.setTimestamp() 
.setFooter(`Guild ID: ${newGuild.id}`)
.setThumbnail(newGuild.iconURL({dynamic: true}))
embeds.push(e1) 
    }
if (oldGuild.afkChannel !== newGuild.afkChannel) {
const e2 = new MessageEmbed() 
                    .setTitle("Server System Channel Updated")
.addField("❯ Old System Channel", oldGuild.systemChannel ? `${oldGuild.systemChannel} (${oldGuild.systemChannel.id})` : `None`) 
.addField("❯ New System Channel",newGuild.systemChannel ? `${newGuild.systemChannel} (${newGuild.systemChannel.id})` : `None`) 
.setColor("GREEN") 
.setTimestamp() 
.setFooter(`Guild ID: ${newGuild.id}`)
.setThumbnail(newGuild.iconURL({dynamic: true}))
embeds.push(e2) 
    }
if (oldGuild.afkChannel !== newGuild.afkChannel) {
const e3 = new MessageEmbed() 
                    .setTitle("Server Rules Channel Updated")
.addField("❯ Old Rules Channel", oldGuild.ruleeChannel ? `${oldGuild.rulesChannel} (${oldGuild.rulesChannel.id})` : `None`) 
.addField("❯ New Rules Channel",newGuild.rulesChannel ? `${newGuild.rulesChannel} (${newGuild.rulesChannel.id})` : `None`) 
.setColor("GREEN") 
.setTimestamp() 
.setFooter(`Guild ID: ${newGuild.id}`)
.setThumbnail(newGuild.iconURL({dynamic: true}))
embeds.push(e3) 
    }
if (oldGuild.afkChannel !== newGuild.afkChannel) {
const ms = require("ms")
const embed6 = new MessageEmbed() 
                    .setTitle("Server Timeout Updated")
.addField("❯ Old Afk Timeout",ms(oldGuild.afkTimeout * 1000) || "None") 
.addField("❯ New Afk Timeout",ms(newGuild.afkTimeout * 1000) || "None") 
.setColor("GREEN") 
.setTimestamp() 
.setFooter(`Guild ID: ${newGuild.id}`)
.setThumbnail(newGuild.iconURL({dynamic: true}))
embeds.push(embed6)
    }
    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
const embed7 = new MessageEmbed() 
              .setTitle("Server Vanity URL Code Updated")
.addField("❯ Old Vanity URL Code", oldGuild.vanityURLcode || "None") 
.addField("❯ New Vanity URL Code", newGuild.vanityURLCode || "None")
.setColor("GREEN") 
.setTimestamp() 
.setFooter(`Guild ID: ${newGuild.id}`)
.setThumbnail(newGuild.iconURL({dynamic: true}))
embeds.push(embed7)
  
    }
    if (oldGuild.name !== newGuild.name) {
      const embed8 = new MessageEmbed() 
        .setTitle("Server Name Updated")
.addField("❯ Old Name", oldGuild.name) 
.addField("❯ New Name", newGuild.name)
.setTimestamp() 
.setFooter(`Guild ID: ${newGuild.id}`)
.setThumbnail(newGuild.iconURL({dynamic: true}))
.setColor("BLUE") 
embeds.push(embed8)
}
    if (oldGuild.region !== newGuild.region) {
      const embed9 = new MessageEmbed() 
        .setTitle("Server Region Updated")
.addField("❯ Old Region", oldGuild.region || "None") 
.addField("❯ New Region", newGuild.region || "None")
.setColor("BLUE") 
.setTimestamp() 
.setFooter(`Guild ID: ${newGuild.id}`)
.setThumbnail(newGuild.iconURL({dynamic: true}))
embeds.push(embed9)
}
     log.send({
username: "Smexy", 
avatarURL: " https://cdn.discordapp.com/emojis/815236313116573727.png", 
embeds: embeds.length ? embeds : EMBED
})

  }
}