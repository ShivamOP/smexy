const Discord = require('discord.js');

module.exports = {
    name: "color",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: ['colour', 'hex'],
        async run(bot, message, args) {
const Canvas = require('canvas')

const axios = require('axios')
    let color;
    if (message.mentions.members.first()) {
        color = message.mentions.members.first().displayHexColor
    } else if (args[0]) {
       if(/(#|0x)([0-9A-F]{6})/i.test(args[0])) {
           color = args[0].match(/(#|0x)([0-9A-F]{6})/i)[2]
       } else{
           message.channel.send('Make sure its hex | Example: #FF0000 | 0xFF0000')
           return
       }
    } else {
        color = message.member.displayHexColor 
    }
    try {
        message.channel.startTyping()
    const aa = color.replace('#','','0x','')
    const colour = await axios.get(`https://www.thecolorapi.com/scheme?hex=${aa}`)
    const embed = new Discord.MessageEmbed()
    .setColor(`0x${colour.data.seed.hex.value}`)
    .setDescription(`\`HEX: ${colour.data.seed.hex.value} RGB: ${colour.data.seed.rgb.value}\``)
    .setTitle('Color')
    .setURL(`https://api.alexflipnote.dev/color/image/${color}`)

    .setImage(`https://api.alexflipnote.dev/color/image/gradient/${color}`)
    .setThumbnail(`https://www.thecolorapi.com/id?format=svg&hex=${color}`)
    message.channel.send(embed)
} catch {
    message.channel.send('Oops something happened!')
} finally {
    message.channel.stopTyping()
}
}
}
