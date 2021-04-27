const math = require('mathjs');
const Discord = require('discord.js');
module.exports = {
    name: "calculate",
    aliases: ["calc",], 
    async run(bot, message, args){
       
        if(!args[0]) return message.channel.send('Please provide a math question.');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('ERROR: Invalid question.')
        }
        const mess = await message.channel.send("Calculating...")
      setTimeout(() => {
          const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Calculator')
        .addField('Question', `\`\`\`php\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`php\n${resp}\`\`\``)

        message.channel.send(embed);
      mess.delete()
      }, 900)

    }
}