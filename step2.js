//importing file system and process modules
const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat (path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.log(`Error trying to read ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat (url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.log(`Error getting ${url}: ${err}`);
        process.exit(1);
    }
}

// process.argv[2] would be file text or url in: node step2.js (url or text file)
let path = process.argv[2];

if (path.slice(0,4) === 'http') {
    webCat(path);
} else {
    cat(path);
}