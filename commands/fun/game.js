const koenie06games = require('koenie06-games')

const TicTacToe = new koenie06games.TicTacToe()
const ConnectFour = new koenie06games.ConnectFour()
const HangMan = new koenie06games.HangMan()
const SnakeGame = new koenie06games.SnakeGame()
const FastTyper = new koenie06games.FastTyper()
const guessTheNumber = new koenie06games.GuessTheNumber()
const RockPaperScissors = new koenie06games.RockPaperScissors()

module.exports = {
    name: 'guess-number',
    aliases: ['guessnumber'],
    description: 'Play bunch of games with other people',
    category: 'games',
    usage: 'game <gamename>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(bot, message, args) =>{

      
            guessTheNumber.newGame(message)

        


    }
}

