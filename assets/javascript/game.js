
var w = 0; 
var l = 0;
var values = [];
var game = setupGame();

// start game
function setupGame() { 
    var game = { 
        wins: w,
        losses: l,
        round: randomNumber()
    };

    // generate random game values
    for (i = 0; i < 4; i++) { 
        if (values.length < 4) {
            values.push(Math.floor(Math.random() * 7) + 1) // Random number btwn 1 and 7
        };
    };
    
    // print gem images
    for (var i = 0; i < 4; i++) {
        $('#gems').prepend('<div class="c"><img src="assets/images/gem' + i + '.png" /><p>' + game.round.gem[i] + '</p></div>')
    }; 

    $('#goal').text(game.round.number)

    return game
};

// create a random number generator 
function randomNumber() {
    var round = { 
        number: Math.floor(Math.random() * 40) + 10, // random number btwn 10 and 50
        gem: values, 
        score: 0
    }; 
    return round
};

function hasWon(score) { 
    if(score === game.round.number) { 
        // increase win count
        w++ 
        // alert if won
        alert('Winner')
        // reset game
        resetGame()
    } else {
        // if score is not equal to the number chosen, then run hasLost
        hasLost(score)
    };  
};

function hasLost(score) {
    if(score > game.round.number) { 
        // increase loss count
        l++
        // alert if lost
        alert('Loser')
        // reset game
        resetGame()
    };
};

function resetGame() {
    values = [];
    game.round.score = 0;
    $('.c').detach();
    game = setupGame();

    $('#score').empty().text(game.round.score)
    $('#goal').empty().text(game.round.number)  
    $('#wins').empty().text('Wins: ' + w) 
    $('#losses').empty().text('Losses: ' + l) 
};

$('#gems').on('click', '.c', function() { 
    console.log($('.c'))
    // On click update score
    game.round.score = parseInt(game.round.score) + parseInt($(this).text())
    // Print score on page
    $('#score').html(game.round.score)
    // Check if the user has won with their last guess
    hasWon(game.round.score)
});