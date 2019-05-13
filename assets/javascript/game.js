var w = 0; 
var l = 0;
var values = []; // Gem values
var game = setupGame(); // Jump to L6

function setupGame() { 
    var game = { 
        wins: w,
        losses: l,
        round: randomNumber() // Jump to L30
    };

    // Gem values
    for (i = 0; i < 4; i++) { 
        values.push(Math.floor(Math.random() * 7) + 1) // Random: 1-7
    };
    
    // Print gem + value on page
    for (var i = 0; i < 4; i++) {
        $('#gems').prepend('<div class="c"><img src="assets/images/gem' + i + '.png" /><p>' + game.round.gem[i] + '</p></div>')
    }; 

    // Show game value on page
    $('#goal').text(game.round.number)

    return game
};

// Generate a random number to act as game value
function randomNumber() {
    var round = { 
        number: Math.floor(Math.random() * 40) + 10, // Random: 10-50
        gem: values, 
        score: 0
    }; 
    return round
};

// Check if the player has won
function hasWon(score) { 
    if(score === game.round.number) { 
        w++ // Increase win count
        alert('Nice job! You found the correct gem combination for ' + game.round.number + '.' )
        resetGame() // Jump to L60
    } else {
        hasLost(score) // Jump to L50
    };  
};

function hasLost(score) {
    if(score > game.round.number) { 
        l++ // increase loss count
        alert(score + ' is greater than ' + game.round.number + '. Let\'s try this again.')
        resetGame() // Jump to L59
    };
};

// Reset the game once won or lost
function resetGame() {
    values = []; // Clear old gem values
    game.round.score = 0; // Set player score to 0
    $('.c').detach(); // Clear old gems on page
    game = setupGame(); // Create new round (Jump to L6)

    // Update page
    $('#score').empty().text(game.round.score)
    $('#goal').empty().text(game.round.number)  
    $('#wins').empty().text('Wins: ' + w) 
    $('#losses').empty().text('Losses: ' + l) 
};

// Click listener
$('#gems').on('click', '.c', function() { 
    // On click update player score
    game.round.score = parseInt(game.round.score) + parseInt($(this).text())
    // Update player score on page
    $('#score').html(game.round.score)
    // Check if the player has won with their last guess
    hasWon(game.round.score)
});

// Hide the instructions when start-game button is clicked
$('#start-game').on('click', function(){
    $('#dim').css("display", "none")
})