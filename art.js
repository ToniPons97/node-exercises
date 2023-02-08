const figlet = require('figlet');

figlet('Toni Pons', (err, data) => {
    if (err) {
        console.error('Something went wrong.');
        return;
    }
    console.log(data);
});