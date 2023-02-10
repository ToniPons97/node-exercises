import chalk from 'chalk';

function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
}

const getResults = async (player) => {
    try {
        const draw = await luckyDraw(player);
        console.log(chalk.bgGreen(draw));
    } catch (e) {
        console.error(chalk.bgRed(e));
    }
}

getResults('Tina');
getResults('Jorge');
getResults('Julien');