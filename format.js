window.onload = init;
window.addEventListener("resize", resize);

// shim to grab animation frames in a variety of browsers
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

// which window is currently showing?
var atHome = true;
var atAbout = false;
var atProjects = false;
var atContact = false;

// navigation links
var home = document.getElementById("home");
var about = document.getElementById("about");
var projects = document.getElementById("projects");
var contact = document.getElementById("contact");

// resizable divs
var content = document.getElementById("content");
var heading = document.getElementById("heading");
var text = document.getElementById("text");
var pause = document.getElementById("pause");

// easter eggs!
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a', 'start'];
var inputs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var gameScreen = document.getElementById("game");
var hiddenScreen = document.getElementById("code");
var gamePlaying = false;

// scrolling banner
var banner = document.getElementById("banner");
var layer1 = new Image();
var layer2 = new Image();
var layer3 = new Image();
var layer2Pos = 0;
var layer3Pos = 0;
var draw = true;
var direction = 1;
var lastDirection = 1;
var paused = false;

// DEBUG!!!!!!!!!!!!!!!!!!
var straightToGame = false;
// DEBUG!!!!!!!!!!!!!!!!!!

function init() 
{ 
	resize();

	var ctx = banner.getContext("2d");
	ctx.imageSmoothingEnabled = false;
   	ctx.webkitImageSmoothingEnabled = false;
   	ctx.mozImageSmoothingEnabled = false;

   	layer1.src = "images/map3.png";
	layer2.src = "images/map2.png";
	layer3.src = "images/map.png";

	setInterval(cheatEntered, 1);
	animate();
}

function resize() 
{ 
	var screen = document.getElementById("screen");

	// resize fonts
	screen.style.fontSize = document.getElementById("screen2").style.fontSize = screen.clientHeight / 8 + "px";
	heading.style.fontSize = heading.clientHeight / 2 + "px";
	text.style.fontSize = text.clientHeight / 27 + "px";
	pause.style.fontSize = pause.clientHeight / 6 + "px";
	hiddenScreen.style.fontSize = hiddenScreen.clientHeight / 50 + "px";
	document.getElementById("splash").style.fontSize = document.getElementById("splash").clientHeight / 25 + "px";

	// resize canvases
	gameScreen.setAttribute("width", gameScreen.clientWidth);
	gameScreen.setAttribute("height", gameScreen.clientHeight);
	banner.setAttribute("width", banner.clientWidth);
	banner.setAttribute("height", banner.clientHeight);

	if(gamePlaying) setupGame();
 }
 
 function cheatEntered()
 {
	if(!(inputs < konamiCode || inputs > konamiCode) || straightToGame) 
		playw0rm();
 }

 function playw0rm()
 {
 	inputs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
 	resize();
	document.getElementById("code").style.visibility = "visible";
	document.getElementById("screen2").style.visibility = "visible";
	document.getElementById("splash").style.visibility = "visible";
	gamePlaying = true;
	straightToGame = false;
 }
 
 function pressA()
{
	if(!gamePlaying)
	{
		inputs.shift();
		inputs.push('a');
	}
}

function pressB()
{
	if(!gamePlaying)
	{
		inputs.shift();
		inputs.push('b');
	}
}

function pressUp()
{
	if(!gamePlaying)
	{
		inputs.shift();
		inputs.push('up');

		if(atHome) setContact(); 
		else if(atAbout) setHome(); 
		else if(atProjects) setAbout();
		else setProjects();
	}
}

function pressDown()
{
	if(!gamePlaying)
	{
		inputs.shift();
		inputs.push('down');

		if(atHome) setAbout();
		else if(atAbout) setProjects();
		else if(atProjects) setContact();
		else setHome();
	}
}

function pressLeft()
{
	if(!gamePlaying)
	{
		inputs.shift();
		inputs.push('left');
	
		if(!paused) direction = -1;
	}
}

function pressRight()
{
	if(!gamePlaying)
	{
		inputs.shift();
		inputs.push('right');
	
		if(!paused) direction = 1;
	}
}

function pressSelect()
{
	if(!gamePlaying)
	{
		inputs.shift();
		inputs.push('select');
	}
}

