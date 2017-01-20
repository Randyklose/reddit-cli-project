var inquirer = require("inquirer");
//const imageToAscii = require("image-to-ascii");
const bluebird = require("bluebird")
const imageToAscii = bluebird.promisify(require("image-to-ascii"));
var requestPromise = require('request-promise');

//Displays the post only by the 4 values we are interested in.
function displayList(array) {
    return array.map(function(x) {
        return {
            username: x.data.author,
            url: x.data.url,
            votes: x.data.ups,
            title: x.data.title,
            permalink:x.data.permalink
        };
    });
}

//Ask the user which subreddit he would like to access
function askQuestion() {
    return inquirer.prompt({
        Type: "input",
        name: 'subreddits',
        message: "Which subreddit would you like to see???",
        default: "toronto"
    })
    .then(function(answer) {
        return answer.subreddits;
    });
}

// Ask the user to select a subreddit he would like to access
function askSubreddits(array) {
   
  return inquirer.prompt({
  type: 'list',
  name: 'subreddits',
  message: 'Which subbreddit would you like to see???',
  choices: array
})
.then(x=>x.subreddits);
}

// modifies the initial array into an array of only the names
function subRedditList(array) {
    return array.map(function(x) {
        return {
            name:x.data.display_name
        };
    })
}

//organize the posts by title and the value is the whole post info
function organizeByTtile(array) {
    return array.map(function(x) {
        return {
            name: x.title,
            value: x
        }
    })
}

// lists all the titles of the posts
function chooseTitle(array) {
    return inquirer.prompt({
            type: 'list',
            name: 'title',
            message: 'Which post would you like to see???',
            choices: array
        })
       
}

// if the url of the post is a picture, then it will load it to the console.
function loadImage(url) {
    
    return imageToAscii(url,{size_options: {screen_size:{width:40, height:40
    }}});
    
}

// If its an image asciify it if not then reurn same value as before

function asciify(val) {
    var url = val.title.url;
    if (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif")) {
        return loadImage(url);
    }
    else {
        return val;
    }
}

function getUrl(val) {
    var url = "https://www.reddit.com" + val.title.permalink + ".json";
    console.log(url)
    return requestPromise(url);
}

function parseUrl(result) {
        console.log(result)
        return JSON.parse(result);
}



function retrieveComments(array) {
   return  array.map(value) {
        return {
            username:
            comment:
            
        }
    }
}








module.exports= {
    displayList: displayList,
    askQuestion: askQuestion,
    subRedditList: subRedditList,
    askSubreddits: askSubreddits,
    chooseTitle: chooseTitle,
    organizeByTtile: organizeByTtile,
    loadImage: loadImage,
    asciify: asciify,
    getUrl: getUrl,
    parseUrl: parseUrl,
    retrieveComments: retrieveComments
}