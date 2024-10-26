// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = 1550; // 限定宽度留白方便展示字体和其他
const height = canvas.height = window.innerHeight;

const audio = document.getElementById('bgm');
const playButton = document.getElementById('playButton');

playButton.addEventListener('click', () => {
  if (audio.paused) {
      audio.play(); // 播放音频
      playButton.textContent = '暂停'; // 更新按钮文本
  } else {
      audio.pause(); // 暂停音频
      playButton.textContent = '播放'; // 更新按钮文本
  }
});


// 生成随机数的函数
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min; // max - min 最大和最小的差值随机，再加上最小值得到随机数
    return num;
}

function randomColor() { // 随机小球为任意颜色
    return (
        "rgb(" +
        random(0, 255) +
        ", " +
        random(0, 255) +
        ", " +
        random(0, 255) +
        ")"
    );
}

// Shape 构造器
function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists; // 标记球是否存在
}

// Ball 构造器，继承自 Shape
function Ball(x, y, velX, velY, color, size) {
    Shape.call(this, x, y, velX, velY, true); // 继承属性
    this.color = color;
    this.size = size;
}

// 设置 Ball 的原型
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// Ball 方法
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

Ball.prototype.update = function () { // 判断更新小球位置造成小球在画布上碰壁反向移动
    if (this.x + this.size >= width) {
        this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
        this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
        this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
};

Ball.prototype.collisionDetect = function () { // 增加小球之间的碰撞改色,并且增加碰撞转向的功能
    for (let j = 0; j < balls.length; j++) {
        if (this !== balls[j] && balls[j].exists) { // 确保检测存在的小球
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
                this.velX = -this.velX;
            }
        }
    }
};

// EvilCircle 构造器，继承自 Shape
// EvilCircle 构造器
function EvilCircle(x, y) {
  Shape.call(this, x, y, 20, 20, true); // 继承属性
  this.color = 'white'; // 设置颜色（可以省略，因为使用图片）
  this.size = 20; // 图片的大小
  this.image = new Image(); // 创建一个新的图像对象
  this.image.src = '1.png'; // 设置图像源
}

// 设置 EvilCircle 的原型
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

// 画出恶魔圈
EvilCircle.prototype.draw = function () {
  ctx.drawImage(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
};


// 检查边界
EvilCircle.prototype.checkBounds = function () {
  // 检查是否超出边界并调整位置
  if (this.x + this.size > width) {
      this.x = width - this.size; // 确保不超出右边界
  }
  if (this.x - this.size < 0) {
      this.x = this.size; // 确保不超出左边界
  }
  if (this.y + this.size > height) {
      this.y = height - this.size; // 确保不超出下边界
  }
  if (this.y - this.size < 0) {
      this.y = this.size; // 确保不超出上边界
  }
};






  // EvilCircle.prototype.setControls = function () {
  //   window.onkeydown = (e) => {
  //       switch (e.key) {
  //           case "a":
  //               this.x -= this.velX; // 向左移动
  //               break;
  //           case "d":
  //               this.x += this.velX; // 向右移动
  //               break;
  //           case "w":
  //               this.y -= this.velY; // 向上移动
  //               break;
  //           case "s":
  //               this.y += this.velY; // 向下移动
  //               break;
  //       }
  //   };
  // };

    // 鼠标控制

    EvilCircle.prototype.setControls = function () {
      // 鼠标移动事件
      window.addEventListener('mousemove', (e) => {
          this.x = e.clientX; // 更新恶魔圈的 x 坐标
          this.y = e.clientY; // 更新恶魔圈的 y 坐标
      });
  };





// 碰撞检测
EvilCircle.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
      if (balls[j].exists) { // 只检测存在的小球
          const dx = this.x - balls[j].x;
          const dy = this.y - balls[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.size + balls[j].size) { // 检测碰撞
              balls[j].exists = false; // 将小球设置为不存在
              ballCount--; // 减少小球数量
              
              updateBallCount(); // 更新显示
          }
      }
  }
};

// 创建小球
let balls = [];
let ballCount = 0;
while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      size
  );
  balls.push(ball);
  ballCount++;
}

// 获取段落元素
const ballCountParagraph = document.getElementById('ball-count');
function updateBallCount() {
    ballCountParagraph.textContent = `还剩多少个球: ${ballCount}`;

    const messageElement = document.getElementById('message');
  messageElement.innerText = '豪赤!'; // 设置消息内容
  messageElement.style.display = 'block'; // 显示消息

  setTimeout(() => {
    messageElement.style.display = 'none'; // 隐藏消息
  }, 1000); // 2秒后隐藏
}
// 创建恶魔圈的对象实例
const evilCircle = new EvilCircle(random(0 + 10, width - 10), random(0 + 10, height - 10));

  evilCircle.setControls();



// 游戏循环
function loop() {
    ctx.fillStyle = "rgb(128, 232, 240)"; // 设置画布背景颜色
    ctx.fillRect(0, 0, width, height);

    // 遍历小球，并在存在时调用相应的方法
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) { // 仅当小球存在时调用方法
            balls[i].draw();           // 画出小球
            balls[i].update();         // 更新小球位置
            balls[i].collisionDetect(); // 检测小球之间的碰撞
        }
    }

    // 调用恶魔圈的方法
    evilCircle.checkBounds();       // 检查恶魔圈边界
    evilCircle.draw();              // 画出恶魔圈
    evilCircle.collisionDetect();   // 检测恶魔圈与小球的碰撞

    requestAnimationFrame(loop);     // 继续下一个帧
}

// 启动游戏循环
loop();