function pressStart()
{
	if(!gamePlaying)
	{
		inputs.shift();
		inputs.push('start');
	
		if(paused)
		{
			direction = lastDirection;
			paused = false;
			pause.style.visibility = "hidden";
		}
		else
		{
			lastDirection = direction;
			direction = 0;
			paused = true;
			pause.style.visibility = "visible";
		}
	}
}

function setHome()
{
	atHome = true;
	atAbout = false;
	atProjects = false;
	atContact = false;
	
	home.className = "current";
	about.className = projects.className = contact.className = "nav";
	heading.innerHTML = "Home";
	text.innerHTML = "My name is Christian Dinh. Welcome to my web portfolio!<br><br>" +
					 "<noscript>Unless you really like being stuck on this homepage, please enable Javascript!</noscript>";
	
}

function setAbout()
{
	atHome = false;
	atAbout = true;
	atProjects = false;
	atContact = false;
	
	about.className = "current";
	home.className = projects.className = contact.className = "nav";
	heading.innerHTML = "About";
	text.innerHTML = "<u>Who I Am:</u><br>Christian Dinh<br><br>" + 
					 "<u>What I Do:</u><br>Currently enrolled as an undergraduate computer science major " + 
					 "at the University of Texas at Austin. I specialize in front-end " +
					 "application development including games, websites, and mobile apps<br><br>" +
					 "<u>Languages:</u><br>Java, C, HTML/CSS/Javascript<br><br>" + 
					 "<u>Technologies:</u><br>Eclipse/Android Developer Toolkit, UNIX, Bash, JQuery " +
					 "Unreal Development Kit, Git";
}

function setProjects()
{
	atHome = false;
	atAbout = false;
	atProjects = true;
	atContact = false;
	
	projects.className = "current";
	about.className = home.className = contact.className = "nav";
	heading.innerHTML = "Projects";
	text.innerHTML = "<a href = https://github.com/naughtyfiddle/Serjay-Story target = _blank><img src = images/projects/serjaystory.png class = 'project' alt = 'Serjay Story'></a><br>" + 
					 "A 2D game engine that will eventually be used to create " +
					 "'Metroidvania' style side-scrollers. The engine is written in Java " +
					 "and built on Box2D and LibGDX. Games run on both desktop and " +
					 "Android. Work in progress.<br><br>" +
					 "<a href = downloads/MusEngine.zip><img src = images/projects/musicgen.png class = 'project' alt = 'MusEngine'></a><br>" +
					 "A procedural music generator written in Java. Uses JFugue for audio. Desktop only.<br><br>" + 
					 "<a href = downloads/Judgment.zip><img src = images/projects/judgment.png class = 'project' alt = 'Judgment'></a><br>" +
					 "My first LibGDX game, essentially just an Asteroids clone with " +
					 "a sense of humor. Desktop only.<br><br>" +
					 "<img src = images/projects/worm.png class = 'project' onClick = 'playw0rm()' alt = 'w0rm'><br>" +
					 "A clone of the classic game 'Snake', except the snake can shoot " +
					 "portals. w0rm can actually be played on this website by entering " +
					 "the Konami Code on the Gameboy to the left (or by clicking the " +
					 "banner above if you do not know the code). Written in Javascript.<br><br><br><br>";
}

function setContact()
{
	atHome = false;
	atAbout = false;
	atProjects = false;
	atContact = true;
	
	contact.className = "current";
	about.className = projects.className = home.className = "nav";
	heading.innerHTML = "Contact";
	text.innerHTML = "<u>Email:</u><br>ctdinh93@gmail.com<br><br>" +
					 "<u>Phone:</u><br>(309) 339-6842<br><br>" +
					 "<a href = https://www.linkedin.com/profile/view?id=335776534&trk=nav_responsive_tab_profile target = _blank>LinkedIn</a>";
}

function animate()
{
	if(!gamePlaying) scroll();
	else game();
		
	requestAnimFrame( animate );
}

