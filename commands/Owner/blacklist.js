const { MessageEmbed } = require("discord.js");
const Blacklisted = require("../../models/black");

module.exports = {
  name: "blacklist",
  description: "Remove/add blacklist from a user",
  category: "owner",
  usage: "[add | remove | view] <user>",
owner: true, 
  run: async (bot, message, args, prefix) => {
    const type = args[0];
    const member =
      message.mentions.users.first() ||
      bot.users.cache.get(args[1]) ||
      bot.users.cache.find((user) => user.tag === args.slice(1).join(" "));

    if (!type) {
      return message.channel.send(`Please provide a type.\nUsage: \`${prefix}blacklist [add | remove | view] <user>\``);
    }

    if (!member && args[0].toLowerCase() !== "list") {
      return message.channel.send(`Please provide a user.\nUsage: \`${prefix}blacklist [add | remove | view] <user>\``);
    }

    

    const users = await Blacklisted.find();

    switch (type) {
      case "list": {
const list = users.map((u, index) => bot.users.cache.get(u.user) ? `${index+1}. **${bot.users.cache.get(u.user).tag}** (${bot.users.cache.get(u.user).id})` : "Unknown User")
 return message.channel.send(
   new MessageEmbed() 
   .setTitle("Blacklisted Users")
 .setTimestamp()
 .setDescription(list.join("\n"))
 .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
 ) 
 
        
      }
      case "view": {
        const usr = users.find((u) => u.user === member.id);

        if (!usr) {
          return message.channel.send("User is not blacklisted");
        }
return message.channel.send("User is blacklisted");
      }
      case "add": {
        const existing = users.filter((u) => u.user === member.id)[0];
        if (existing) {
          return message.channel.send("This user is already blacklisted.");
        }

        const blUser = new Blacklisted({ user: member.id });


        await blUser.save();
        return message.channel.send("User has been successfully blacklisted.");

        break;
      }
      case "remove": {
        if (users === null) {
          return message.channel.send("This user is not blacklisted.");
        }
        const exists = users.find((u) => u.user === member.id);
        if (!exists) {
          return message.channel.send("This user is not blacklisted.");
        }

        await Blacklisted.findOneAndDelete({ user: member.id });
        return message.channel.send("User has been successfully whitelisted.");

        break;
      }
      default: {
        return message.channel.send(`Please provide a type and a user.\nUsage: \`${prefix}blacklist [add | remove | view] <user>\``);
      }
    }
   
  }
}
