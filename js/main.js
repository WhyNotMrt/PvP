// Hero

function Hero(game, x, y, hero ,side, nbr){
	Phaser.Sprite.call(this, game, x, y, hero);
	this.anchor.set(0.5, 0.5);
	this.game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.animations.add('stop', [0]);
	this.animations.add('run', [1,2], 8, true);
	this.animations.add('jump', [3]);
	this.animations.add('fall', [4]);
	this.body.enable;
	this.Weapon = new Weapon(game, side);
	this.Weapon.pistol(game, side);
	this.Weapon.track(this);
	this.direction = 0;
	this.nbr = nbr;
	this.spawnPointX = x; 
	this.spawnPointY = y; 
}
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.move = function(direction){
	const SPEED = 200;
	this.body.velocity.x = direction * SPEED;
	if(this.body.velocity.x < 0){
		this.scale.x = -1;
	}else if(this.body.velocity.x > 0){
		this.scale.x = 1;
	}
};
Hero.prototype.jump = function(){
	const JUMP_SPEED = 600;
	let canJump = this.body.touching.down;
	
	if(canJump){
		this.body.velocity.y = -JUMP_SPEED;
	}
	return canJump;
};
Hero.prototype.bounce = function(){
	const BOUNCE_SPEED = 200;
	this.body.velocity.y = -BOUNCE_SPEED;
}
Hero.prototype._getAnimationName = function(){
	let name = 'stop';
	if(this.body.velocity.y < 0){
		name = 'jump';
	}else if(this.body.velocity.y >= 0 && !this.body.touching.down){
		name = 'fall';
	}else if(this.body.velocity.x !==0 && this.body.touching.down){
		name = 'run';
	}
	return name;
};
Hero.prototype.update = function(){
	let animationName = this._getAnimationName();
	if(this.animations.name !== animationName){
		this.animations.play(animationName);
	}
};

// Spider

