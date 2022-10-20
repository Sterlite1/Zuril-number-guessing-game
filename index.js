const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const prompt = (query) => new Promise((resolve) => rl.question(`${query} >>> `, resolve));

// declare Player object
const player = {
  level: 1,
  point: 0,
  name: '',
  isGameOn: true
}
// promise based random number generator
function randonNum(range) {
  return Promise.resolve(Math.floor(Math.random() * range) + 1)
}

async function guess(max = 2) {
  let isCorrect = false
  const correctNum = await randonNum(max)

  while (!isCorrect) {
    const input = await prompt(`please enter your guess between 1 - ${max}`)
    const playerGuess = parseInt(input)

    // check for Non Numeric inputs
    if (Number.isNaN(playerGuess)) {
      if (/exit/i.test(input)) {
        return player.isGameOn = false
      }
      continue
    }
    // check if guess was correct
    if (playerGuess === correctNum) {
      isCorrect = true
      player.level = player.level + 1
      player.point = player.point + 1
      console.log(`\n${player.name}, you got the number correct, the correct number is ${correctNum}`)
    }
       else if (playerGuess > correctNum) {
        console.log(`\n${player.name}, Your guess is too High! please try again...`)
       }
      else 
  
        console.log(`\n${player.name}, Your guess is too low, please try again...`)
     }
  }
    

      // IIFE -> Run immediately on execution
      (async () => {
        try {
          console.log('Enter "exit" in the prompt or use Ctrl + C, to quit\n')

          // prompt user for input
          const userName = await prompt('please enter your name: ')
          const user = /\S/.test(userName) ? userName : "Player"

          // set player name
          player.name = user

          console.log(`\nWelcome ${player.name}!`)

          while (player.isGameOn) {
            console.log(`\n${player.name}, you are playing level \n${player.level}, Point ${player.point}\n`)
            await guess(player.level + 1), (player.point + 1)
          }

          rl.close()
        } catch (error) {
          console.error("Unable to prompt", error);
        }
      })()

      // 
      rl.on('close', () => {
        console.log(`\nGame Over\n${player.name}, you reached level ${player.level}\n`)
        process.exit(0)
      }
      );
