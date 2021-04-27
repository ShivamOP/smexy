const Discord = require('discord.js')
const ms = require("ms")
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
async function pagify(message, timeout, pages) {
 
const bot = message.client;
    if (!(message instanceof Discord.Message)) throw new TypeError("First parameter must be a type of <discord.js>.Message");
if(!Array.isArray(pages)) throw new TypeError("Third parameter must be an array");
    pages = Array.isArray(pages) ? pages : []
    if(!pages.every(m => m instanceof Discord.MessageEmbed)
    ) throw new TypeError("Every element of  parameter 'pages' were not an instance of '<discord.js>.MessageEmbed");
    
    if(pages.length === 0) throw new TypeError("Pages were not provided.");
    
    let page = 0,
        reactions =
            pages.length > 1
                ? ["⏪", "◀️", "⏹️", "▶️",  "⏩"]
                : ["⏹️"],
        mainMessage = await message.channel.send(
  `${pages.length > 1
                ? `Page **${page + 1}/${pages.length}**`  : ""}`,
            pages[page]
        );
   reactions.forEach(async r => { 
     await mainMessage.react(r)
   });
  mainMessage.react("#️⃣")

    let collector = mainMessage.createReactionCollector(
        (reaction, user) =>
            (reactions.some(r => r === reaction.emoji.name) || reaction.emoji.name === '#️⃣') &&
            user.id === message.author.id,
        {
            time: timeout
        }
    );
    collector.on("collect", async (reaction, user) => {
mainMessage.reactions.resolve(reaction.emoji.name).users.remove(user.id).catch(err => {});
        switch (reaction.emoji.name) {
            case "⏪":
                if (page === 0) return;
                page = 0;
                break;
            case "◀️":
                if (page === 0) {
                    page = page.length - 1;
                } else {
                    page--;
                }
                break;
            case "⏹️":
           
            await mainMessage.reactions.removeAll();
                return collector.stop();
                break;
            case "▶️":
                if (page === pages.length - 1) {
                    page = 0;
                } else {
                    page++;
                }
                break;
            case "⏩":
                if (page === pages.length - 1) return;
                page = pages.length - 1;
                break;
            case "#️⃣":
           
                let m = await message.channel.send("What page do you wish to go to?");
                let collected = await m.channel.awaitMessages(
                    response => message.content,
                    {
                        max: 1,
                        errors: ["time"]
                    }
                );
                try {
                    m.delete();
                    let content = parseInt(collected.first().content);
                    if (content && content > 0 && content <= pages.length)
                        page = content - 1;
                } catch (err) {
                    console.log(err.message);
                    m.delete();
                }

                break;
        }
        await mainMessage.edit(
            `${pages.length > 1
                ? `Page ${page + 1}/${pages.length}`
                       : ""
            }`,
           {
                    embed: pages[page]
                }
        );
    })


}

module.exports = pagify;