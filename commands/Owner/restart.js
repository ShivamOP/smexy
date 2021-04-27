const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "restart",
  aliases: ["reload"], 
  desc: "A command to restart the bot.", 
  owner: true, 
  botperms: ["EMBED_LINKS"], 
  userperms: [], 
  async run(bot, message, args) {
                        await message.channel.send({
                            embed: {
                         author: {name: 'Are you sure that you want me to restart?' },
                                color: 'YELLOW'
                            }
                        }).then(async m => {
                            await m.react('✅')
                            await m.react('❌')

                            const filter = (reaction, user) => {
                                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                            };

                            m.awaitReactions(filter, {
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(async collected => {
                                const reaction = collected.first();

                                if (reaction.emoji.name === '✅') {
          await m.delete()                  
                                    await message.channel.send("Restarting the bot........... This may take a while, So please wait.").then((n) => {
bot.destroy()
setTimeout(() => {
  require("dotenv").config;
	bot.login(process.env.TOKEN)
	n.edit(":white_check_mark: **|** Successfully Restarted.")
	}, 50000)
})
                                } else {
await m.delete()  
await message.delete() 
await message.channel.send(" Command Cancelled.").then(msg => { return msg.delete({timeout: 500})
}) 

                                    }

}) 
}) 

}
}

