// note this server syays system is bugged xd


onst db = require("quick.db")

module.exports = async(bot) => {

bot.on('ready', () => {

setInterval(async() => {
  
bot.guilds.cache.forEach(async g => {
  const perms = ["MANAGE_GUILD", "MANAGE_CHANNELS", "BAN_MEMBERS"];
 
  if(g.me.permissions.has(perms)) {
    
const message = {
  guild: g
}
const result = [
`members`, 
`humans`, 
`bots`, 
`channels`, 
`category`, 
`text`, 
`voice`, 
`boosts`, 
`tier`, 
`roles`, 
`bans`, 
`online`, 
`offline`, 
`dnd`, 
`idle`, 
`emojis`,
`static`, 
`animated`
]

const get = (text) => {
 return g.channels.cache.get(text)
};


const cat = db.get(`stats_${g.id}`);
if(!cat || cat === null || !get(cat)) return;
let members = db.get(`stats_${g.id}_members`)
if(members !== null && get(members)) {
  g.channels.cache.get(members).setName(`Members: ${g.memberCount}`, "Server Stats System") 
}

let humans = db.get(`stats_${g.id}_humans`)
if(humans !== null && get(humans) && get(humans).name !== `Humans: ${g.members.cache.filter(m => !m.user.bot).size}`) g.channels.cache.get(humans).setName(`Humans: ${g.members.cache.filter(m => !m.user.bot).size}`, "Server Stats System") 

 let bots = db.get(`stats_${g.id}_bots`)
if(bots !== null && get(bots)) g.channels.cache.get(bots).setName(`Bots: ${g.members.cache.filter(m => m.user.bot).size}`, "Server Stats System") 

let channels = db.get(`stats_${g.id}_channels`)
if(channels !== null && get(channels)) g.channels.cache.get(channels).setName(`Channels: ${g.channels.cache.size}`, "Server Stats System") 

let category = db.get(`stats_${g.id}_category`)
if(category !== null && get(category)) g.channels.cache.get(members).setName(`Category: ${g.channels.cache.filter(c => c.type === 'category').size}`, "Server Stats System") 

let text = db.get(`stats_${g.id}_text`)
if(text !== null && get(text)) g.channels.cache.get(text).setName(`Text Channel: ${g.channels.cache.filter(c => c.type !== "category" && c.type !== "voice").size}`, "Server Stats System") 

let voice = db.get(`stats_${g.id}_voice`)
if(voice !== null && get(voice)) g.channels.cache.get(voice).setName(`Voice Channels: ${g.channels.cache.filter(c => c.type === "voice").size}`, "Server Stats System") 
const b = await g.fetchBans();
let bans = db.get(`stats_${g.id}_bans`)
if(bans !== null && get(voice)) g.channels.cache.get(bans).setName(`Bans: ${b.size}`, "Server Stats System") 

let roles = db.get(`stats_${g.id}_roles`)
if(roles !== null && get(roles)) g.channels.cache.get(roles).setName(`Roles: ${message.guild.roles.cache.size}`, "Server Stats System") 

let boosts = db.get(`stats_${g.id}_boosts`)
if(boosts !== null && get(boosts)) g.channels.cache.get(boosts).setName(`Boosts: ${g.premiumSubscriptionCount}`, "Server Stats System") 

let tier = db.get(`stats_${g.id}_tier`)
if(tier !== null && get(tier)) g.channels.cache.get(tier).setName(`Tier: ${g.premiumTier}`, "Server Stats System") 

let emojis = db.get(`stats_${g.id}_emojis`)
if(emojis !== null && get(emojis)) g.channels.cache.get(emojis).setName(`Emojs: ${g.emojis.cache.size}`, "Server Stats System") 


let static = db.get(`stats_${g.id}_static`)
if(static !== null && get(static)) g.channels.cache.get(static).setName(`Static: ${g.emojis.cache.filter(e => !e.animated).size}`, "Server Stats System")

let animated = db.get(`stats_${g.id}_animated`)
if(animated !== null && get(animated)) g.channels.cache.get(animated).setName(`Animated: ${g.emojis.cache.filter(e => e.animated).size}`, "Server Stats System") 

let online = db.get(`stats_${g.id}_online`) 
if(online !== null && get(online)) g.channels.cache.get(online).setName(`Online: ${g.members.cache.filter(m => m.user.presence.status === "online").size}`, "Server Stats System")

let offline = db.get(`stats_${g.id}_offline`)
if(offline !== null && get(offline)) g.channels.cache.get(offline).setName(`Offline: ${g.members.cache.filter(m => m.user.presence.status === "offline").size}`, "Server Stats System")

let dnd = db.get(`stats_${g.id}_dnd`) 
if(dnd !== null && get(dnd)) g.channels.cache.get(dnd).setName(`DND: ${g.members.cache.filter(m => m.user.presence.status === "dnd").size}`, "Server Stats System")

let idle = db.get(`stats_${g.id}_idle`)
if(idle !== null && get(idle)) g.channels.cache.get(idle).setName(`Idle: ${g.members.cache.filter(m => m.user.presence.status === "idle").size}`, "Server Stats System")

}
}) 
}, 15 * 60000 * 1000) 
})
}
