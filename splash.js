export class Splash {
  constructor(x, y, ballCount, ballRadius, ballVelocity) {
    this.x = x;
    this.y = y;
    this.ballCount = ballCount;
    this.ballRadius = ballRadius;
    this.ballVelocity = ballVelocity;

    this.balls = [];
    const colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];
    this.color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < Math.random() * (this.ballCount - 3) + 3; i++) {
      const ball = {
        x: this.x,
        y: this.y,
        radius: Math.random() * (this.ballRadius - 5) + 5,
        vx: (Math.random() - 0.5) * this.ballVelocity,
        vy: (Math.random() - 0.5) * this.ballVelocity,
      };
      this.balls[i] = ball;
    }
  }

  update(stageWidth, stageHeight) {
    this.balls.forEach((ball, index) => {
      const friction = 0.97;
      if (Math.abs(ball.vx) < 0.5 && Math.abs(ball.vy) < 0.5) {
        ball.vx = 0;
        ball.vy = 0;
      } else {
        ball.vx *= friction;
        ball.vy *= friction;
      }
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (
        ball.x + ball.radius < 0 ||
        ball.x - ball.radius > stageWidth ||
        ball.y + ball.radius < 0 ||
        ball.y - ball.radius > stageHeight
      ) {
        setTimeout(() => {
          this.balls.splice(index, 1);
        }, 0);
      }
    });
  }

  draw(ctx, stageWidth, stageHeight) {
    this.update(stageWidth, stageHeight);

    ctx.fillStyle = this.color;

    this.balls.forEach((ball) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
}