function scroll()
{
	var ctx = banner.getContext("2d");
	var speed = 1;

	ctx.clearRect(0, 0, banner.width, banner.height);
	ctx.drawImage(layer1, 0, 0, banner.width, banner.height);
	ctx.drawImage(layer2, layer2Pos -= (speed / 2) * direction, 0, banner.width * 2, banner.height);
	ctx.drawImage(layer2, layer2Pos + banner.width * 2, 0, banner.width * 2, banner.height);
	ctx.drawImage(layer2, layer2Pos - banner.width * 2, 0, banner.width * 2, banner.height);
	ctx.drawImage(layer3, layer3Pos -= speed * direction, 0, banner.width * 4, banner.height);
	ctx.drawImage(layer3, layer3Pos + banner.width * 4, 0, banner.width * 4, banner.height);
	ctx.drawImage(layer3, layer3Pos - banner.width * 4, 0, banner.width * 4, banner.height);

	// loop images in both directions
	if(layer2Pos < -banner.width * 2 || layer2Pos > banner.width * 2) layer2Pos = 0;
	if(layer3Pos < -banner.width * 4 || layer3Pos > banner.width * 4) layer3Pos = 0;
}

function game()
{
	var ctx = gameScreen.getContext("2d");

	if(document.getElementById("splash").style.visibility == "hidden")
	{
		update();
		render(ctx);
	}
}

/***************************************************************************/
/*************************** BEGIN GAME CODE *******************************/
/***************************************************************************/

window.addEventListener('keydown', getPlayerInput, false);

// sizing constants
var segmentSize;
var cakeSize;
var portalWidth;
var COLOR_BLUE = "#b1c1c4";
var COLOR_ORANGE = "#e1caa8";
var COLOR_WORM = "gray";

// the worm
var worm = new Worm();

// other drawables
var food = new food(cakeSize);
var bullets = new Array();
var score = 0;
var tween = false;

// portal debugging
var blue = new portal(0, 0, 1, 0, COLOR_BLUE);
var orange = new portal(0, 0, -1, 0, COLOR_ORANGE);

function beginGame()
{
	// hide splash
	document.getElementById("splash").style.visibility = "hidden";
	setupGame();
}

function setupGame()
{
	gameScreen.style.width = gameScreen.clientHeight + "px";
	document.getElementById("score").innerHTML = "Score = 0";

	// reset canvas coordinates
	gameScreen.setAttribute("width", gameScreen.clientWidth);
	gameScreen.setAttribute("height", gameScreen.clientHeight);

	// size elements based on canvas dimensions
	segmentSize = gameScreen.clientWidth / 60;
	portalWidth = segmentSize * 2;
	cakeSize = segmentSize * 4;
	food.size = cakeSize;

	// reset game objects
	bullets.length = 0;
	worm.reset();
	food.move();
	blue.move(0, segmentSize * 30, 1, 0);
	orange.move(gameScreen.clientWidth - segmentSize, segmentSize * 30, -1, 0);
	score = 0;
	tween = false;
}

function getPlayerInput(e) 
{
    var code = e.keyCode;
    switch (code) 
    {
    	case 27: quit(); break;                  // esc key
        case 37: worm.setDir(-1, 0); break;      // Left key
        case 38: worm.setDir(0, -1); break;      // Up key
        case 39: worm.setDir(1, 0);  break;      // Right key
        case 40: worm.setDir(0, 1);  break;      // Down key
        case 88: addBullet(COLOR_ORANGE); break;   // X key  
        case 90: addBullet(COLOR_BLUE); break; // Z key
        default: break;
    }
}

function update()
{
	if(!tween)
	{
		if( worm.isDead() ) document.getElementById("splash").style.visibility = "visible";

		var teleported = worm.doTeleporting();

		// if head went through a portal, set segment flags on other side of the portal
		if(teleported)
		{
			for(i = 0; i < worm.tail.length - 1; i++)
				worm.tail[i].throughPortal = true;
		}
	
		worm.addSegment();
	
		// if the worm does not eat cake, discard the trailing segment
		if( !worm.isEating(food) ) worm.tail.shift();
	
		// move the food, keep the trailing segment, add an extra segment, increase score
		else 
		{
			food.move();
			worm.addSegment();
			score += 10;
			document.getElementById("score").innerHTML = "Score = " + score;
		}
	
		// move portals
		for(i = 0; i < bullets.length; i++)
		{
			if( bullets[i].isOffscreen() ) 
			{
				// replace bullet to be removed with last member of array, reduce array size by one
				bullets[i] = bullets[bullets.length - 1];
				bullets.length--;
				i--;
			}
		}
	}
}

