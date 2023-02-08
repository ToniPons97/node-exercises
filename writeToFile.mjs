import { writeFile } from 'node:fs';

writeFile('./output.txt', 'How cool is the fs module?!', err => {
    if (err) {
        console.error('There was an error.');
        return;
    }
    console.log('Done writing to file.');
});