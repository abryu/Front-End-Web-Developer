var availableEnemyY = [60,140,220];
var availableEnemyX = [-100,-200,-300,-400,-500];
var availableGem = ['images/Gem Orange.png','images/Gem Blue.png','images/Gem Green.png'];
var availableRole = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
var finalScore = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = availableEnemyX[Math.floor(Math.random() * availableEnemyX.length)];
    this.y = availableEnemyY[Math.floor(Math.random() * availableEnemyY.length)];
    this.speed = Math.round(Math.random() * 101 + 40);
    //console.log("ENEMY CONSTRUCTOR " + this.x, this.y, this.speed);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x > 505) {
        this.x = availableEnemyX[Math.floor(Math.random() * availableEnemyX.length)];
        this.y = availableEnemyY[Math.floor(Math.random() * availableEnemyY.length)];
        this.speed = Math.round(Math.random() * 101 + 10);
        //console.log("NEW ENEMY CONSTRUCTOR " + this.x, this.y, this.speed);
    }

    collisionDetection(this);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
    this.updateForKey = false;
    this.finalScore = 0;
    //console.log('NEW PLAYER CONSTRUCTOR ' + this.x, this.y, this.finalScore);
};

Player.prototype.update = function(variableX,variableY) {
    if(this.updateForKey == true) {
        this.x = this.x + variableX;
        this.y = this.y + variableY;
        console.log('PLAYER UPDATED');
        this.updateForKey = false;
    }
}

Player.prototype.render = function() {
    //console.log('PLAYER DRAW ' + this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
    console.log('RESET');
}

Player.prototype.handleInput = function(keys) {
    switch(keys) {
        case 'up':
            if(this.y > 101) {
                //this.y -= 90;
                this.updateForKey = true;
                this.update(0,-90);
                console.log('up ' + this.x, this.y);
        } else {
            this.finalScore += 20;
            console.log('SCORE!' + this.finalScore);
            player.reset();
            }
            break;
         case 'down':
            if(this.y < 375) {
                //this.y += 90;
                this.updateForKey = true;
                this.update(0,90);
                console.log('down ' + this.x, this.y);
            }
            break;
        case 'left':
            if(this.x > 40) {
                //this.x -= 100;
                this.updateForKey = true;
                this.update(-100,0);
                console.log('left ' + this.x, this.y);
            }
            break;
        case 'right':
            if(this.x < 400) {
                //this.x += 100;
                this.updateForKey = true;
                this.update(100,0);
                console.log('right ' + this.x, this.y);
            }
            break;
        case 'KeyQ':
            this.roleChanger('images/char-boy.png');
            break;
        case 'KeyW':
            this.roleChanger('images/char-cat-girl.png');
            break;
        case 'KeyE':
            this.roleChanger('images/char-horn-girl.png');
            break;
        case 'KeyR':           
            this.roleChanger('images/char-pink-girl.png');
            break;
        case 'KeyT':
            this.roleChanger('images/char-princess-girl.png');
            break;
        default:
            return;
    }
};
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

var player = new Player(202,404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        81: 'KeyQ',
        87: 'KeyW',
        69: 'KeyE',
        82: 'KeyR',
        84: 'KeyT'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var collisionDetection = function(enemyPosition) {
    if((enemyPosition.x - player.x < 100 && enemyPosition.y - player.y < 72)
        && (enemyPosition.x - player.x > -100 && enemyPosition.y - player.y > -72)) {
        player.finalScore = 0;
        console.log('COLLISION!' + player.finalScore);
        player.reset();
    }
}

var myVar=setInterval(function(){myTimer()},1000);

function myTimer() {
    var d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
}

var Gem = function() {
    var gemSelector = availableGem[Math.floor(Math.random() * availableGem.length)];
    this.sprite = gemSelector;
    this.x = Math.floor(Math.random() * 4 + 1) * 101;
    this.y = Math.floor(Math.random() * 5 + 1) * 70;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log('GEM DRAW ' + this.x, this.y);
    gemCollisionDetection(this);
}

var gem = new Gem();

var gemCollisionDetection = function(gemPosition) {
    if((gemPosition.x - player.x < 100 && gemPosition.y - player.y < 50)
        && (gemPosition.x - player.x > -100 && gemPosition.y - player.y > -50)) {
        player.finalScore += 7;
        console.log('COLLECTION!' + player.finalScore);
        gem = new Gem();
    }
}

Player.prototype.roleChanger = function(roleImage) {
    this.sprite = roleImage;
}