function render(ctx)
{
	ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);

	// draw the food (only if worm is moving)
	if(worm.dirX != 0 || worm.dirY != 0) food.draw(ctx);

	// draw the worm
	worm.draw(ctx);

	if(tween) worm.head.tween(ctx, worm.dirX, worm.dirY);

	// draw the bullets
	for(i = 0; i < bullets.length; i++) {
		bullets[i].draw(ctx);
	}

	// draw the portals
	blue.draw(ctx);
	orange.draw(ctx);

	tween = !tween;
}

function addBullet(color)
{
	if(worm.dirX != 0 || worm.dirY != 0)
        bullets.push(new bullet(worm.head.x, worm.head.y, worm.dirX, worm.dirY, color)); 
}

function quit()
{
	gamePlaying = false;
	document.getElementById("code").style.visibility = "hidden";
	document.getElementById("screen2").style.visibility = "hidden";
	document.getElementById("splash").style.visibility = "hidden";
	if(paused) pressStart();
}

function Rectangle(x, y, w, h)
{
	this.x1 = x;
	this.y1 = y;
	this.x2 = x + w;
	this.y2 = y + h;
	this.overlaps = overlaps;

	function overlaps(other)
	{
		if(this.x1 >= other.x1 && this.x1 < other.x2 && this.y1 >= other.y1 && this.y1 < other.y2)
			return true;
		else if(other.x1 >= this.x1 && other.x1 < this.x2 && other.y1 >= this.y1 && other.y1 < this.y2)
			return true;
		else if(this.x1 >= other.x1 && this.x1 < other.x2 && other.y1 >= this.y1 && other.y1 < this.y2)
			return true;
		else if(other.x1 >= this.x1 && other.x1 < this.x2 && this.y1 >= other.y1 && this.y1 < other.y2)
			return true;
		else 
			return false;
	}
}

function segment(x, y, size)
{
	this.x = x;
	this.y = y;
	this.size = size;
	this.throughPortal = false;
	this.bounds = new Rectangle(x, y, size, size);
	this.draw = draw;
	this.tween = tween;

	function draw(ctx)
	{
		ctx.fillStyle = COLOR_WORM;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}

	function tween(ctx, dirX, dirY)
	{
		ctx.fillStyle = COLOR_WORM;
		ctx.fillRect(this.x + segmentSize * dirX / 2, this.y + segmentSize * dirY / 2, this.size, this.size);
	}
}

