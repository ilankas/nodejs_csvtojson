/*

npm i --save csvtojson 

usage: 
node csvtojson.js
*/

const fs   = require('fs')
const path = require('path')
const csv  = require('csvtojson')

const convertFile = (inputFile, outputFile) => {
    let buff = []

	csv()
	.fromFile(inputFile)
	.on('json',(jsonObj, rowIndex) => {
		// combine csv header row and csv line to a json object
		buff.push(jsonObj)
	}) 
		
	.on('done',(error) => {
		if(error) {
			return console.log(error);
		}

		fs.writeFile(outputFile, JSON.stringify(buff, null, 4), 'utf8', function(error) {
			if(error) {
				return console.log(error);
			}
		}) 
		console.log('File converted.')
	})

	
} // convertFile()


if (process.argv[2]) {
	csvFilePath = process.argv[2]
} else {
	csvFilePath  = path.join(__dirname, 'data', 'customer-data.csv')
}
if (process.argv[3]) {
   jsonFilePath = process.argv[3]
} else {
   jsonFilePath = path.join(path.dirname(csvFilePath), 'customer-data.json')
}

//console.log(csvFilePath)
//console.log(jsonFilePath)
convertFile(csvFilePath, jsonFilePath)