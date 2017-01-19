var requestPromise = require('request-promise');

/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage() {
  return requestPromise("https://www.reddit.com/.json")
    .then(function(result) {
      var redditHomepage = JSON.parse(result);
      return redditHomepage.data.children;
    });
  // Load reddit.com/.json and call back with the array of posts
}
// getHomepage()
// .then(function(result) {
//   console.log(result);
// })
// .catch(function(err) {
//   console.log("There was an error".err);
// }) 
/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  return requestPromise("reddit.com/" + sortingMethod + ".json")
    .then(function(result) {
      var redditByCategory = JSON.parse(result);
      return redditByCategory.data.children;
    });
}
// getSortedHomepage()
// .then(function(result) {
//   console.log(result);
// })
// .catch(function(err) {
//   console.log("There was an error".err);
// }) 

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  return requestPromise("reddit.com/r/" + subreddit + ".json")
    .then(function(result) {
        var subRedditFrontpage = JSON.parse(result);
        return subRedditFrontpage.data.children;
      });
}

      /*
      This function should "return" the posts on the front page of a subreddit as an array of objects.
      In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
      */
function getSortedSubreddit(subreddit, sortingMethod) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  return requestPromise("reddit.com/r/" + subreddit + sortingMethod + ".json")
    .then(function(result) {
        var subRedditSortedFrontpage = JSON.parse(result);
        return subRedditSortedFrontpage.data.children;
      });
}

      /*
            This function should "return" all the popular subreddits
            */
function getSubreddits() {
        // Load reddit.com/subreddits.json and call back with an array of subreddits
    return requestPromise("reddit.com/subreddits.json")
    .then(function(result) {
      var subreddits = JSON.parse(result);
      return subreddits.data.children;
    });
        
      }

      // Export the API
module.exports = {
  getHomepage: getHomepage,
  getSortedHomepage: getSortedHomepage,
  getSubreddit: getSubreddit,
  getSortedSubreddit: getSortedSubreddit,
  getSubreddits: getSubreddits
};
