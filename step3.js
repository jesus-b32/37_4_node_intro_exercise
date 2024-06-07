//importing file system and process modules
const fs = require('fs');
const process = require('process');
const axios = require('axios');

//write to file if out given. Otherwise print.
function writeOrPrint(content, output) {
    if (output) {
        fs.writeFile(output, content, 'utf8', function(err) {
            if (err) {
                console.error(`Error trying to write to ${output}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(content);
    }
}


function cat (path, output) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.log(`Error trying to read ${path}: ${err}`);
            process.exit(1);
        } else {
            writeOrPrint(data, output);
        }
    })
}

async function webCat (url, output) {
    try {
        const response = await axios.get(url);
        writeOrPrint(response.data, output);
    } catch (err) {
        console.log(`Error getting ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let output;

if (process.argv[2] === '--out') {
    output = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path, output);
} else {
    cat(path, output);
}