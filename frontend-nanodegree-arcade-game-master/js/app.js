var availableEnemyY = [60,140,220];
var availableEnemyX = [-100,-200,-300,-400,-500];
var availableGem = ['images/Gem Orange.png','images/Gem Blue.png','images/Gem Green.png'];
var availableRole = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
var finalScore = 0;
var starHide = true;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = availableEnemyX[Math.floor(Math.random() * availableEnemyX.length)];
    this.y = availableEnemyY[Math.floor(Math.random() * availableEnemyY.length)];
    this.speed = Math.round(Math.random() * 101 + 40);
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
};

Player.prototype.update = function(variableX,variableY) {
    if(this.updateForKey == true) {
        this.x = this.x + variableX;
        this.y = this.y + variableY;
        this.updateForKey = false;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
}

Player.prototype.handleInput = function(keys) {
    switch(keys) {
        case 'up':
            if(this.y > 101) {
                this.updateForKey = true;
                this.update(0,-90);
                console.log('up ' + this.x, this.y);
        } else {
            this.finalScore += 20;
            player.reset();
            }
            break;
         case 'down':
            if(this.y < 375) {
                this.updateForKey = true;
                this.update(0,90);
                console.log('down ' + this.x, this.y);
            }
            break;
        case 'left':
            if(this.x > 40) {
                this.updateForKey = true;
                this.update(-100,0);
                console.log('left ' + this.x, this.y);
            }
            break;
        case 'right':
            if(this.x < 400) {
                this.updateForKey = true;
                this.update(100,0);
                console.log('right ' + this.x, this.y);
            }
            break;
        case 'KeyQ':
            this.roleChanger(availableRole[0]);
            break;
        case 'KeyW':
            this.roleChanger(availableRole[1]);
            break;
        case 'KeyE':
            this.roleChanger(availableRole[2]);
            break;
        case 'KeyR':           
            this.roleChanger(availableRole[3]);
            break;
        case 'KeyT':
            this.roleChanger(availableRole[4]);
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
        81: 'KeyQ',//Adding key listener.
        87: 'KeyW',//So users can select characters
        69: 'KeyE',//while playing.
        82: 'KeyR',//
        84: 'KeyT' //
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var collisionDetection = function(enemyPosition) {
    if((enemyPosition.x - player.x < 80 && enemyPosition.y - player.y < 60)
        && (enemyPosition.x - player.x > -80 && enemyPosition.y - player.y > -60)) {
        player.finalScore = 0;
        player.reset();
    }
}

///////////////////////////////////////Function Of Gem Part////////////////////////////////////
//Randomly generate a gem
//User collect it will add 3 points and a new gem generated immediately

var Gem = function() {
    var gemSelector = availableGem[Math.floor(Math.random() * availableGem.length)];
    this.sprite = gemSelector;
    this.x = Math.floor(Math.random() * 4 + 1) * 101;
    this.y = Math.floor(Math.random() * 5 + 1) * 70;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    gemCollisionDetection(this);
}

var gem = new Gem();

var gemCollisionDetection = function(gemPosition) {
    if((gemPosition.x - player.x < 80 && gemPosition.y - player.y < 60)
        && (gemPosition.x - player.x > -80 && gemPosition.y - player.y > -60)) {
        player.finalScore += 3;
        gem = new Gem();
    }
}

//////////////////////////////////////Function Of Character Switch Part/////////////////////////

Player.prototype.roleChanger = function(roleImage) {
    this.sprite = roleImage;
}

//////////////////////////////////////Function Of Star Part///////////////////////////////////////////
//A star will automatically generated 10 seconds and adding 19 points to user's score

var Star = function() {
    //Setting star cannot be seen, initially
    this.x = -200;
    this.y = -200;
    this.sprite = 'images/Star.png';
    this.starHide = true;
}

Star.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        starCollisionDetection(this);
}

var starCollisionDetection = function(starPosition) {
    if((starPosition.x - player.x < 80 && starPosition.y - player.y < 60)
        && (starPosition.x - player.x > -80 && starPosition.y - player.y > -60)) {
        player.finalScore += 19;
        star.changeStatus();//Setting star can be seen and generate it's location
        star = new Star();//Generating a new star, cannot be seen.
        var starTimer = setInterval(function(){star.changeStatus()}, 10000);
    }
}

var star = new Star();
var starTimer = setInterval(function(){star.changeStatus() }, 10000);
        
Star.prototype.changeStatus = function() {
        this.starHide = false;
        this.x = Math.floor(Math.random() * 4 + 1) * 101;
        this.y = Math.floor(Math.random() * 5 + 1) * 70;
}
