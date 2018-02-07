var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');


//Morgan
var logger = require('morgan');
app.use(logger('dev'));

//Setting static folder
app.use(express.static('public'));

//Mongoose 
mongoose.connect('mongodb://heroku_ggt69sc8:lkdpgg6v606amtgd5i1ci0g1ks@ds129018.mlab.com:29018/heroku_ggt69sc8');
var db = mongoose.connection;

db.on('error', function(err){
  console.log("MG Error: ", err);
});
db.once('open', function(){
  console.log("DB connection successful.");
});

//Handlebars
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


var Comment = require('./models/comment.js');
var Content = require("./models/content.js");

app.get('/', function(req, res){
  request('https://www.reddit.com/r/LeagueOfLegends/', function(err, res, html){
    var $ = cheerio.load(html);
    var result = [];
    $("p.title").each(function(i, element){
      var title = $(this).text();
      var link = $(element).children().attr('href');

      //New Content
      var pageContent = new Content({
        title : title,
        link : link
      });

      //Save to DB
      pageContent.save(function(err, dbContent){
        if (err){
          console.log(err);
        }
        else{
          console.log(dbContent);
        }
      });
    });
  res.sendFile(process.cwd() + "/index.html")
  });
});

app.listen(3000, function(){
  console.log('Connected to', 3000);
});