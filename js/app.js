// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random() * 220;
    this.x = x;
    this.y = y;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x  + this.speed * dt;
    if(this.x > 500){
        this.x = 0
    }
    
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 410;
    this.update = function() {

    };
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        var isResetPlayer = checkCollision(allEnemies, player);
        // player和Enemy碰撞后,player返回初始点
        if(isResetPlayer){
            this.x = 200;
            this.y = 410;
        }
    };
    this.handleInput = function(e) {
        // 控制player移动,及检测是否在可视区域
        switch (e) {
            case 'up':
                this.y -= 85;
                if(this.y < 20){
                    this.y = 410;
                }
                break;
            case 'down':
                if(this.y < 410){
                    this.y += 85;
                }
                break;
            case 'left':
                if(this.x > 20){
                    this.x -= 98;
                }
                break;
            case 'right':
                if(this.x < 396){
                    this.x += 98;
                }
                break;
            default:
                break;
        }
    }
};

// 检测是否碰撞
var checkCollision = function(enemies, player) {
    for(var i = 0; i < enemies.length; i++){
        var res = (enemies[i].x - player.x) * (enemies[i].x - player.x) + (enemies[i].y - player.y) * (enemies[i].y - player.y);
        if(Math.sqrt(res) < 75){
            return true;
        }
    }
    return false;
};


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy(100 * i, 60 + 85 * (i));
    allEnemies.push(enemy);
}
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
