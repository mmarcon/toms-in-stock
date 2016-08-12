#!/usr/bin/env node

'use strict';

const request = require('request');
const cheerio = require('cheerio');
const url = require('url');
const chalk = require('chalk');
const debug = require('debug')('toms');
const yargs = require('yargs');
const ora = require('ora');
const logUpdate = require('log-update');

const config = require('./config.json');

const argv = yargs
    .wrap(null)
    .usage('Usage: $0 <slug> [-c "country"] [-s "size"]')
    .command('slug', 'Slug of the webpage for the shoe model to check', { alias: 'slug' })
    .demand(1, 'slug is required')
    .option('c', {
        alias: 'country',
        demand: false,
        default: 'germany',
        describe: 'Set the country where you want to buy the shoes',
        choices: Object.keys(config)
    })
    .option('s', { alias: 'size', demand: false, default: '44', describe: 'Set the size you need' })
    .example('$0 navy-linen-rope-sole-mens-classics -c germany -s 44',
        'Checks if Navy Linen Rope Men\'s Classics are available in Germany in size 44')
    .help()
    .argv;

const slug = argv._[0];
const country = argv.country;
const size = argv.size;

const tomsUrl = url.resolve(config[country].baseUrl, slug);

const spinner = ora();
spinner.color = 'white';

if (process.stdout.isTTY) {
    setInterval(() => {
        const pre = '\n\n  ' + spinner.frame();
        logUpdate(chalk.white.dim(`${pre} Checking TOMS...\n\n`));
    }, 50);
}

function exit(text, color) {
    if(process.stdout.isTTY) {
        logUpdate(`\n\n     ${chalk[color](text)}\n\n`);    
    } else {
        console.log(text);
    }
    process.exit();
}

debug(`Requesting ${tomsUrl}...`);

request(tomsUrl, function(error, response, body) {
    if (error) {
        return console.error(error);
    }

    debug(`Parsing page`);

    const $ = cheerio.load(body);
    const sizeEntry = $('select#product-size option').map(function() {
            return $(this).text().trim();
        })
        .get()
        .map(s => debug(s) || s)
        .filter(s => Number(s.split(' ')[0]) === size)
        .shift();

    if (!sizeEntry) {
        exit('Size not found', 'yellow');
    }

    if (/out of stock/i.test(sizeEntry)) {
        exit('Out of stock', 'red');
    } else {
        exit('Available', 'green');
    }
});
