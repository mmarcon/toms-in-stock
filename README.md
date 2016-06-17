# TOMS in stock

Checks TOMS website for shoes availability.

In the last couple of weeks I have been trying to buy a pair of [TOMS shoes](http://toms.com), but [the ones I want](http://www.shoptoms.de/navy-linen-rope-sole-mens-classics) are not available in my size. They were available again for a few hours, and then they disappeared while I was trying to buy them.

I thought I'd automate the process of checking when they become available again, so here is a convenient node module to do so.

## How to use it

	$ npm install -g toms-in-stock
	$ toms-in-stock --help
	Usage: toms-in-stock <slug> [-c "country"] [-s "size"]

	Commands:
	  slug  Slug of the webpage for the shoe model to check
	
	Options:
	  -c, --country  Set the country where you want to buy the shoes 
	                 [choices: "germany", "us", "canada", "uk",
	                 "netherlands", "france"] [default: "germany"]
	  -s, --size     Set the size you need  [default: "44"]
	  --help         Show help  [boolean]
	  
	Examples:
  	  toms-in-stock navy-linen-rope-sole-mens-classics -c germany -s 44
  	  Checks if Navy Linen Rope Men's Classics are available in Germany in size 44
