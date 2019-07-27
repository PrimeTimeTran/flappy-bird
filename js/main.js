document.addEventListener("keydown", function(e) {
  if (e.keyCode == 32) {
    document.getElementById("audio").play();
  }
});

function restart(timer) {
  clearInterval(timer);
  setupGame();
}

function setupGame() {
  let timer = 0;
  const c = document.getElementById("canvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  const ctx = c.getContext("2d");

  const environment = new Environment(c, ctx);
  const bird = new Bird(250, 300, ctx);
  const prompt = new Prompt(c, ctx);
  const pipes = [];
  let pipeSet = generateRandomPipes(ctx, c.width, c.height);
  pipes.push(pipeSet.top, pipeSet.bottom);
  setInterval(() => {
    let pipeSet = generateRandomPipes(ctx, c.width, c.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
  }, 2500);

  const timeRef = setInterval(() => {
    timer += 1;
  }, 1000);

  gameLoop();
  function gameLoop() {
    bird.update(pipes);
    if (!bird.dead) {
      environment.update();

      pipes.forEach(function(pipe1) {
        pipe1.update();
      });
    }
    environment.render();
    pipes.forEach(function(pipe1) {
      pipe1.render();
    });

    bird.render();

    prompt.render(timer);

    if (bird.dead) {
      clearInterval(timeRef);
      drawGameOver(ctx, c);
    }
    window.requestAnimationFrame(gameLoop);
  }
}

function generateRandomPipes(ctx, canvasWidth, canvasHeight) {
  let lengthTop = Math.round(Math.random() * 200 + 50);
  let lengthBottom = canvasHeight - 300 - lengthTop;
  let returnVal = {};
  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
  returnVal.bottom = new Pipe(
    canvasWidth,
    canvasHeight + 5 - lengthBottom,
    lengthBottom,
    4,
    ctx
  );
  return returnVal;
}

function drawGameOver(ctx, c) {
  ctx.font = "30px Verdana";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", c.width / 2, c.height / 2);
}

window.onload = setupGame;
