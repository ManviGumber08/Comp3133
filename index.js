const fs = require('fs');
const csv = require('csv-parser');

// File paths
const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

// Step 3a: Delete canada.txt and usa.txt if they exist
if (fs.existsSync(canadaFile)) {
    fs.unlinkSync(canadaFile);
    console.log(`${canadaFile} deleted`);
}

if (fs.existsSync(usaFile)) {
    fs.unlinkSync(usaFile);
    console.log(`${usaFile} deleted`);
}

// Step 3b & 3c: Read and filter data
fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        if (row.country.toLowerCase() === 'canada') {
            fs.appendFileSync(canadaFile, `${row.country},${row.year},${row.population}\n`);
        } else if (row.country.toLowerCase() === 'united states') {
            fs.appendFileSync(usaFile, `${row.country},${row.year},${row.population}\n`);
        }
    })
    .on('end', () => {
        console.log('CSV processing completed.');
        console.log('Filtered data written to canada.txt and usa.txt.');
    });