function Spider(game, x, y){
	Phaser.Sprite.call(this, game, x, y, 'spider');
	this.anchor.set(0.5);
	this.animations.add('crawl', [0, 1, 2], 8, true);
	this.animations.add('die', [0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
	this.animations.play('crawl');
	this.game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.velocity.x = Spider.SPEED;
}
Spider.SPEED = 100;
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;
Spider.prototype.update = function(){
	if(this.body.touching.right || this.body.blocked.right){
		this.body.velocity.x = -Spider.SPEED;
	}else if(this.body.touching.left || this.body.blocked.left){
		this.body.velocity.x = Spider.SPEED;
	}
};
Spider.prototype.die = function(){
	this.body.enable = false;
	this.animations.play('die').onComplete.addOnce(function(){this.kill();}, this);
};

// Weapons

function Weapon(game, side){
	this.type = 'null';
}
Weapon.prototype.constructor = Weapon;
Weapon.prototype.pistol = function(game, side){
	this.weapon = game.add.weapon(30, 'bullet');
	this.weapon.bulletKillDistance = 400;
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
	this.weapon.bulletSpeed = 400;
	this.weapon.fireRate = 600;
	this.weapon.bulletGravity.y = -1200;
	this.weapon.fireAngle = side;
	
	this.bullets = this.weapon.bullets;
	this.type = 'pistol';
};
Weapon.prototype.minigun = function(game, side){
	this.weapon = game.add.weapon(30, 'bullet');
	this.weapon.bulletKillDistance = 300;
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
	this.weapon.bulletSpeed = 400;
	this.weapon.fireRate = 150;
	this.weapon.bulletGravity.y = -1200;
	this.weapon.fireAngle = side;
	this.weapon.bulletAngleVariance = 8;
	
	this.bullets = this.weapon.bullets;
	this.type = 'minigun';
};
Weapon.prototype.sniper = function(game, side){
	this.weapon = game.add.weapon(30, 'bullet');
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.bulletSpeed = 1200;
	this.weapon.fireRate = 1400;
	this.weapon.bulletGravity.y = -1200;
	this.weapon.fireAngle = side;
	
	this.bullets = this.weapon.bullets;
	this.type = 'sniper';
};
Weapon.prototype.shotgun = function(game, side){
	this.weapon = game.add.weapon(30, 'bullet');
	this.weapon.bulletKillDistance = 200;
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
	this.weapon.bulletSpeed = 600;
	this.weapon.fireRate = 1000;
	this.weapon.bulletGravity.y = -1200;
	this.weapon.fireAngle = side;
	
	this.weapon1 = game.add.weapon(30, 'bullet');
	this.weapon1.bulletKillDistance = 200;
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
	this.weapon1.bulletSpeed = 600;
	this.weapon1.fireRate = 1000;
	this.weapon1.bulletGravity.y = -1200;
	this.weapon1.fireAngle = side+5;
	
	this.weapon2 = game.add.weapon(30, 'bullet');
	this.weapon2.bulletKillDistance = 200;
	this.weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon2.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
	this.weapon2.bulletSpeed = 600;
	this.weapon2.fireRate = 1000;
	this.weapon2.bulletGravity.y = -1200;
	this.weapon2.fireAngle = side+10;
	
	this.weapon3 = game.add.weapon(30, 'bullet');
	this.weapon3.bulletKillDistance = 200;
	this.weapon3.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon3.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
	this.weapon3.bulletSpeed = 600;
	this.weapon3.fireRate = 1000;
	this.weapon3.bulletGravity.y = -1200;
	this.weapon3.fireAngle = side-5;
	
	this.weapon4 = game.add.weapon(30, 'bullet');
	this.weapon4.bulletKillDistance = 200;
	this.weapon4.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon4.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
	this.weapon4.bulletSpeed = 600;
	this.weapon4.fireRate = 1000;
	this.weapon4.bulletGravity.y = -1200;
	this.weapon4.fireAngle = side-10;
	
	this.bullets = [this.weapon.bullets, this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets, this.weapon4.bullets];
	this.type = 'shotgun';
};
Weapon.prototype.fire = function(hero){
	this.weapon.fire();
	if(this.type == 'shotgun'){
		this.weapon1.fire();
		this.weapon2.fire();
		this.weapon3.fire();
		this.weapon4.fire();			
	}
};
Weapon.prototype.track = function(player){
	this.weapon.trackSprite(player, 0, 0);
	if(this.type == 'shotgun'){
		this.weapon1.trackSprite(player, 0, 0);
		this.weapon2.trackSprite(player, 0, 0);
		this.weapon3.trackSprite(player, 0, 0);
		this.weapon4.trackSprite(player, 0, 0);
	}
};
Weapon.prototype.side = function(side){
	this.weapon.fireAngle = side;
	if(this.type == 'shotgun'){
		this.weapon1.fireAngle = side+5;
		this.weapon2.fireAngle = side+10;
		this.weapon3.fireAngle = side-5;
		this.weapon4.fireAngle = side-10;
	}
};

// Init Game

PlayState = {};
const LEVEL_COUNT = 4;
PlayState.init = function(data){
	this.game.renderer.renderSession.roundPixels = true;
	this.keys = this.game.input.keyboard.addKeys({
		left: Phaser.KeyCode.LEFT,
		right: Phaser.KeyCode.RIGHT,
		up: Phaser.KeyCode.UP,
		zero: Phaser.KeyCode.NUMPAD_0,
		
		z: Phaser.KeyCode.Z,
		q: Phaser.KeyCode.Q,
		d: Phaser.KeyCode.D,
		space: Phaser.KeyCode.SPACEBAR,
	});
	
	this.coinPickupCount = 0;
	this.deathHero1 = 0;
	this.deathHero2 = 0;
	this.hasKey = false;
	this.level = (data.level || 0) % LEVEL_COUNT;
};
PlayState.preload = function(){
	this.game.load.json('level:3', 'data/level03.json');
	this.game.load.json('level:2', 'data/level02.json');
	this.game.load.json('level:1', 'data/level01.json');
	this.game.load.json('level:0', 'data/level00.json');
	this.game.load.image('background', 'images/background.png');
	this.game.load.image('ground', 'images/ground.png');
	this.game.load.image('grass:8x1', 'images/grass_8x1.png');
	this.game.load.image('grass:6x1', 'images/grass_6x1.png');
	this.game.load.image('grass:4x1', 'images/grass_4x1.png');
	this.game.load.image('grass:2x1', 'images/grass_2x1.png');
	this.game.load.image('grass:1x1', 'images/grass_1x1.png');
	this.game.load.image('icon:coin', 'images/coin_icon.png');
	this.game.load.image('font:numbers', 'images/numbers.png');
	this.game.load.image('invisible-wall', 'images/invisible_wall.png');
	this.game.load.image('key', 'images/key.png');
	this.game.load.image('pistol', 'images/pistol.png');
	this.game.load.audio('sfx:jump', 'audio/jump.wav');
	this.game.load.audio('sfx:coin', 'audio/coin.wav');
	this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
	this.game.load.audio('sfx:door', 'audio/door.wav');
	this.game.load.audio('sfx:key', 'audio/key.wav');
	this.game.load.spritesheet('spider', 'images/spider.png', 42, 32);
	this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
	this.game.load.spritesheet('hero', 'images/hero.png', 36, 42);
	this.game.load.spritesheet('hero2', 'images/hero2.png', 36, 42);
	this.game.load.spritesheet('door', 'images/door.png', 42, 66);
	this.game.load.spritesheet('icon:key', 'images/key_icon.png', 34, 30);
	this.game.load.spritesheet('rifles', 'images/rifles.png', 96, 48);
	this.game.load.image('bullet', 'images/bullet11.png')
};
PlayState.create = function(){
	this.game.add.image(0, 0, 'background');
	this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));
	this.sfx = {
		jump: this.game.add.audio('sfx:jump'),
		coin: this.game.add.audio('sfx:coin'),
		stomp: this.game.add.audio('sfx:stomp'),
		door: this.game.add.audio('sfx:door'),
		key: this.game.add.audio('sfx:key')
	};
	this._createHud();
	this.game.input.gamepad.start();
	this.pad1 = this.game.input.gamepad.pad1;
	this.pad2 = this.game.input.gamepad.pad2;
};
PlayState._createHud = function(){
	const NUMBERS_STR = '0123456789X';
	
	// Key
	this.keyIcon = this.game.make.image(0, 19, 'icon:key');
	this.keyIcon.anchor.set(0, 0.5);
	
	// Coin
	this.coinFont = this.game.add.retroFont('font:numbers', 20, 26, NUMBERS_STR, 6);
	let coinIcon = this.game.make.image(this.keyIcon.width + 7, 0, 'icon:coin');
	let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width, coinIcon.height/2, this.coinFont);
	coinScoreImg.anchor.set(0, 0.5);
	
	// Death 1
	this.hero1Icon = this.game.make.sprite(840, 19, 'hero', 0);
	this.hero1Icon.anchor.set(0, 0.5);
	
	this.deathFont1 = this.game.add.retroFont('font:numbers', 20, 26, NUMBERS_STR, 6);
	let deathScore1 = this.game.make.image(880, 19, this.deathFont1);
	deathScore1.anchor.set(0, 0.5);
	
	// Death 2
	this.hero2Icon = this.game.make.sprite(840, 70, 'hero2', 0);
	this.hero2Icon.anchor.set(0, 0.5);
	
	this.deathFont2 = this.game.add.retroFont('font:numbers', 20, 26, NUMBERS_STR, 6);
	let deathScore2 = this.game.make.image(880, 70, this.deathFont2);
	deathScore2.anchor.set(0, 0.5);
	
	// Display
	this.hud = this.game.add.group();
	this.hud.add(coinIcon);
	this.hud.position.set(10, 10);
	
	this.hud.add(coinScoreImg);
	this.hud.add(deathScore1);
	this.hud.add(deathScore2);
	
	this.hud.add(this.keyIcon);
	this.hud.add(this.hero1Icon);
	this.hud.add(this.hero2Icon);
};
PlayState._loadLevel = function(data){
	this.bgDecoration = this.game.add.group();
	this.platforms = this.game.add.group();
	this.coins = this.game.add.group();
	this.weapons = this.game.add.group();
	this.spiders = this.game.add.group();
	this.enemyWalls = this.game.add.group();
	this.enemyWalls.visible = false;
	data.platforms.forEach(this._spawnPlatform, this);
	this._spawnCharacters({hero: data.hero, spiders: data.spiders});
	data.coins.forEach(this._spawnCoin, this);
	this._spawnPistol(data.pistol.x, data.pistol.y);
	this._spawnShotgun(data.shotgun.x, data.shotgun.y);
	this._spawnSniper(data.sniper.x, data.sniper.y);
	this._spawnMinigun(data.minigun.x, data.minigun.y);
	this._spawnDoor(data.door.x, data.door.y);
	this._spawnKey(data.key.x, data.key.y);	
	const GRAVITY = 1200;
	this.game.physics.arcade.gravity.y = GRAVITY;
};
PlayState._spawnPlatform = function(platform){
	let sprite = this.platforms.create(platform.x, platform.y, platform.image);
	this.game.physics.enable(sprite);
	sprite.body.allowGravity = false;
	sprite.body.immovable = true;
	this._spawnEnemyWall(platform.x, platform.y, 'left');
	this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
};
PlayState._spawnCharacters = function(data){
	data.spiders.forEach(function(spider){
		let sprite = new Spider(this.game, spider.x, spider.y);
		this.spiders.add(sprite);
	}, this);
	this.hero2 = new Hero(this.game, data.hero.x+940, data.hero.y, 'hero2', -180, 1);
	this.game.add.existing(this.hero2);	
	this.hero = new Hero(this.game, data.hero.x, data.hero.y, 'hero', 0, 2);
	this.game.add.existing(this.hero);
};
PlayState._spawnPistol = function(x, y){
	this.pistol = this.weapons.create(x, y, 'pistol');
	this.pistol.anchor.set(0.5, 0.5);
	this.game.physics.enable(this.pistol);
	this.pistol.body.allowGravity = false;	
	this.pistol.y -=3;
	this.game.add.tween(this.pistol)
		.to({y: this.pistol.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
		.yoyo(true)
		.loop()
		.start();
};
PlayState._spawnSniper = function(x, y){
	this.sniper = this.weapons.create(x, y, 'rifles');
	this.sniper.anchor.set(0.5, 0.5);
	this.sniper.animations.add('sniper', [2]);
	this.sniper.animations.play('sniper');
	this.game.physics.enable(this.sniper);
	this.sniper.body.allowGravity = false;	
	this.sniper.y -=3;
	this.game.add.tween(this.sniper)
		.to({y: this.sniper.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
		.yoyo(true)
		.loop()
		.start();
};
PlayState._spawnShotgun = function(x, y){
	this.shotgun = this.weapons.create(x, y, 'rifles');
	this.shotgun.anchor.set(0.5, 0.5);
	this.shotgun.animations.add('shotgun', [0]);
	this.shotgun.animations.play('shotgun');
	this.game.physics.enable(this.shotgun);
	this.shotgun.body.allowGravity = false;	
	this.shotgun.y -=3;
	this.game.add.tween(this.shotgun)
		.to({y: this.shotgun.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
		.yoyo(true)
		.loop()
		.start();
};
PlayState._spawnMinigun = function(x, y){
	this.minigun = this.weapons.create(x, y, 'rifles');
	this.minigun.anchor.set(0.5, 0.5);
	this.minigun.animations.add('minigun', [3]);
	this.minigun.animations.play('minigun');
	this.game.physics.enable(this.minigun);
	this.minigun.body.allowGravity = false;	
	this.minigun.y -=3;
	this.game.add.tween(this.minigun)
		.to({y: this.minigun.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
		.yoyo(true)
		.loop()
		.start();
};
PlayState._spawnCoin = function (coin){
	let sprite = this.coins.create(coin.x, coin.y, 'coin');
	sprite.anchor.set(0.5, 0.5);
	sprite.animations.add('rotate', [0, 1, 2, 3], 6, true);
	sprite.animations.play('rotate');
	this.game.physics.enable(sprite);
	sprite.body.allowGravity = false;
};
PlayState._spawnDoor = function(x, y){
	this.door = this.bgDecoration.create(x, y, 'door');
	this.door.anchor.set(0.5, 1);
	this.game.physics.enable(this.door);
	this.door.body.allowGravity = false;
};
PlayState._spawnKey = function(x, y){
	this.key = this.bgDecoration.create(x, y, 'key');
	this.key.anchor.set(0.5, 0.5);
	this.game.physics.enable(this.key);
	this.key.body.allowGravity = false;
	this.key.y -=3;
	this.game.add.tween(this.key)
		.to({y: this.key.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
		.yoyo(true)
		.loop()
		.start();
}
PlayState._spawnEnemyWall = function(x, y, side){
	let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
	sprite.anchor.set(side === 'left' ? 1 : 0, 1);
	this.game.physics.enable(sprite);
	sprite.body.immovable = true;
	sprite.body.allowGravity = false;
};
PlayState.update = function(){
	this._handleCollisions();
	this._handleInput();
	this.coinFont.text = `x${this.coinPickupCount}`;
	this.deathFont1.text = `x${this.deathHero1}`;
	this.deathFont2.text = `x${this.deathHero2}`;
	this.keyIcon.frame = this.hasKey ? 1 : 0;
};
PlayState._handleInput = function(){
	// Joueur 1
	
	if (this.keys.q.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
        this.hero.move(-1);
		this.hero.direction = 1;
		this.hero.Weapon.side(-180);
    }
    else if (this.keys.d.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
        this.hero.move(1);
		this.hero.direction = -1;
		this.hero.Weapon.side(0);
    }else{
		this.hero.move(0);
	}
	if (this.keys.z.isDown || this.pad1.justPressed(Phaser.Gamepad.XBOX360_A))
    {
       let didJump = this.hero.jump();
		if(didJump){
			this.sfx.jump.play();
		}
    }
	if(this.keys.space.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_B)){
		this.hero.Weapon.fire();
            // this.sfx.stomp.play();
	}
	
	// Joueur 2
	
	if (this.keys.left.isDown || this.pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
        this.hero2.move(-1);
		this.hero2.Weapon.side(-180);
    }
    else if (this.keys.right.isDown ||this.pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
        this.hero2.move(1);
		this.hero2.Weapon.side(0);
    }else{
		this.hero2.move(0);
	}
	if (this.keys.up.isDown || this.pad2.justPressed(Phaser.Gamepad.XBOX360_A))
    {
       let didJump = this.hero2.jump();
		if(didJump){
			this.sfx.jump.play();
		}
    }
	if(this.keys.zero.isDown || this.pad2.isDown(Phaser.Gamepad.XBOX360_B)){
		this.hero2.Weapon.fire();
	}
};
PlayState._handleCollisions = function(){
	this.game.physics.arcade.collide(this.spiders, this.enemyWalls);
	this.game.physics.arcade.collide(this.spiders, this.platforms);
	for(var i = 0; i < 2; i++){
		if (i == 0){
			tempHero = this.hero;
			tempHero2 = this.hero2;
		}else{
			tempHero = this.hero2;
			tempHero2 = this.hero;
		}
		
		this.game.physics.arcade.collide(tempHero, tempHero2);
		this.game.physics.arcade.collide(tempHero, this.platforms);

		this.game.physics.arcade.collide(tempHero, tempHero2.Weapon.bullets, this._onHeroVsWeapon, null, this);
		this.game.physics.arcade.collide(tempHero.Weapon.bullets, this.platforms, this._WeaponVsPlat, null, this);
		this.game.physics.arcade.collide(this.spiders, tempHero.Weapon.bullets, this._onSpiderVsWeapon, null, this);

		this.game.physics.arcade.overlap(tempHero, this.shotgun, this._onHeroVsShotgun, null, this);
		this.game.physics.arcade.overlap(tempHero, this.minigun, this._onHeroVsMinigun, null, this);
		this.game.physics.arcade.overlap(tempHero, this.pistol, this._onHeroVsPistol, null, this);
		this.game.physics.arcade.overlap(tempHero, this.sniper, this._onHeroVsSniper, null, this);
		
		this.game.physics.arcade.overlap(tempHero, this.coins, this._onHeroVsCoin, null, this);
		this.game.physics.arcade.overlap(tempHero, this.spiders, this._onHeroVsEnemy, null, this);
		this.game.physics.arcade.overlap(tempHero, this.key, this._onHeroVsKey, null, this);
		this.game.physics.arcade.overlap(tempHero, this.door, this._onHeroVsDoor, 
			function(hero, door){
				return this.hasKey && hero.body.touching.down;
			}, this);
		}
	}
PlayState._onBVsB = function(b1, b2){
		b1.kill();
		b2.kill();
};
PlayState._WeaponVsPlat = function(weapon, platform){
	weapon.kill();
}
PlayState._onHeroVsCoin = function (hero, coin){
	this.sfx.coin.play();
	this.coinPickupCount++;
	coin.kill();
};
PlayState._onHeroVsEnemy = function(hero, enemy){
	if(hero.body.velocity.y > 0){
		hero.bounce();
		this.sfx.stomp.play();
		enemy.die();
	}else{
		this.sfx.stomp.play();
		hero.x = hero.spawnPointX;
		hero.y = hero.spawnPointY;
	}
};
PlayState._onSpiderVsWeapon = function(spider, weapon){
		this.sfx.stomp.play();
		spider.die();
		weapon.kill();
};
PlayState._onHeroVsPistol = function(hero, pistol){
	hero.Weapon.pistol(this.game, 1);
	hero.Weapon.track(hero);
	hero.Weapon.type = 'pistol';
	
	this.sfx.key.play();
	pistol.kill();
};
PlayState._onHeroVsSniper = function(hero, sniper){
	hero.Weapon.sniper(this.game, 1);
	hero.Weapon.track(hero);
	hero.Weapon.type = 'sniper';
	
	this.sfx.key.play();
	sniper.kill();
};
PlayState._onHeroVsShotgun = function(hero, shotgun){
	hero.Weapon.shotgun(this.game, 1);
	hero.Weapon.track(hero);
	hero.Weapon.type = 'shotgun';
	
	this.sfx.key.play();
	shotgun.kill();
};
PlayState._onHeroVsMinigun = function(hero, minigun){
	hero.Weapon.minigun(this.game, 1);
	hero.Weapon.track(hero);
	hero.Weapon.type = 'minigun';
	
	this.sfx.key.play();
	minigun.kill();
};
PlayState._onHeroVsKey = function(hero, key){
	this.sfx.key.play();
	this.hasKey = true;
	key.kill();
};
PlayState._onHeroVsDoor = function(hero, door){
	this.sfx.door.play();
	this.game.state.restart(true, false, {level:this.level+1});
};
PlayState._onHeroVsWeapon = function(hero, weapon){
	if (hero.nbr == 1){
		this.deathHero2++;		
	}else{
		this.deathHero1++;	
	}
	this.sfx.stomp.play();
	hero.x = hero.spawnPointX;
	hero.y = hero.spawnPointY;
	weapon.kill();
};

window.onload = function(){
	let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
	game.state.add('play', PlayState);
	game.state.start('play', true, false, {level: 0});
};

