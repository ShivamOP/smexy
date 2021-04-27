require('dotenv').config();
console.clear();
///////////////////////////////////////////////////////////////
/////////////////////// DISCORD. JS /////////////////////////
/////////////////////////////////////////////////////////////

// CONST KA JUNGLE LOL

const Discord = require('discord.js');
const inlinereply = require('discord-reply');
const bot = new Discord.Client({
fetchAllMembers: true, 
ocean: "lodu",
	disableMentions: 'everyone',
	autoReconnect: true,
	partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'USER']
});
require("discord-buttons")(bot)
  const fs = require('fs');
const mongoose = require('mongoose');
const { GiveawaysManager } = require('discord-giveaways');


bot.commands = new Discord.Collection();
bot.snipes = new Map();
bot.queue = new Map();
bot.levels = require("./utils/levels.js");
bot.giveaways = new GiveawaysManager(bot, {
	hasGuildMembersIntent: true,
	storage: './giveaways.json',
	updateCountdownEvery: 5000,
	default: {
		embedColor: '#ff0000',
		// embedColorEnd: '#00ffff',
		reaction: '🎉',
		botsCanWin: true
	}
});
require('./utils/giveaway.js')(bot);

// LOGIN AND HOSTING XD
const keepAlive = require('./Alive.js');
keepAlive();
bot.login(process.env.TOKEN).catch(err => console.error(err));

// MONGOOSE
mongoose
	.connect(
		process.env.MONGOURL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true
		}
	)
	.then(() => console.log(`Connected To MongoDB ✅`))
.catch(err => console.log(`Not Connected To MongoDB ❎`))

// Utils
require('./utils/serverstats.js')(bot);
require('./utils/functions.js')(bot);

console.log('Loaded Utils!');

// COMMAND handler
let length = 0;
const mainfolder = fs.readdirSync('./commands/');
for (const mainfiles of mainfolder) {
	const mainfolders = fs
		.readdirSync(`./commands/${mainfiles}/`)
		.filter(file => file.endsWith('.js'));

	for (const commands of mainfolders) {
		length += 1;
		const command = require(`./commands/${mainfiles}/${commands}`);
		bot.commands.set(command.name, command);
	}
}
console.log(`Loaded ${length} Commands!`);

// EVENT HANDLER
fs.readdir('./events/', (err, files) => {
	if (err) return console.error();
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(`./events/${file}`);
		let eventname = file.split('.')[0];
		bot.on(eventname, event.bind(null, bot));
	});
	console.log(`Loaded ${files.length} Events !`);
});


// EXTRA

bot.on("ready", () => {

const channel = bot.channels.cache.get("824506829043531786");
const { inspect } = require('util');



process.on('unhandledRejection', error =>
	console.error('Unhandled Rejection:', error)
);

process.on('uncaughtExceptionMonitor', error => {
	console.error('Uncaught Exception Montitor:', error);
});

process.on('uncaughtException', (err, origin) => {
	console.error(`Error: ${err}\nType: ${origin}`);
	channel.send(
		`UncaughtException\nError:\n\`\`\`\n${inspect(err, {
			depth: 0
		})}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`
	);
});

process.on('warning', warn => {
	console.warn('Warning:', warn);
	channel.send(
		`Warning\nWarn:\n\`\`\`\n${warn.name}\n${warn.message}\n\n${
			warn.stack
		}\n\`\`\``
	);
});

process.on('unhandledRejection', (reason, promise) => {
	channel.send(
		`UnhandledRejection\nReason:\n\`\`\`\n${inspect(reason, {
			depth: 0
		})}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``
	);
});

})
