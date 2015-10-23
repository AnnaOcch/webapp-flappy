// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var labelscore;
var player;
var pipes = [];

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("sprite", "../assets/balloons.png");
    game.load.image("bg", "../assets/pipe_green.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe", "../assets/pipe_pink.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene

    var bg =game.add.image(0,0,"bg");
    bg.width = 790;
    bg.height = 400;
    game.stage.setBackgroundColor("#CC0066");

    player =game.add.sprite(50, 100, "sprite");
    player.scale.x = 0.5;
    player.scale.y = 0.5;
    game.physics.arcade.enable(player);
    player.body.velocity.x = 30;
    player.body.velocity.y = 80;
    player.body.gravity.y = 100;
    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    //game.add.text(20, 20, "Welcome!", {font: "50px Arial", fill: "#FFFFFF"});
    var myname = "Annalisa";
    mycat = "Bianca";
    var myage = 26;
    increased_age = myage + 1;


    //console.log(myname, myage, increased_age, mycat);
    //console.log(myname.length, myage.toExponential);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    var pipeInterval = 1.75;
    game.time.events.loop(pipeInterval*Phaser.Timer.SECOND,generatePipe);
    //generatePipe();
    labelscore = game.add.text(600,20,"0", {fill:"#FFFFFF" });
    player.x = 100;
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
game.physics.arcade.overlap(player,pipes,gameOver);

    text = game.add.text(20, 20, "Welcome!", {font: "20px Arial", fill: "#FFFFFF"});

}

function gameOver(){
    location.reload();
}

function playerJump(){
    player.body.velocity.y = -100;
}



function clickHandler(event) {
    //alert("The position is: "+ event.x +" ," + event.y );
    game.add.sprite(event.x, event.y, "sprite");
}

function spaceHandler(){
    game.sound.play("score");
}

function changeScore(){
    score = score + 1;
    labelscore.setText(score.toString());
}

function moveRight(){
    player.x = player.x + 10;
}

function moveUp(){
    player.y = player.y - 10;
}

function moveDown(){
    player.y = player.y + 10;
}

function generatePipe(){
   var gapStart = game.rnd.integerInRange(1,5);
for(var count = 0; count < 8; count++) {
    if(count!=gapStart && count != gapStart + 1) {
        //game.add.sprite(100, 50 * count, "pipe");
        addPipeBlock(750, count*50);
    }

}
    changeScore();
}

function addPipeBlock(x,y){
    var pipeblock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeblock);
    game.physics.arcade.enable(pipeblock);
    pipeblock.body.velocity.x = -200;
}