function Worm()
{
	this.tail = new Array();
	this.head = 0;
	this.dirX = 0;
	this.dirY = 0;
	this.setDir = setDir;
	this.addSegment = addSegment;
	this.doTeleporting = doTeleporting;
	this.isEating = isEating;
	this.isDead = isDead;
	this.reset = reset;
	this.draw = draw;

	function setDir(x, y)
	{
		if(this.dirX != -x) this.dirX = x;
		if(this.dirY != -y) this.dirY = y;
	}

	function addSegment()
	{
		this.tail.push( new segment(this.head.x + segmentSize * this.dirX, this.head.y + segmentSize * this.dirY, segmentSize) );
		this.head = this.tail[this.tail.length - 1];
	}

	function doTeleporting()
	{
		var teleported = false;

		// teleport from blue to orange
		if(this.head.bounds.overlaps(blue.bounds) && this.dirX == -blue.dirX && this.dirY == -blue.dirY)
		{
			var newX = 0;
			var newY = 0;
	
			// portal is oriented horizontally
			if(orange.w > orange.h)
			{
				newX = orange.x + portalWidth;
				newY = orange.y + orange.dirY * segmentSize; 
			}
			// portal is oriented vertically
			else
			{
				newX = orange.x + orange.dirX * segmentSize;
				newY = orange.y + portalWidth; 
			}
	
			this.tail.push(new segment(newX, newY, segmentSize));
			this.tail.shift();
			this.dirX = orange.dirX;
			this.dirY = orange.dirY;

			teleported = true;
		}
		// teleport from orange to blue
		else if(this.head.bounds.overlaps(orange.bounds) && this.dirX == -orange.dirX && this.dirY == -orange.dirY)
		{
			var newX = 0;
			var newY = 0;
	
			// portal is oriented horizontally
			if(blue.w > blue.h)
			{
				newX = blue.x + portalWidth;
				newY = blue.y + blue.dirY * segmentSize; 
			}
			// portal is oriented vertically
			else
			{
				newX = blue.x + blue.dirX * segmentSize;
				newY = blue.y + portalWidth; 
			}
	
			this.tail.push(new segment(newX, newY, segmentSize));
			this.tail.shift();
			this.dirX = blue.dirX;
			this.dirY = blue.dirY;

			teleported = true;
		}
		// update head segment
		this.head = this.tail[this.tail.length - 1];
		return teleported;
	}

	function isEating(food)
	{
		if(this.head.bounds.overlaps(food.bounds))
			return true;
	
		else return false;
	}

	function isDead()
	{
		// check if worm is offscreen
		if(this.head.bounds.x2 < 0 || this.head.bounds.x1 > gameScreen.clientWidth || this.head.bounds.y2 < 0 || this.head.bounds.y1 > gameScreen.clientHeight)
			return true;

		// check if worm is eating its tail
		for(i = 0; i < this.tail.length - 1; i++)
		{
			var seg = this.tail[i];
			if(this.head.bounds.overlaps(seg.bounds))
				return true;
		}

		return false;
	}

	function reset()
	{
		this.tail.length = 0;
		this.tail.push( new segment(segmentSize * 30, segmentSize * 30, segmentSize) );
		this.head = this.tail[0];
		this.dirX = 0;
		this.dirY = 0;
	}

	function draw(ctx)
	{
		for(i = 0; i < this.tail.length; i++) {
			this.tail[i].draw(ctx);
		}
	}
}

function food(size)
{
	this.x = 0;
	this.y = 0;
	this.size = size;
	this.bounds = new Rectangle(0, 0, size, size);
	this.draw = draw;
	this.move = move;
	this.sprite = new Image();
	this.sprite.src = "images/worm/cake.png";

	function draw(ctx)
	{
		ctx.drawImage(this.sprite, this.x, this.y, this.size, this.size);
	}

	function move()
	{
		this.x = Math.random() * (gameScreen.clientWidth - this.size);
		this.y = Math.random() * (gameScreen.clientHeight - this.size);
		this.bounds = new Rectangle(this.x, this.y, this.size, this.size);
	}
}

