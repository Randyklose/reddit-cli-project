var reddit = require("./reddit");
var inquirer = require("inquirer-promise");
var reusableFun = require("./reusablefun");

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
        return reddit.getSubreddit();
    }
    else if(answer.menu === 'SUBREDDITS') {
        return reddit.getSubreddits();
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
