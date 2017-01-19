
function displayList(array) {
    return array.map(function(x) {
        return {
            username: x.data.username,
            url: x.data.url,
            votes: x.data.votes,
            title: x.data.title
        }
    });
}






module.exports= {
    displayList: displayList
}