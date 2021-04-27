const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = async (bot) => {
 
 

    const s1 = { activity: { name: '>help', type: 'LISTENING' }, status: 'online' };
    const s2 = { activity: { name: `${bot.guilds.cache.size} Servers.`, type: 'WATCHING' }, status: 'online' };
    const s3 = { activity: { name: '>invite', type: 'PLAYING' }, status: 'online' };
    const sstatus = [
        s1,
        s2,
        s3
    ]
    const rstatus = Math.floor(Math.random() * sstatus.length);
   setInterval(async () => {
        await bot.user.setPresence(sstatus[rstatus])
    }, 12000)


    console.log(`Logged in as ${bot.user.tag}!`);

}
