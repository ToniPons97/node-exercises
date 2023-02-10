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

const getResults = async (player) => luckyDraw(player).then(value => value).catch(err => err);

console.log(await getResults('Tina'));
console.log(await getResults('Jorge'));
console.log(await getResults('Julien'));