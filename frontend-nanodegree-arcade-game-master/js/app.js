var availableEnemyY = [60,140,220];
var availableEnemyX = [-101,-202,-303,-404,-505];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = availableEnemyX[Math.floor(Math.random() * availableEnemyX.length)];
    this.y = availableEnemyY[Math.floor(Math.random() * availableEnemyY.length)];
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.round(Math.random() * 101);
    console.log("ENEMY " + this.x, this.y, this.speed);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x > 505) {
        this.x = Math.round(Math.random() * -404);
    }

    collisionDetection(this);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //console.log("ENEMY Draw " + this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var collisionDetection = function(enemyPosition) {
    if((enemyPosition.x - player.x < 101 && enemyPosition.y - player.y < 101) && 
        (enemyPosition.x - player.x > -101 && enemyPosition.y - player.y > -101)) {
        player.reset();
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    console.log("Player " + this.x,this.y);
};

Player.prototype.update = function(variableX,variableY) {
    //console.log("Player Update " + this.x,this.y);
    this.x += variableX;
    this.y += variableY;
}

Player.prototype.render = function() {
    //console.log("Player Draw " + this.x,this.y);
    //console.log(this);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
}

Player.prototype.handleInput = function(keys) {
    switch(keys) {
        case 'up' :
            if(this.y > 101) {
                this.y -= 101;
                //player.update(0,-101);
            } else {
                player.reset();
            }
            break;
        case 'down' :
            if(this.y < 404) {
                this.y += 101;
               //player.update(0,101);
            }
            break;
        case 'left' :
            if(this.x > 101) {
                this.x -= 101;
                //player.update(-101,0);
            }
            break;
        case 'right' :
            if(this.x < 404) {
                this.x += 101;
                //player.update(101,0);
            }
            break;
        default:
            return;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemy1 = new Enemy();
allEnemies.push(enemy1);
var enemy2 = new Enemy();
allEnemies.push(enemy2);
var enemy3 = new Enemy();
allEnemies.push(enemy3);
var enemy4 = new Enemy();
allEnemies.push(enemy4);
var enemy5 = new Enemy();
allEnemies.push(enemy5);
var enemy6 = new Enemy();
allEnemies.push(enemy6);

var player = new Player(202,404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
