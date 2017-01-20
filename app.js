var reddit = require("./reddit");
var inquirer = require("inquirer");
var reusableFun = require("./reusablefun");
var imageToAscii = require("image-to-ascii");

function initialMenu(){

var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'},
  {name: 'Show Sorted Homepage', value: 'SORTEDHOMEPAGE'},
  {name: 'Show Sorted Subredits', value: 'SORTEDSUBREDDITS'}
];

inquirer.prompt({
  type: 'list',
  name: 'menu',
  message: 'What do you want to do?',
  choices: menuChoices
}).then(
  function(answer) {
     
    if(answer.menu === 'HOMEPAGE') {
        return reddit.getHomepage()
        .then(reusableFun.displayList);
    }
    else if(answer.menu === 'SUBREDDIT') {
        return reusableFun.askQuestion()
        .then(reddit.getSubreddit)
        .then(reusableFun.displayList)
        .then(reusableFun.organizeByTtile)
        .then(reusableFun.chooseTitle)
        .then(reusableFun.getUrl)
        .then(reusableFun.parseUrl)
        
        }
        
    else if(answer.menu === 'SUBREDDITS') {
        return reddit.getSubreddits()
        .then(reusableFun.subRedditList)
        .then(reusableFun.askSubreddits)
        .then(reddit.getSubreddit)
        .then(reusableFun.displayList)
        .then(reusableFun.organizeByTtile)
        .then(reusableFun.chooseTitle)
        .then(reusableFun.asciify)
        
    }
    else if(answer.menu === 'SORTEDHOMEPAGE') {
        return reddit.getSortedHomepage();
    }
    else if(answer.menu === 'SORTEDSUBREDDITS') {
        return reddit.getSortedSubreddit();
    }
  }
)
.then(function(result) {
    console.log(result)
})
.then(initialMenu)
.catch(function(err) {
    console.log("There was an error",err);
})

}

initialMenu();
