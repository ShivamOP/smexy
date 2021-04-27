


module.exports = {
  name: "jumble",
  aliases: [],
  async run(bot,message,args) {
var randomWords = require('random-words');
const { ShuffleGuess } = require('weky')
const game = new ShuffleGuess({
    message: message,
    word: randomWords(),
    winMessage: `${message.author.toString()}, you won :)`
})
game.start()
  }
}
