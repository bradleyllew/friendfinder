// LOAD DATA
// We are linking our routes to a series of "data" sources.

// this links to the friends array
var friends = require("../data/friends.js");



module.exports = function (app) {
    // this gets the data from the friends json
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        //    
        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        // this is to take the score and convert to string
    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;

    var b = userScores.map(function(item) {
        return parseInt(item, 10);
    });

    userData = {
        name: req.body.name,
        photo: req.body.photo,
        scores: b
    };

    console.log("User Name: " + userName);
    console.log("User Scores: " + userScores);

    var sum = b.reduce((a, b) => a + b, 0)
    console.log("User Total Score: " + sum);
    console.log("Best Match Freind Difference " + bestMatch.friendDifference);

    // loops through to find differences in scores for each friend
    for(var i = 0; i < friends.length; i++) {
        console.log(friends[i].name);
        totalDifference = 0;
        console.log("Total Difference " + totalDifference);
        console.log("Best Match Freind Difference " + bestMatch.friendDifference);
   
        var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
        console.log("Total Score " + bfriendScore);
        totalDifference += Math.abs(sum - bfriendScore);
        console.log("Total Difference is " + totalDifference);
    
    // determines the best match for friend
        if (totalDifference <= bestMatch.friendDifference) {
            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference = totalDifference;
        }

        console.log("Total Difference is " + totalDifference);
     }

     console.log(bestMatch);
    //  to add to the array
     friends.push(userData);
     console.log("New User Added");
     console.log(userData);
     res.json(bestMatch);
    });










};

