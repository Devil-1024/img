
document.getElementById('image1').addEventListener('click', function() {
var overlay = document.getElementById('overlay');
var zoomedImage = document.getElementById('zoomedImage');

// 设置显示遮罩层
overlay.style.display = 'flex';

// 设置放大图片的源
zoomedImage.src = this.src;   //this指向getElementById中的id
});

document.getElementById('image2').addEventListener('click', function() {
var overlay = document.getElementById('overlay');
var zoomedImage = document.getElementById('zoomedImage');

// 显示遮罩层
overlay.style.display = 'flex';

// 设置放大图片的源
zoomedImage.src = this.src;
});

document.getElementById('image3').addEventListener('click', function() {
var overlay = document.getElementById('overlay');
var zoomedImage = document.getElementById('zoomedImage');

// 显示遮罩层
overlay.style.display = 'flex';

// 设置放大图片的源
zoomedImage.src = this.src;
});

document.getElementById('image4').addEventListener('click', function() {
var overlay = document.getElementById('overlay');
var zoomedImage = document.getElementById('zoomedImage');

// 显示遮罩层
overlay.style.display = 'flex';

// 设置放大图片的源
zoomedImage.src = this.src;
});

document.getElementById('image5').addEventListener('click', function() {
var overlay = document.getElementById('overlay');
var zoomedImage = document.getElementById('zoomedImage');

// 显示遮罩层
overlay.style.display = 'flex';

// 设置放大图片的源
zoomedImage.src = this.src;
});

document.getElementById('image6').addEventListener('click', function() {
var overlay = document.getElementById('overlay');
var zoomedImage = document.getElementById('zoomedImage');

// 显示遮罩层
overlay.style.display = 'flex';

// 设置放大图片的源
zoomedImage.src = this.src;
});

// 当点击遮罩层时关闭它然后显示出放在其中的放大版照片
document.getElementById('overlay').addEventListener('click', function() {
this.style.display = 'none';
});