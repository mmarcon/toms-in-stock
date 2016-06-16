const request = require('request');
const cheerio = require('cheerio');
const url = require('url');
const chalk = require('chalk');
const debug = require('debug')('toms');

const config = require('./config.json');

const country = process.argv[2];
const slug = process.argv[3];
const size = process.argv[4];

const tomsUrl = url.resolve(config[country].baseUrl, slug);

debug(`Requesting ${tomsUrl}...`);

request(tomsUrl, function(error, response, body){
	if(error) {
		return console.error(error);
	}
	
	debug(`Parsing page`);
	
	const $ = cheerio.load(body);
	const sizeEntry = $('select#product-size option').map(function(){
		return $(this).text().trim();
	})
	.get()
	.filter((s) => s.split(' ')[0] === size)
	.shift();

	if(!sizeEntry) {
		return console.log(`${chalk.bgYellow(' ')} ${chalk.yellow('Size not found')}`);
	}

	if(/out of stock/i.test(sizeEntry)) {
		console.log(`${chalk.bgRed(' ')} ${chalk.red('Out of stock')}`);
	} else {
		console.log(`${chalk.bgGreen(' ')} ${chalk.green('Available')}`);
	}
});