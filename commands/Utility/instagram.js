const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags"); //npm i common-tags
const instagram = require("instagram-api-api") //npm i instagram-api-api
module.exports = {
    name: "instagram",
    aliases: ["ig", "insta"],
    description: "Find out some nice instagram statistics",
     async run(bot, message, args)  {
        const name = args.join(" ");

        if (!name) return message.channel.send("Please provide an instagram name.")
      try {
        const account = await instagram.user(name)
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(account.username)
            .setFooter(account.username, account.is_verified ? "https://emoji.gg/assets/emoji/6817_Discord_Verified.png" : null)
           .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile information", stripIndents`
            \`•\` Username: **${account.username}**
            \`•\` Full name: **${account.full_name ? account.full_name : "Unknown"}**
            \`•\` Bio: **${account.biography ? account.biography : "No Bio"}**
            \`•\` Posts: **${account.edge_owner_to_timeline_media.count}**
            \`•\` Followers: **${account.edge_followed_by.count}**
            \`•\` Following: **${account.edge_follow.count}**
            \`•\` Private: **${account.is_private ? "Yes" : "No"}**`)
      
        message.channel.send(embed);
      } catch (e) {
        message.channel.send(`Sorry i can't find that user.`)
      }
    }
}