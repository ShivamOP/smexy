const Discord = require("discord.js");

module.exports = {
  name: "contact",
  desc: "Shows a list of cmds or info about a specific command.",
  aliases: [],
      async run(bot, message, args) {


    

    let Sender = message.author;
    const sayMessage = args.join(" ");
    if(!sayMessage) { message.delete()
    return message.channel.send("Please give us the reason for contacting.").then(msg => {msg.delete({timeout: 10000})});
    }
    const channel = message.guild.channels.cache.find(c => c.type === "text" && c.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE"));
if(!channel) return;
const invite = await channel.createInvite({temporary: false, maxAge: '0', maxUses: '0', unique: false, reason: 'FOR SECURITY REASONS: '+`${message.author.tag} (${message.author.id})`})


   let contact = new Discord.MessageEmbed()
   .setColor("00ff00")
   .setThumbnail(Sender.displayAvatarURL({dynamic: true}))
   .setURL(invite.url)
   .setTitle("Contact")
   .addField("User",`${Sender.tag} (ID:${Sender.id})`)
   .addField("Server", `${message.guild.name} (ID:${message.guild.id})`) 
   .addField("Message: ", sayMessage)
   .setTimestamp()

   // message.channel.send(invite.url, contact);

    let embd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(message.author.tag)
   .setURL("https://discord.gg/CaCTEJkfZA")    .setThumbnail(message.author.displayAvatarURL({dynamic: true})) 
    .setDescription(`Your contact message has been sent to my support server-\n${sayMessage}`)
    .setFooter("Thanks you for contacting with the Smexy bot support!")

  const c = bot.channels.cache.get("824625688366546947");
    c.send(contact);
    message.channel.send(embd)
    .then(msg => {msg.delete({timeout: 10000})})
        message.delete();

      }
      }