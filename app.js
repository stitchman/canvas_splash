import { Splash } from "./splash.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.splashes = [];

    document.addEventListener("click", (e) => {
      this.splashes.push(new Splash(e.clientX, e.clientY, 10, 10, 20));

      const wrapper = document.querySelector("#wrapper");
      wrapper.style.height = "3rem";

      const description = document.querySelector("#description");
      if (!description.classList.contains("hidden")) {
        description.classList.add("hidden");
      }
    });

    this.splashes.push(
      new Splash(this.stageWidth / 2, this.stageHeight / 2, 10, 10, 20)
    );

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.splashes.forEach((splash, index) => {
      splash.draw(this.ctx, this.stageWidth, this.stageHeight);
      if (splash.balls.length === 0) {
        setTimeout(() => {
          this.splashes.splice(index, 1);
        }, 0);
      }
    });
  }
}

window.onload = () => {
  new App();
};
