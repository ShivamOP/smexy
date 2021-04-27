module.exports = {
  name: 'say',
  description: 'The say Command',
  aliases: [], 
  async run(bot, message, args) {
    
    if (!args.join(' ')) {
      return message.channel.send(`Please give a text to say`);
    }
    
    message.channel.send(args.join(' '));
    
  }
}