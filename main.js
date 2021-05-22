class Platformer {
  constructor(player_start_pos) {
    this.start_pos = player_start_pos;
    this.acceleration = 0;
  }

  gravity(ammount_in_px) {
    $("#player").css({
      "top": "+=" + (ammount_in_px + platformer.acceleration) + "px"
    });

    //To make the acceleration less, make this number less:
    platformer.acceleration += .01;
  }

  check_death() {
    if (remove_px($("#player").css("top")) >= window.innerHeight) {
      return true;
    } else {
      return false;
    }
  }

  respawn() {
    //Brings you back to the start
    $("#player").css({
      "top": platformer.start_pos["y"],
      "left": platformer.start_pos["x"]
    });
  }

  touching_platform() {
    //Check is the player is touching a platform
    for (var i = 0; i <= $(".object").length - 1; i++) {
      if (collision($("#player")[0], $(".object")[i])) {
        return true;
      }
    }
    return false;
  }

  touching_lava() {
    //Check is the player is touching a platform
    for (var i = 0; i <= $(".lava").length - 1; i++) {
      if (collision($(".lava")[i], $("#player")[0])) {
        return true;
        break;
      }
    }
    return false;
  }

  jump() {
    var jump = setInterval(function () {
      //If you want the jump to be stronger increase the number
      $("#player").css({ "top": "-=5px" });
    });

    //To make the jump go higher increase the number here:
    setTimeout(function () { clearInterval(jump) }, 200);
  }

  left() {
    var left = setInterval(function () {
      //If you want going left to be stronger increase the number:
      $("#player").css({ "left": "-=4px" });
    });

    setTimeout(function () { clearInterval(left) }, 10);
  }

  right() {
    var right = setInterval(function () {
      //If you want going right to be stronger increase the number:
      $("#player").css({ "left": "+=4px" });
    });

    setTimeout(function () { clearInterval(right) }, 10);
  }

  check_key(keyCodes) {
    if (platformer.touching_platform()) {
      if (keyCodes[32] || keyCodes[38] || keyCodes[87]) {//spacebar keycode
        platformer.jump();
      }
    }
    if (keyCodes[39] || keyCodes[68]) {
      platformer.right();
    }
    if (keyCodes[37] || keyCodes[65]) {
      platformer.left();
    }
  }
}

var platformer = new Platformer({
  "y": (window.innerHeight / 2) - 50 + "px",
  "x": "30px"
});

window.onload = function () {
  //Teleport to the start point when the game loads:
  platformer.respawn();

  //You can remove lines 90-93 when you start. This was just for a demo:
  $("#demo_obstacle").css({
    "top": remove_px(platformer.start_pos["y"]) + 100 + "px",
    "left": platformer.start_pos["x"]
  });

  //Detecting the keys being pressed:
  var down = {};//Keys that currently being pressed
  $(document).keydown(function (e) {
    down[e.keyCode] = true;
    console.log(e.keyCode);
  });
  $(document).keyup(function (e) {
    down[e.keyCode] = false;
  });
  //Checking if a certain key is pressed. If that key is pressed then the check_key method is called:
  //The number determines the speed of the left and right movements
  setInterval(function () { platformer.check_key(down) }, 35);
}


//Respawn if the player is below the screens view or it dies by an obstacle
setInterval(function () {
  if (platformer.check_death()) {
    platformer.respawn();
  }
});

//mimic gravity
setInterval(function () {
  if (platformer.touching_lava()) {
    platformer.respawn();
  }
  if (!platformer.touching_platform()) {
    //The number represents how strong the gravity is. The 1.5 means how much pixels per milisecond the game will make the player further from the top
    platformer.gravity(.8);
  } else {
    platformer.acceleration = 0;
  }
});