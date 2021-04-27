


const db = require("quick.db")
module.exports = {
  name: "leavemessage",
  aliases: [],
    usage: "<message/text>",
desc: "To set the leave message",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
  async run(bot, message, args, prefix) {
   if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You need \`ADMINISTRATOR\` permission to use this command") 
    if (!args.length) {
            return message.channel.send({
                embed: {
                    title: 'Leave Message',
                    description: `When a user leaves the server the leave message is sent in the leave channel.

> **Variables**
> \`{member:tag}\` - The member's tag (full username including discriminator)
> \`{member:username}\` - The member's username
> \`{member.discriminator}\` - The member's discriminator
                    > \`{member:mention\` - The member's mention
                    > \`{member:id}\` - The member's id
> \`{member:avatar}\` - The member's avatar
                    > \`{member:createdAt}\` - When the member made account
> \`{member.joinedAt}\` - When the member joined this server
             > \`{server:name}\` - The server's name
> \`{server:id}\` - The server's id
                    > \`{server:members}\` - The server's membercount
> \`{server:icon}\` - The server's icon
 > \`{date}\` - Returns current date      
   `,
                    fields: [{
                        name: 'Set Leave Message',
                        value: `\`${prefix}leavemessage \<leaveMsg\>\``,
                        inline: true
                    }, {
                        name: 'Default Value',
                        value: '😢 {member:name} just left the server... We are down to {server:members} members... '
                    }, {
                        name: 'Current Value',
                        value: `${db.fetch(`leavemsg_${message.guild.id}`)}
                    `}],
                    color: "BLUE"
                }
            })
        }
        let newJoinMessage = args.join(" ")
        db.fetch(`leavemsg_${message.guild.id}`)
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({
            embed: {
                title: "Missing Permissions"
            }
        })
        let joinMsg = args.join(" ")
        db.set(`leavemsg_${message.guild.id}`, joinMsg)
        await message.channel.send({
            embed: {
                title: "Success!",
                color: "GREEN",
                description: `Leave message has been set to: 
${joinMsg}

If you want to preview it, please type \`${prefix}goodbye\``
            }
        })
  }
}