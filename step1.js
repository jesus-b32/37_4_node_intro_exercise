const fs = require('fs');

function cat (path) {
    fs.readFile(path, 'uft8', function(err, data) {
        if(err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    })
}