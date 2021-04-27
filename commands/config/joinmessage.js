


const db = require("quick.db")
module.exports = {
  name: "joinmessage",
  aliases: [],
  usage: "<message/text>",
desc: "To set the join message",
userPerms: ["ADMINISTRATOR"],
botPerms: [],
  async run(bot, message, args, prefix) {
   if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You need \`ADMINISTRATOR\` permission to use this command") 
    if (!args.length) {
  
           return message.channel.send({
                embed: {
                    title: 'Join Message',
                    description: `When a user joins the server the join message is sent in the join channel.

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
                        name: 'Set Join Message',
                        value: `\`${prefix}joinmessage \<joinMsg\>\``,
                        inline: true
                    }, {
                        name: 'Default Value',
                        value: 'Welcome {member:mention}! We now have {server:members} member!'
                    }, {
                        name: 'Current Value',
                        value: `${db.fetch(`joinmsg_${message.guild.id}`)}
                    `}],
                    color: "BLUE"
                }
            })
        }
        let newJoinMessage = args.join(" ")
        db.fetch(`joinmsg_${message.guild.id}`)
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({
            embed: {
                title: "Missing Permissions"
            }
        })
        let joinMsg = args.join(" ")
    
     
     
        db.set(`joinmsg_${message.guild.id}`, joinMsg)
        await message.channel.send({
            embed: {
                title: "Success!",
                color: "GREEN",
                description: `Join message has been set to: 
${joinMsg}

If you want to preview it, please type \`${prefix}welcome\``
            }
        })
  }
}