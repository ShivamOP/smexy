module.exports = {
  name: "fasttype",
  aliases: ["fast-type"],
  async run(bot,message,args) {
const txtgen = require('txtgen')
const { FastType } = require('weky')
const game = new FastType({
    message: message,
    winMessage: `${message.author.toString()}, you won :)`,
    sentence: txtgen.sentence(), //sentence-to-be-typed
    loseMessage: `${message.author.toString()}, you lost :(`,
    time: 60000, //time that user has to type in ms
    startMessage: 'Good Luck!' //message sent when user starts playing
})
game.start()
  }
}