function portal(x, y, dirX, dirY, color)
{
	this.x = x - Math.abs(dirY) * portalWidth;
	this.y = y - Math.abs(dirX) * portalWidth;
	this.w = Math.abs(dirY) * (2 * portalWidth + segmentSize) + Math.abs(dirX) * segmentSize;
	this.h = Math.abs(dirX) * (2 * portalWidth + segmentSize) + Math.abs(dirY) * segmentSize;
	this.bounds = 0;
	this.dirX = dirX;
	this.dirY = dirY;
	this.fillColor = color;
	this.draw = draw;
	this.move = move;

	function draw(ctx)
	{
		ctx.fillStyle = this.fillColor;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	function move(x, y, dirX, dirY)
	{
		var oldX = this.x, oldY = this.y, oldW = this.w, oldH = this.h, oldBounds = this.bounds, oldDirX = this.dirX, oldDirY = this.dirY;

		// move portal to one of four walls
		if(dirX == -1)
		{
			this.x = gameScreen.clientWidth - segmentSize;
			this.y =  Math.min( Math.max(y - portalWidth, 0), gameScreen.clientHeight - 2 * portalWidth - segmentSize );
			this.w = segmentSize;
			this.h = 2 * portalWidth + segmentSize;
		}
		else if(dirX == 1)
		{
			this.x = 0;
			this.y =  Math.min( Math.max(y - portalWidth, 0), gameScreen.clientHeight - 2 * portalWidth - segmentSize );
			this.w = segmentSize;
			this.h = 2 * portalWidth + segmentSize;
		}
		else if(dirY == -1)
		{
			this.x = Math.min( Math.max(x - portalWidth, 0), gameScreen.clientWidth - 2 * portalWidth - segmentSize );
			this.y = gameScreen.clientHeight - segmentSize;
			this.w = 2 * portalWidth + segmentSize;
			this.h = segmentSize;
		}
		else
		{
			this.x = Math.min( Math.max(x - portalWidth, 0), gameScreen.clientWidth - 2 * portalWidth - segmentSize );
			this.y = 0;
			this.w = 2 * portalWidth + segmentSize;
			this.h = segmentSize;
		}

		this.bounds = new Rectangle(this.x, this.y, this.w, this.h);
		this.dirX = dirX;
		this.dirY = dirY;

		// keep portals from overlapping
		if( (this.fillColor == COLOR_BLUE && this.bounds.overlaps(orange.bounds)) || (this.fillColor == COLOR_ORANGE && this.bounds.overlaps(blue.bounds)) )
		{
			var other;

			if(this.fillColor == COLOR_BLUE) other = orange;
			else other = blue;

			// portal oriented vertically
			if(this.dirX != 0)
			{
				if(this.y > other.y) this.y = other.y + 2 * portalWidth + segmentSize;
				
				else this.y = other.y - 2 * portalWidth - segmentSize;
			}
			// portal oriented horizontally
			else
			{
				if(this.x > other.x) this.x = other.x + 2 * portalWidth + segmentSize;
				
				else this.x = other.x - 2 * portalWidth - segmentSize;
			}

			this.bounds = new Rectangle(this.x, this.y, this.w, this.h);

			// if portal was pushed offscreen, move it back
			if(this.bounds.x1 < 0 || this.bounds.x2 > gameScreen.clientWidth || this.bounds.y1 < 0 || this.bounds.y2 > gameScreen.clientHeight)
			{
				this.x = oldX;
				this.y = oldY;
				this.w = oldW;
				this.h = oldH;
				this.dirX = oldDirX;
				this.dirY = oldDirY;
				this.bounds = oldBounds;
			}
		}
	}
}

function bullet(x, y, dirX, dirY, fillColor)
{
	this.x = x;
	this.y = y;
	this.w = segmentSize;
	this.h = segmentSize;
	this.bounds = new Rectangle(x, y, segmentSize, segmentSize);
	this.dirX = dirX;
	this.dirY = dirY;
	this.speed = segmentSize;
	this.fillColor = fillColor;
	this.draw = draw;
	this.isOffscreen = isOffscreen;

	function draw(ctx)
	{
		this.x += this.dirX * this.speed;
		this.y += this.dirY * this.speed;
		this.bounds = new Rectangle(this.x, this.y, segmentSize, segmentSize);
		ctx.fillStyle = fillColor;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	function isOffscreen()
	{
		var remove = false;

		// don't let the worm shoot if it's moving through a portal
		if(worm.tail[0].throughPortal) remove = true;

		else if(this.bounds.x2 < 0)
		{
			if(this.fillColor == COLOR_BLUE)
				blue.move(0, this.y, -this.dirX, -this.dirY);
			else
				orange.move(0, this.y, -this.dirX, -this.dirY);

			remove = true;
		}
		else if(this.bounds.x1 > gameScreen.clientWidth)
		{
			if(this.fillColor == COLOR_BLUE)
				blue.move(gameScreen.clientWidth, this.y, -this.dirX, -this.dirY);
			else
				orange.move(gameScreen.clientWidth, this.y, -this.dirX, -this.dirY);

			remove = true;
		}
		else if(this.bounds.y2 < 0)
		{
			if(this.fillColor == COLOR_BLUE)
				blue.move(this.x, 0, -this.dirX, -this.dirY);
			else
				orange.move(this.x, 0, -this.dirX, -this.dirY);

			remove = true;
		}
		else if(this.bounds.y1 > gameScreen.clientHeight)
		{
			if(this.fillColor == COLOR_BLUE)
				blue.move(this.x, gameScreen.clientHeight, -this.dirX, -this.dirY);
			else
				orange.move(this.x, gameScreen.clientHeight, -this.dirX, -this.dirY);

			remove = true;
		}
		else if(this.bounds.overlaps(orange.bounds) || this.bounds.overlaps(blue.bounds))
			remove = true;

		return remove;
	}
}
