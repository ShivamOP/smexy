
const { MessageEmbed } = require('discord.js');

module.exports = {

    name: "emojis",
    desc: "Shows a list of cmds or info about a specific command.",
    aliases: [],
        async run(bot, message, args, prefix) {
      const emojiArray = [];
        const content = args.slice(1).join(" ");
        const emojiFinderRegex = /(<:).*?(>)/gi;

        if (emojiFinderRegex.test(content)) {
            const occurrences = content.match(emojiFinderRegex);
            let continues = true;

            for (var i = 0; i < occurrences.length; i++) {
                const e = message.guild.emojis.cache.get(occurrences[i].replace(/<:.*:/gi, "").replace(">", ""));

                if (!e) continue;

                if (emojiArray) {
                    for (var j = 0; j < emojiArray.length; j++) {
                        if (emojiArray[j].name === e.name) {
                            continues = false;
                            break;
                        }
                    }
                }

                if (continues == false) {
                    continues = true;
                    continue;
                }

                emojiArray.push({
                    emoji: e.url,
                    name: e.name
                });
                continues = true;
            }
        } else {
            await message.guild.emojis.cache.each(emoji => {
                emojiArray.push({
                    emoji: emoji.url,
                    name: emoji.name
                });
            });
        }

        if (emojiArray.length < 1) return message.channel.send("Couldn't find any emojis, sorry!");


        let pageI = 0;

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(emojiArray[pageI].name)
            .setURL(emojiArray[pageI].emoji)
            .setFooter(`Emoji 1 of ${emojiArray.length} | Try ${prefix}emojis-list`)
            .setImage(emojiArray[pageI].emoji);

        
        const msg = await message.channel.send(embed);

        for (const emoji of ["⏮️", "◀️", "⏹️", "▶️" ,"⏭️"]) {
            await msg.react(emoji);
        }

        const Filter = (reaction, user) => ["⏮️", "◀️", "⏹️", "▶️" ,"⏭️"].includes(reaction.emoji.name) & user.id === message.author.id;

        const collector = msg.createReactionCollector(Filter, {
            time: 300000
        });

        collector.on('collect', async r => {
            await r.users.remove(message.author).catch(e => console.log(e));

            if (r.emoji.name === "◀️") {
                if (pageI === 0) pageI = emojiArray.length - 1;
                else pageI--;
            } else if (r.emoji.name === "▶️") {
                if (pageI === emojiArray.length - 1) pageI = 0;
                else pageI++;
            } else if(r.emoji.name === "⏮️") {
         pageI = 0;
           } else if(r.emoji.name === "⏭️") {
           pageI = emojiArray.length - 1;
           ;
            } else {
                await collector.stop();
                msg.reactions.removeAll().catch(error => console.log(error));
                return;
            }


            embed.setImage(emojiArray[pageI].emoji)
                .setFooter(`Emoji ${pageI + 1} of ${emojiArray.length} | Try ${prefix}emojis-list`)
                .setURL(emojiArray[pageI].emoji)
                .setTitle(emojiArray[pageI].name);

            await msg.edit(embed).catch(e => console.log(e));
        });

        collector.on('end', async (r) => {
            if (msg.deleted === true || !r || r === null || r === undefined || !msg) {
                await collector.stop().catch(error => console.log(error));
            msg.reactions.removeAll().catch(error => console.log(error));
        }});

    
}
}
