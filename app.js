phina.globalize();

const version = "1.0";

const BATTLE_TIME = 150;
let countdownMax = BATTLE_TIME;
let countdown = BATTLE_TIME;

let myLevel = 1;

const STORAGE_KEY = {
    LEVEL: "jintori-level",
    DATA: "jintori-data",
    ENEMY_WORK: "jintori-enemy-work",
    WORK: "jintori-work",
};

ASSETS = {
    image: {
        "logo": "img/logo.png",
        "title": "img/title.png",

        "empty": "img/blocks/empty.png",
        "start": "img/blocks/start.png",
        "arrowOK1": "img/blocks/arrowOK1.png",
        "arrowOK2": "img/blocks/arrowOK2.png",
        "arrowNG1": "img/blocks/arrowNG1.png",
        "arrowNG2": "img/blocks/arrowNG2.png",
        "forward": "img/blocks/forward.png",
        "turnRight": "img/blocks/turnRight.png",
        "turnLeft": "img/blocks/turnLeft.png",
        "goBack": "img/blocks/goBack.png",
        "non": "img/blocks/non.png",
        "stop": "img/blocks/stop.png",
        "random1": "img/blocks/random1.png",
        "myArea": "img/blocks/myArea.png",
        "putStone": "img/blocks/putStone.png",
        "watch": "img/blocks/watch.png",
        "flagAon": "img/blocks/flagAon.png",
        "flagAoff": "img/blocks/flagAoff.png",
        "flagACheck": "img/blocks/flagACheck.png",
        "flagBon": "img/blocks/flagBon.png",
        "flagBoff": "img/blocks/flagBoff.png",
        "flagBCheck": "img/blocks/flagBCheck.png",
        "enemy": "img/blocks/enemy.png",
        "turnToEnemy": "img/blocks/turnToEnemy.png",
        "goRight": "img/blocks/goRight.png",
        "goLeft": "img/blocks/goLeft.png",
        "stopRight": "img/blocks/stopRight.png",
        "stopLeft": "img/blocks/stopLeft.png",
        "enemyDistance": "img/blocks/enemyDistance.png",
        "checkStone": "img/blocks/checkStone.png",
        "startSub": "img/blocks/startSub.png",
        "gotoSub": "img/blocks/gotoSub.png",
        "enemyArea": "img/blocks/enemyArea.png",
        "stone": "img/blocks/stone.png",
        "enemyStone": "img/blocks/enemyStone.png",
        "turnToGo": "img/blocks/turnToGo.png",
        "checkFlower": "img/blocks/checkFlower.png",
        "forwardFlower": "img/blocks/flower.png",
        "away": "img/blocks/away.png",

        "checked": "img/blocks/checked.png",

        "player": "img/player.png",
        "enemy1": "img/enemy1.png",
        "enemy2": "img/enemy2.png",
        "enemy3": "img/enemy3.png",
        "enemy4": "img/enemy4.png",
        "green": "img/green.png",
        "flower": "img/flower.png",
        "wall": "img/wall.png",
        "white": "img/white.png",
        "black": "img/black.png",
        "whiteStone": "img/whiteStone.png",
        "blackStone": "img/blackStone.png",
        "lock": "img/lock.png",
        "howToArrow": "img/howToArrow.png",
        "question": "img/question.png",
        "exclamation": "img/exclamation.png",
    },
    spritesheet: {
        "nekoSpriteSheet": "neko.json",
    }
};

const BLOCK_NAME = {
    empty: "A",
    non: "B",
    forward: "C",
    turnRight: "D",
    turnLeft: "E",
    stop: "F",
    random1: "G",
    myArea: "H",
    putStone: "I",
    goBack: "J",
    watch: "K",
    flagAon: "L",
    flagACheck: "M",
    enemy: "N",
    turnToEnemy: "O",
    flagBon: "P",
    flagBCheck: "Q",
    goRight: "R",
    goLeft: "S",
    stopRight: "T",
    stopLeft: "U",
    flagAoff: "V",
    flagBoff: "W",
    enemyDistance: "X",
    checkStone: "Y",
    start: "Z",
    startSub: "a",
    gotoSub: "b",
    enemyArea: "c",
    enemyStone: "d",
    turnToGo: "e",
    checkFlower: "f",
    forwardFlower: "g",
    away: "h",
};


phina.define('TitleScene', {
    superClass: 'DisplayScene',
  
    init: function(options) {
        this.superInit(options);

        const self = this;

        this.backgroundColor = "pink";

        const blocks = [];
        for (key in BLOCK_NAME) {
            blocks.push(key);
        }

        const gridX = Grid({
            columns: this.width / 64,
            width: this.width
        });
        const gridY = Grid({
            columns: this.height / 64,
            width: this.height
        });

        for (let x = 0; x < gridX.columns; x = x + 1) {
            for (let y = 0; y < gridY.columns; y = y + 1) {
                const i = Math.floor(Math.random() * blocks.length);
                const b = Sprite(blocks[i]).addChildTo(this).setPosition(gridX.span(x) + 32, gridY.span(y) + 32);
                b.alpha = 0.1;
            }
        }

        Sprite("logo").addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(-1));
        Sprite("title").addChildTo(this).setPosition(this.gridX.center(-0.2), this.gridY.center(-2.9));

        Label({
            text: "TAP TO START",
            fill: "black",
            fontWeight: 800,
            fontSize: 27,
            // stroke: "white",
            // strokeWidth: 1,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(12));

        this.on("pointstart", function() {
            if (stop) {
                stop = false;
                return;
            }
            self.exit("EnemySelectScene");
        });

        let stop = false;

        BasicButton({
            width: 300,
            height: 60,
            text: "初期化（開発用）",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(6.5))
        .on("pointstart", function(e) {
            myLevel = 1;
            localStorage.removeItem(STORAGE_KEY.LEVEL);
            localStorage.removeItem(STORAGE_KEY.WORK);
            localStorage.removeItem(STORAGE_KEY.ENEMY_WORK);
            playerProgram = Program("player", false);
            alert("倉庫以外を初期状態に戻しました。");
            stop = true;
        });

        const query = new URLSearchParams(window.location.search);

        if (query.has("data")) {
            setTimeout(function() {
                App.pushScene(LoadURLScene({data: query.get("data")}));
            }, 100);
        }


    },

});

phina.define('EnemySelectScene', {
    superClass: 'DisplayScene',
  
    init: function(options) {
        this.superInit(options);

        const self = this;

        this.backgroundColor = "pink";

        let level = localStorage.getItem(STORAGE_KEY.LEVEL);
        if (level) {
            myLevel = Number(level);
        }


        Label({
            text: "対戦相手",
            fontSize: 40,
            fill: "black",
            fontWeight: 800,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(1));

        const enemy1_1Button = RectangleShape({
            width: this.gridX.unitWidth * 4,
            height: this.gridY.unitWidth * 3,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(-5), this.gridY.span(4))
        Label({
            text: "Lv.1",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy1_1Button).addChildTo(enemy1_1Button).setPosition(0, -30);
        const enemy1_1Sprite = Sprite("enemy1").addChildTo(enemy1_1Button).setPosition(0, 20);
        const enemy1_1SS = FrameAnimation('nekoSpriteSheet')
        enemy1_1SS.attachTo(enemy1_1Sprite);
        enemy1_1SS.gotoAndPlay("south");
        enemy1_1Button.setInteractive(true);
        enemy1_1Button.on("pointstart", function() {
            enemyProgram = new Program("enemy", false);
            enemyProgram.import("0yvK5hN4cCOGJeCUvnIzvTNdUdNDADpLuCJgPGMGBIWqbR");
            self.exit("BattleScene", {trainingMode: false, enemyLevel: 1});
        });

        const enemy1_2Button = RectangleShape({
            width: this.gridX.unitWidth * 4,
            height: this.gridY.unitWidth * 3,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4))
        Label({
            text: "Lv.2",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy1_2Button).addChildTo(enemy1_2Button).setPosition(0, -30);
        const enemy1_2Sprite = Sprite("enemy1").addChildTo(enemy1_2Button).setPosition(0, 20);
        const enemy1_2SS = FrameAnimation('nekoSpriteSheet')
        enemy1_2SS.attachTo(enemy1_2Sprite);
        enemy1_2SS.gotoAndPlay("south");
        if (myLevel < 2) {
            enemy1_2Button.alpha = 0.5;
            Sprite("lock").addChildTo(this).setPosition(enemy1_2Button.x, enemy1_2Button.y);
        } else {
            enemy1_2Button.setInteractive(true);
            enemy1_2Button.on("pointstart", function() {
                enemyProgram = new Program("enemy", false);
                enemyProgram.import("0yvK5hN4cCOGJeCUvnIzvTNdUQOClGeGSvwVXp5pM7DgODUjAs6VNc");
                self.exit("BattleScene", {trainingMode: false, enemyLevel: 2});
            });
        }

        const enemy1_3Button = RectangleShape({
            width: this.gridX.unitWidth * 4,
            height: this.gridY.unitWidth * 3,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(5), this.gridY.span(4))
        Label({
            text: "Lv.3",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy1_3Button).addChildTo(enemy1_3Button).setPosition(0, -30);
        const enemy1_3Sprite = Sprite("enemy1").addChildTo(enemy1_3Button).setPosition(0, 20);
        const enemy1_3SS = FrameAnimation('nekoSpriteSheet')
        enemy1_3SS.attachTo(enemy1_3Sprite);
        enemy1_3SS.gotoAndPlay("south");
        if (myLevel < 3) {
            enemy1_3Button.alpha = 0.5;
            Sprite("lock").addChildTo(this).setPosition(enemy1_3Button.x, enemy1_3Button.y);
        } else {
            enemy1_3Button.setInteractive(true);
            enemy1_3Button.on("pointstart", function() {
                enemyProgram = new Program("enemy", false);
                enemyProgram.import("0yvK5hN4cCOGJeCXhs8P2Wa6g5KykIeyOMdQAakYzAFe82suYNaTsWV2EZnMD1mXAdAhZthkueWPnYxioWOKlEziWGSgFnpNCYk");
                self.exit("BattleScene", {trainingMode: false, enemyLevel: 3});
            });
        }

        const enemy2_1Button = RectangleShape({
            width: this.gridX.unitWidth * 4,
            height: this.gridY.unitWidth * 3,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(-5), this.gridY.span(8))
        Label({
            text: "Lv.4",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy2_1Button).addChildTo(enemy2_1Button).setPosition(0, -30);
        const enemy2_1Sprite = Sprite("enemy2").addChildTo(enemy2_1Button).setPosition(0, 20);
        const enemy2_1SS = FrameAnimation('nekoSpriteSheet')
        enemy2_1SS.attachTo(enemy2_1Sprite);
        enemy2_1SS.gotoAndPlay("south");
        if (myLevel < 4) {
            enemy2_1Button.alpha = 0.5;
            Sprite("lock").addChildTo(this).setPosition(enemy2_1Button.x, enemy2_1Button.y);
        } else {
            enemy2_1Button.setInteractive(true);
            enemy2_1Button.on("pointstart", function() {
                enemyProgram = new Program("enemy", false);
                enemyProgram.import("0yvK5hN4cCOFEQP1sIHQ7j8C0hKQRAl4NzlT9wKIjitga9sPZtRj5L9iNPqgE3ZoZ3UTl2CJxDBAW_YYCxIb3ziAgC1EfsmNyATH_YS");
                self.exit("BattleScene", {trainingMode: false, enemyLevel: 4});
            });
        }

        const enemy2_2Button = RectangleShape({
            width: this.gridX.unitWidth * 4,
            height: this.gridY.unitWidth * 3,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(8))
        Label({
            text: "Lv.5",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy2_2Button).addChildTo(enemy2_2Button).setPosition(0, -30);
        const enemy2_2Sprite = Sprite("enemy2").addChildTo(enemy2_2Button).setPosition(0, 20);
        const enemy2_2SS = FrameAnimation('nekoSpriteSheet')
        enemy2_2SS.attachTo(enemy2_2Sprite);
        enemy2_2SS.gotoAndPlay("south");
        if (myLevel < 5) {
            enemy2_2Button.alpha = 0.5;
            Sprite("lock").addChildTo(this).setPosition(enemy2_2Button.x, enemy2_2Button.y);
        } else {
            enemy2_2Button.setInteractive(true);
            enemy2_2Button.on("pointstart", function() {
                enemyProgram = new Program("enemy", false);
                enemyProgram.import("");
                self.exit("BattleScene", {trainingMode: false, enemyLevel: 5});
            });
        }

        const enemy2_3Button = RectangleShape({
            width: this.gridX.unitWidth * 4,
            height: this.gridY.unitWidth * 3,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(5), this.gridY.span(8))
        Label({
            text: "Lv.6",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy2_3Button).addChildTo(enemy2_3Button).setPosition(0, -30);
        const enemy2_3Sprite = Sprite("enemy2").addChildTo(enemy2_3Button).setPosition(0, 20);
        const enemy2_3SS = FrameAnimation('nekoSpriteSheet')
        enemy2_3SS.attachTo(enemy2_3Sprite);
        enemy2_3SS.gotoAndPlay("south");
        if (myLevel < 6) {
            enemy2_3Button.alpha = 0.5;
            Sprite("lock").addChildTo(this).setPosition(enemy2_3Button.x, enemy2_3Button.y);
        } else {
            enemy2_3Button.setInteractive(true);
            enemy2_3Button.on("pointstart", function() {
                enemyProgram = new Program("enemy", false);
                enemyProgram.import("");
                self.exit("BattleScene", {trainingMode: false, enemyLevel: 6});
            });
        }

        const enemy3_1Button = RectangleShape({
            width: this.gridX.unitWidth * 4,
            height: this.gridY.unitWidth * 3,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(-5), this.gridY.span(12))
        Label({
            text: "Lv.7",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy3_1Button).addChildTo(enemy3_1Button).setPosition(0, -30);
        const enemy3_1Sprite = Sprite("enemy3").addChildTo(enemy3_1Button).setPosition(0, 20);
        const enemy3_1SS = FrameAnimation('nekoSpriteSheet')
        enemy3_1SS.attachTo(enemy3_1Sprite);
        enemy3_1SS.gotoAndPlay("south");
        if (myLevel < 7) {
            enemy3_1Button.alpha = 0.5;
            Sprite("lock").addChildTo(this).setPosition(enemy3_1Button.x, enemy3_1Button.y);
        } else {
            enemy3_1Button.setInteractive(true);
            enemy3_1Button.on("pointstart", function() {
                enemyProgram = new Program("enemy", false);
                enemyProgram.import("");
                self.exit("BattleScene", {trainingMode: false, enemyLevel: 7});
            });
        }

        const enemy3_2Button = RectangleShape({
            width: this.gridX.unitWidth * 4,
            height: this.gridY.unitWidth * 3,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(12))
        Label({
            text: "Lv.8",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy3_2Button).addChildTo(enemy3_2Button).setPosition(0, -30);
        const enemy3_2Sprite = Sprite("enemy3").addChildTo(enemy3_2Button).setPosition(0, 20);
        const enemy3_2SS = FrameAnimation('nekoSpriteSheet')
        enemy3_2SS.attachTo(enemy3_2Sprite);
        enemy3_2SS.gotoAndPlay("south");
        if (myLevel < 8) {
            enemy3_2Button.alpha = 0.5;
            Sprite("lock").addChildTo(this).setPosition(enemy3_2Button.x, enemy3_2Button.y);
        } else {
            enemy3_2Button.setInteractive(true);
            enemy3_2Button.on("pointstart", function() {
                enemyProgram = new Program("enemy", false);
                enemyProgram.import("");
                self.exit("BattleScene", {trainingMode: false, enemyLevel: 8});
            });
        }

        const enemy3_3Button = RectangleShape({
            width: this.gridX.unitWidth * 4,
            height: this.gridY.unitWidth * 3,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(5), this.gridY.span(12))
        Label({
            text: "フリー",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy3_3Button).addChildTo(enemy3_3Button).setPosition(0, -30);
        const enemy3_3Sprite = Sprite("enemy4").addChildTo(enemy3_3Button).setPosition(0, 20);
        const enemy3_3SS = FrameAnimation('nekoSpriteSheet')
        enemy3_3SS.attachTo(enemy3_3Sprite);
        enemy3_3SS.gotoAndPlay("south");
        enemy3_3Button.setInteractive(true);
        enemy3_3Button.on("pointstart", function() {
            self.exit("BattleScene", {trainingMode: true, enemyLevel: 10});
        });

        BasicButton({
            width: 200,
            height: 60,
            text: "タイトルへ",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(7))
        .on("pointstart", function() {
            self.exit("TitleScene");
        });

    }
});

phina.define('GameScene', {
    superClass: 'DisplayScene',

    init: function(options) {
        this.superInit(options);

        const self = this;

    },
});


// ブロック選択シーン
phina.define('BlockSelectScene', {
    superClass: 'DisplayScene',
    init: function(params) {
  
        const self = this;

        this.superInit();

        let arrowOK = params.block.arrowOK;
        let arrowNG = params.block.arrowNG;

        if (params.block.name === BLOCK_NAME.empty) {
            arrowOK = "down";
            arrowNG = "right";
        }

        // ウインドウ
        RectangleShape({
            x: this.gridX.center(),
            y: this.gridY.center(),
            width: this.width - 50,
            height: this.height - 50,
            fill: "white",
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
        }).addChildTo(this);

        // 選択しているブロック画像
        let selectedBlock = Block({
            name: params.block.name,
            sampleMode: true,
            arrowOK: arrowOK,
            arrowNG: arrowNG,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(1.3));

        // 説明文
        let description = LabelArea({
            text: params.block.description,
            width: 500,
            height: 100,
            fontSize: 30,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(3));

        // タイトル
        let titleLabel = Label({
            text: params.block.title,
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(this).setPosition(this.gridX.center(-4), this.gridY.span(1.1));

        // 消費ターン
        let turnLabel = Label({
            text: "消費ターン数：" + params.block.turn,
            fontSize: 20,
        }).addChildTo(this).setPosition(this.gridX.center(-4), this.gridY.span(1.6));

        // 青矢印ボタン
        const arrowOKButton = RectangleShape({
            width: 80,
            height: 60,
            fill: "white",
            cornerRadius: 8,
            strokeWidth: 8,
            stroke: "black",
        }).addChildTo(self).setPosition(self.gridX.center(2.5), self.gridY.span(1.3)).hide();
        Label({
            text: "  回転",
            fontSize: 20,
            fontWeight: 800,
        }).addChildTo(arrowOKButton);
        arrowOKButton.setInteractive(true);
        arrowOKButton.on("pointstart", function() {
            selectedBlock.changeArrowOKDirection();
            arrowOK = selectedBlock.arrowOK;
        });
        Sprite("arrowOK1").addChildTo(arrowOKButton).setPosition(-23, -5);

        // 赤矢印ボタン
        const arrowNGButton = RectangleShape({
            width: 80,
            height: 60,
            fill: "white",
            cornerRadius: 8,
            strokeWidth: 8,
            stroke: "black",
        }).addChildTo(self).setPosition(self.gridX.center(5), self.gridY.span(1.3)).hide();
        Label({
            text: "  回転",
            fontSize: 20,
            fontWeight: 800,
        }).addChildTo(arrowNGButton);
        arrowNGButton.setInteractive(true);
        arrowNGButton.on("pointstart", function() {
            selectedBlock.changeArrowNGDirection();
            arrowNG = selectedBlock.arrowNG;
        });
        Sprite("arrowNG1").addChildTo(arrowNGButton).setPosition(-23, -5);

        // 矢印ボタンの表示制御
        function showArrow() {
            if (selectedBlock.name !== BLOCK_NAME.empty) {
                arrowOKButton.show();
                if (selectedBlock.doubleArrow) {
                    arrowNGButton.show();
                } else {
                    arrowNGButton.hide();
                }
            } else {
                arrowOKButton.hide();
                arrowNGButton.hide();
            }
        }

        showArrow();

        // ブロックを並べる
        function addSampleBlock(panel, name, x, y) {
            const block = Block({name: name, sampleMode: true, hideArrows: true});
            block.addChildTo(panel);
            block.setPosition(x, y);
            block.on("pointstart", () => {
                selectedBlock.changeBlock(block.name, true, arrowOK, arrowNG);
                description.text = block.description;
                titleLabel.text = block.title;
                turnLabel.text = "消費ターン数：" + block.turn;
                showArrow();
            });
        }

        const blockPanel1 = RectangleShape({
            width: this.width - 120,
            height: 550,
            x: this.gridX.center(),
            y: this.gridY.center(1),
            fill: "white",
            cornerRadius: 10,
        }).addChildTo(this);
        Label({
            text: "基本チップ",
            fontSize: 35,
            fontWeight: 800,
        }).addChildTo(blockPanel1).setPosition(0, -170);

        BasicButton({
            width: 200,
            height: 50,
            text: "応用チップ >",
        }).addChildTo(blockPanel1).setPosition(150, -240)
        .on("pointstart", function() {
            blockPanel1.tweener.to({x: self.gridX.center(-15)}, 200).play();
            blockPanel2.tweener.to({x: self.gridX.center()}, 200).play();
        });

        BasicButton({
            width: 200,
            height: 50,
            text: "< 便利チップ",
        }).addChildTo(blockPanel1).setPosition(-150, -240)
        .on("pointstart", function() {
            blockPanel1.tweener.to({x: self.gridX.center(15)}, 200).play();
            blockPanel3.tweener.to({x: self.gridX.center()}, 200).play();
        });

        addSampleBlock(blockPanel1, BLOCK_NAME.empty, (64 + 30) * (-2), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.non, (64 + 30) * (-1), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.forward, (64 + 30) * (0), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.goRight, (64 + 30) * (1), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.goLeft, (64 + 30) * (2), (64 + 30) * (-2) + 100);

        addSampleBlock(blockPanel1, BLOCK_NAME.goBack, (64 + 30) * (-2), (64 + 30) * (-1) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.turnRight, (64 + 30) * (-1), (64 + 30) * (-1) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.turnLeft, (64 + 30) * (0), (64 + 30) * (-1) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.putStone, (64 + 30) * (1), (64 + 30) * (-1) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.stop, (64 + 30) * (2), (64 + 30) * (-1) + 100);

        addSampleBlock(blockPanel1, BLOCK_NAME.stopRight, (64 + 30) * (-2), (64 + 30) * (0) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.stopLeft, (64 + 30) * (-1), (64 + 30) * (0) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.checkStone, (64 + 30) * (0), (64 + 30) * (0) + 100);
        addSampleBlock(blockPanel1, BLOCK_NAME.random1, (64 + 30) * (1), (64 + 30) * (0) + 100);

        const blockPanel2 = RectangleShape({
            width: this.width - 120,
            height: 550,
            x: this.gridX.center(15),
            y: this.gridY.center(1),
            fill: "white",
            cornerRadius: 10,
        }).addChildTo(this);
        Label({
            text: "応用チップ",
            fontSize: 35,
            fontWeight: 800,
        }).addChildTo(blockPanel2).setPosition(0, -170);

        BasicButton({
            width: 200,
            height: 50,
            text: "< 基本チップ",
        }).addChildTo(blockPanel2).setPosition(-150, -240)
        .on("pointstart", function() {
            blockPanel2.tweener.to({x: self.gridX.center(15)}, 200).play();
            blockPanel1.tweener.to({x: self.gridX.center()}, 200).play();
        });

        addSampleBlock(blockPanel2, BLOCK_NAME.gotoSub, (64 + 30) * (-2), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.flagAon, (64 + 30) * (-1), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.flagAoff, (64 + 30) * (0), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.flagBon, (64 + 30) * (1), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.flagBoff, (64 + 30) * (2), (64 + 30) * (-2) + 100);

        addSampleBlock(blockPanel2, BLOCK_NAME.flagACheck, (64 + 30) * (-2), (64 + 30) * (-1) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.flagBCheck, (64 + 30) * (-1), (64 + 30) * (-1) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.myArea, (64 + 30) * (0), (64 + 30) * (-1) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.enemyArea, (64 + 30) * (1), (64 + 30) * (-1) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.enemy, (64 + 30) * (2), (64 + 30) * (-1) + 100);

        addSampleBlock(blockPanel2, BLOCK_NAME.enemyDistance, (64 + 30) * (-2), (64 + 30) * (0) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.watch, (64 + 30) * (-1), (64 + 30) * (0) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.enemyStone, (64 + 30) * (0), (64 + 30) * (0) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.stone, (64 + 30) * (1), (64 + 30) * (0) + 100);
        addSampleBlock(blockPanel2, BLOCK_NAME.checkFlower, (64 + 30) * (2), (64 + 30) * (0) + 100);

        addSampleBlock(blockPanel2, BLOCK_NAME.forwardFlower, (64 + 30) * (-2), (64 + 30) * (1) + 100);

        const blockPanel3 = RectangleShape({
            width: this.width - 120,
            height: 550,
            x: this.gridX.center(-15),
            y: this.gridY.center(1),
            fill: "white",
            cornerRadius: 10,
        }).addChildTo(this);
        Label({
            text: "便利チップ",
            fontSize: 35,
            fontWeight: 800,
        }).addChildTo(blockPanel3).setPosition(0, -170);

        BasicButton({
            width: 200,
            height: 50,
            text: "基本チップ >",
        }).addChildTo(blockPanel3).setPosition(150, -240)
        .on("pointstart", function() {
            blockPanel3.tweener.to({x: self.gridX.center(-15)}, 200).play();
            blockPanel1.tweener.to({x: self.gridX.center()}, 200).play();
        });

        addSampleBlock(blockPanel3, BLOCK_NAME.turnToGo, (64 + 30) * (-2), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel3, BLOCK_NAME.turnToEnemy, (64 + 30) * (-1), (64 + 30) * (-2) + 100);
        addSampleBlock(blockPanel3, BLOCK_NAME.away, (64 + 30) * (0), (64 + 30) * (-2) + 100);

        const submitButton = BasicButton({
            text: "決定",
            width: 160,
            height: 50,
            primary: true,
        })
        .addChildTo(self).setPosition(self.gridX.center(-3), self.gridY.span(14.5))
        .on("pointstart", function() {
            params.block.changeBlock(selectedBlock.name, false, selectedBlock.arrowOK, selectedBlock.arrowNG);
            self.exit();
        });
        submitButton.setInteractive(true);

        const cancelButton = BasicButton({
            text: "キャンセル",
            width: 160,
            height: 50,
        })
        .addChildTo(self).setPosition(self.gridX.center(3), self.gridY.span(14.5))
        .on("pointstart", function() {
            self.exit();
        });
        cancelButton.setInteractive(true);
    },
});

// ねこ
phina.define("Cat", {
    superClass: 'Sprite',
    init: function(param) {
  
        const self = this;

        let img;

        if (param.playerOrEnemy === "player") {
            img = "player";
        } else if (param.playerOrEnemy === "enemy") {
            self.playerOrEnemy = "player";
            img = "enemy" + Math.ceil(param.enemyLevel / 3);
        }
        
        this.superInit(img);

        const moveSpeed = 450;

        self.nx = param.x;
        self.ny = param.y;
        self.direction = param.direction;
        self.playerOrEnemy = param.playerOrEnemy;

        const ss = FrameAnimation('nekoSpriteSheet')
        ss.attachTo(this);
        ss.gotoAndPlay(self.direction);

        this.addChildTo(param.catPanel);
        this.setPosition(param.field.gridX.span(self.nx), param.field.gridY.span(self.ny));

        // なにかにぶつかる？
        self.bumpSomething = function (direction, rightOrLeft) {
            let x = self.nx, y = self.ny;
            if (direction === "north") {
                y -= 1;
                if (rightOrLeft === "right") {
                    x += 1;
                } else if (rightOrLeft === "left") {
                    x -= 1;
                }
            } else if (direction === "east") {
                x += 1;
                if (rightOrLeft === "right") {
                    y += 1;
                } else if (rightOrLeft === "left") {
                    y -= 1;
                }
            } else if (direction === "south") {
                y += 1;
                if (rightOrLeft === "right") {
                    x -= 1;
                } else if (rightOrLeft === "left") {
                    x += 1;
                }
            } else if (direction === "west") {
                x -= 1;
                if (rightOrLeft === "right") {
                    y -= 1;
                } else if (rightOrLeft === "left") {
                    y += 1;
                }
            }
            // 外壁
            if (battleField[y][x] && battleField[y][x].name === "wall") {
                return true;
            }
            // 猫同士
            if (param.catPanel.enemy) {
                if (param.playerOrEnemy === "player") {
                    if (x === param.catPanel.enemy.nx && y === param.catPanel.enemy.ny) {
                        return true;
                    }
                } else {
                    if (x === param.catPanel.player.nx && y === param.catPanel.player.ny) {
                        return true;
                    }
                }
            }
            // 敵の陣地
            if (battleField[y][x] && battleField[y][x].name === "black" && param.playerOrEnemy === "player") {
                return true;
            }
            if (battleField[y][x] && battleField[y][x].name === "white" && param.playerOrEnemy === "enemy") {
                return true;
            }
            // おじゃま石
            if (battleField[y][x] && battleField[y][x].name === "blackStone" && param.playerOrEnemy === "player") {
                return true;
            }
            if (battleField[y][x] && battleField[y][x].name === "whiteStone" && param.playerOrEnemy === "enemy") {
                return true;
            }
            return false;
        };

        // 石を置く
        self.putStone = function () {

            let color;

            if (param.playerOrEnemy === "player") {
                color = "white";
            } else {
                color = "black";
            }

            // すでに自分の石があるなら置けないので終了
            if (battleField[self.ny][self.nx] && battleField[self.ny][self.nx].name === color + "Stone") {
                // 「！」を出すアニメーション
                const exclamation = Sprite("exclamation").addChildTo(param.catPanel);
                exclamation.setPosition(param.field.gridX.span(self.nx), param.field.gridY.span(self.ny));
                setTimeout(function() { exclamation.remove()}, 400);
                return;
            }

            // 石を置く
            createArea(self.nx, self.ny);
            putStoneAnimation(color);
            battleField[self.ny][self.nx].name = color + "Stone";

            addArea(self.nx, self.ny);

            if (self.ny - 1 > 0) {
                addArea(self.nx, self.ny - 1);
            }
            if (self.ny + 1 < 12) {
                addArea(self.nx, self.ny + 1);
            }
            if (self.nx - 1 > 0) {
                addArea(self.nx - 1, self.ny);
            }
            if (self.nx + 1 < 9) {
                addArea(self.nx + 1, self.ny);
            }

            if (self.nx - 1 > 0 && self.ny - 1 > 0) {
                addArea(self.nx - 1, self.ny - 1);
            }
            if (self.nx - 1 > 0 && self.ny + 1 < 12) {
                addArea(self.nx - 1, self.ny + 1);
            }
            if (self.nx + 1 < 9 && self.ny - 1 > 0) {
                addArea(self.nx + 1, self.ny - 1);
            }
            if (self.nx + 1 < 9 && self.ny + 1 < 12) {
                addArea(self.nx + 1, self.ny + 1);
            }
 
        };

        // 石を置いたときのアニメーション
        function putStoneAnimation(color) {
            const stone = Sprite(color + "Stone").addChildTo(param.field)
                .setPosition(param.field.gridX.span(self.nx), param.field.gridY.span(self.ny) - 50);
            stone.tweener
                .to({y: param.field.gridY.span(self.ny)}, 100)
                .rotateTo(-20, 50)
                .rotateTo(40, 100)
                .rotateTo(-40, 100)
                .rotateTo(40, 100)
                .rotateTo(-40, 100)
                .rotateTo(20, 50)
                .rotateTo(-20, 50)
                .rotateTo(20, 50)
                .rotateTo(-20, 50)
                .rotateTo(0, 50)
                .play();
        }

        // 目の前のフィールドのname
        self.getForwardFieldName = function(direction) {
            let x = self.nx, y = self.ny;
            if (direction === "north") {
                y -= 1;
            } else if (direction === "east") {
                x += 1;
            } else if (direction === "south") {
                y += 1;
            } else if (direction === "west") {
                x -= 1;
            }
            if (!battleField[y][x]) {
                return "green";
            }
            return battleField[y][x].name;
        };

        // 足元のフィールドのname
        self.getFieldName = function() {
            if (!battleField[self.ny][self.nx]) {
                return "green";
            }
            return battleField[self.ny][self.nx].name;
        };

        // 目の前のフィールドが花壇かどうか
        self.checkForwardFieldFlower = function(direction) {
            let x = self.nx, y = self.ny;
            if (direction === "north") {
                y -= 1;
            } else if (direction === "east") {
                x += 1;
            } else if (direction === "south") {
                y += 1;
            } else if (direction === "west") {
                x -= 1;
            }
            // 座標が花壇の範囲なら
            if (x < 2 || x > 7 || y < 2 || y > 10) {
                return true;
            }
            return false;
        };

        // 足元が花壇かどうか
        self.checkFieldFlower = function() {
            // 座標が花壇の範囲なら
            if (self.nx < 2 || self.nx > 7 || self.ny < 2 || self.ny > 10) {
                return true;
            }
            return false;
        };

        self.setDirection = function(direction) {
            self.direction = direction;
            if (direction === "north") {
                ss.gotoAndPlay("north");
            } else if (direction === "east") {
                ss.gotoAndPlay("east");
            } else if (direction === "south") {
                ss.gotoAndPlay("south");
            } else if (direction === "west") {
                ss.gotoAndPlay("west");
            }
        };

        function createArea(x, y) {
            let color;
            if (param.playerOrEnemy === "player") {
                color = "white";
            } else {
                color = "black";
            }
            const area = Sprite(color).addChildTo(param.field)
                .setPosition(param.field.gridX.span(x), param.field.gridY.span(y));
            area.setScale(0.1);
            area.tweener.scaleTo(1, 200).play();
            area.alpha = 0.7;
            area.level = 0;
            area.name = color;
            battleField[y][x] = area;
        }

        // 自分の陣地にする
        function addArea(x, y) {

            let color, enemyColor;
            if (param.playerOrEnemy === "player") {
                color = "white";
                enemyColor = "black";
            } else {
                color = "black";
                enemyColor = "white";
            }

            // どちらの陣地でもない場合、単純に自分の陣地にできる
            if (!battleField[y][x]) {
                createArea(x, y);
                return;
            }

            // 敵の石がある場合、なにもできない
            if (battleField[y][x].name === enemyColor + "Stone") {
                return;
            }

            // すでに自分の石がある場合、透明度をなしにするだけ
            if (battleField[y][x].name === color + "Stone") {
                battleField[y][x].alpha = 1;
                return;
            }

            // すでに自分の陣地の場合、レベルを上げるだけ
            if (battleField[y][x].name === color) {
                battleField[y][x].level += 1;
                battleField[y][x].alpha = 0.7 + battleField[y][x].level * 0.1;
                return;
            }

            // 敵の陣地の場合、レベルを下げるか、相殺するか
            if (battleField[y][x].name === enemyColor) {
                if (battleField[y][x].level === 0) {
                    // 相殺
                    battleField[y][x].remove();
                    battleField[y][x] = null;
                } else {
                    battleField[y][x].level -= 1;
                    battleField[y][x].alpha = 0.7 + battleField[y][x].level * 0.1;
                }
                return;
            }

            throw("ここには到達しない");
        }

        // 前進

        function moving(direction, rightOrLeft, xx, yy) {
            if (self.bumpSomething(direction, rightOrLeft)) {
                self.tweener
                .to({
                    x: param.field.gridX.span(self.nx + xx/5),
                    y: param.field.gridY.span(self.ny + yy/5)
                }, moveSpeed/5)
                .call(function () {
                    const exclamatio = Sprite("exclamation").addChildTo(param.catPanel);
                    exclamatio.setPosition(param.field.gridX.span(self.nx), param.field.gridY.span(self.ny));
                    setTimeout(function() { exclamatio.remove()}, 400);
                })
                .to({
                    x: param.field.gridX.span(self.nx),
                    y: param.field.gridY.span(self.ny)
                }, 100)
                .call(function() {ss.gotoAndPlay(direction);})
                .play();
                return;
            }
            self.nx += xx;
            self.ny += yy;
            self.tweener
                .to({
                    x: param.field.gridX.span(self.nx),
                    y: param.field.gridY.span(self.ny)
                }, moveSpeed)
                .call(function() {
                    ss.gotoAndPlay(direction);
                })
                .play();
        }

        self.moveToNorth = function(rightOrLeft) {
            ss.gotoAndPlay("workToNorth");
            let xx = 0;
            let yy = -1;
            if (rightOrLeft === "right") {
                xx = 1;
            } else if (rightOrLeft === "left") {
                xx = -1;
            }
            moving("north", rightOrLeft, xx, yy);
        };

        self.moveToEast = function(rightOrLeft) {
            ss.gotoAndPlay("workToEast");
            let xx = 1;
            let yy = 0;
            if (rightOrLeft === "right") {
                yy = 1;
            } else if (rightOrLeft === "left") {
                yy = -1;
            }
            moving("east", rightOrLeft, xx, yy);
        };

        self.moveToWest = function(rightOrLeft) {
            ss.gotoAndPlay("workToWest");
            let xx = -1;
            let yy = 0;
            if (rightOrLeft === "right") {
                yy = -1;
            } else if (rightOrLeft === "left") {
                yy = 1;
            }
            moving("west", rightOrLeft, xx, yy);
        };

        self.moveToSouth = function(rightOrLeft) {
            ss.gotoAndPlay("workToSouth");
            let xx = 0;
            let yy = 1;
            if (rightOrLeft === "right") {
                xx = -1;
            } else if (rightOrLeft === "left") {
                xx = 1;
            }
            moving("south", rightOrLeft, xx, yy);
        };

        // 後退
        self.backToSouth = function() {
            ss.gotoAndPlay("workToNorth");
            if (self.bumpSomething("south")) {
                self.tweener
                .to({y: param.field.gridY.span(self.ny + 0.5)}, moveSpeed/2)
                .to({y: param.field.gridY.span(self.ny)}, 100)
                .call(function() {ss.gotoAndPlay("north");})
                .play();
                return;
            }
            self.tweener
                .to({y: param.field.gridY.span(self.ny + 1)}, moveSpeed)
                .call(function() {
                    self.ny += 1;
                    ss.gotoAndPlay("north");
                })
                .play();
        };

        self.backToNorth = function() {
            ss.gotoAndPlay("workToSouth");
            if (self.bumpSomething("north")) {
                self.tweener
                .to({y: param.field.gridY.span(self.ny - 0.5)}, moveSpeed/2)
                .to({y: param.field.gridY.span(self.ny)}, 100)
                .call(function() {ss.gotoAndPlay("south");})
                .play();
                return;
            }
            self.tweener
                .to({y: param.field.gridY.span(self.ny - 1)}, moveSpeed)
                .call(function() {
                    self.ny -= 1;
                    ss.gotoAndPlay("south");
                })
                .play();
        };

        self.backToWest = function() {
            ss.gotoAndPlay("workToEast");
            if (self.bumpSomething("west")) {
                self.tweener
                .to({x: param.field.gridX.span(self.nx - 0.5)}, moveSpeed/2)
                .to({x: param.field.gridX.span(self.nx)}, 100)
                .call(function() {ss.gotoAndPlay("east");})
                .play();
                return;
            }
            self.tweener
                .to({x: param.field.gridX.span(self.nx - 1)}, moveSpeed)
                .call(function() {
                    self.nx -= 1;
                    ss.gotoAndPlay("east");
                })
                .play();
        };

        self.backToEast = function() {
            ss.gotoAndPlay("workToWest");
            if (self.bumpSomething("east")) {
                self.tweener
                .to({x: param.field.gridX.span(self.nx + 0.5)}, moveSpeed/2)
                .to({x: param.field.gridX.span(self.nx)}, 100)
                .call(function() {ss.gotoAndPlay("west");})
                .play();
                return;
            }
            self.tweener
                .to({x: param.field.gridX.span(self.nx + 1)}, moveSpeed)
                .call(function() {
                    self.nx += 1;
                    ss.gotoAndPlay("west");
                })
                .play();
        };

    },
});

// バトルシーン
phina.define('BattleScene', {
    superClass: 'DisplayScene',
    init: function(param) {
  
        const self = this;

        this.superInit();

        this.backgroundColor = "green";

        this.uiLayer = DisplayElement().addChildTo(self);

        this.trainingMode = param.trainingMode;
        this.enemyLevel = param.enemyLevel;

        countdown = BATTLE_TIME;

        countdownMax = countdown;

        const fieldPanel = RectangleShape({
            width: 64 * 10,
            height: 64 * 13,
            x: self.gridX.center(),
            y: self.gridY.center(-1),
            fill: "gray",
            strokeWidth: 0,
        }).addChildTo(this.uiLayer);

        fieldPanel.gridX = Grid({
            width: fieldPanel.width,
            columns: 10,
            offset: fieldPanel.width / 2 * -1 + 32,
        });
        fieldPanel.gridY = Grid({
            width: fieldPanel.height,
            columns: 13,
            offset: fieldPanel.height / 2 * -1 + 32,
        });


        // ねこ配置用
        const catPanel = RectangleShape({
            width: 64 * 10,
            height: 64 * 13,
            x: self.gridX.center(),
            y: self.gridY.center(-1),
            fill: "transparent",
            strokeWidth: 0,
        }).addChildTo(this.uiLayer);

        // 陣地の数の表示
        const whiteAreaPanel = Sprite("white").addChildTo(this).setPosition(self.gridX.span(1.3), self.gridY.span(15));
        const blackAreaPanel = Sprite("black").addChildTo(this).setPosition(self.gridX.span(3.3), self.gridY.span(15));

        self.whiteAreaNumLabel = Label({fontSize:30,fontWeight:800, text: "0", fill: "black"}).addChildTo(this).setPosition(self.gridX.span(1.3), self.gridY.span(15));
        self.blackAreaNumLabel = Label({fontSize:30,fontWeight:800, text: "0", fill: "white"}).addChildTo(this).setPosition(self.gridX.span(3.3), self.gridY.span(15));

        // タップイベントの伝播をキャンセル
        let cancelEvent = false;

        // プログラミングボタン
        const playerEditButton = BasicButton({
            text: "プログラミング",
            width: 220,
            height: 50,
            primary: true,
        }).addChildTo(self).setPosition(self.gridX.center(), self.gridY.span(15));
        playerEditButton.setInteractive(true);
        playerEditButton.on("pointstart", function() {
            cancelEvent = true;
            App.pushScene(ProgramingScene({targetProgram: playerProgram, trainingMode: self.trainingMode, enemyLevel: param.enemyLevel, battleScene: self}));
        });

        // その他ボタン
        // const stepButton = BasicButton({
        //     text: "メニュー",
        //     width: 130,
        //     height: 50,
        // }).addChildTo(self).setPosition(self.gridX.span(13.5), self.gridY.span(15));
        // stepButton.setInteractive(true);
        // stepButton.on("pointstart", function() {
        //     App.pushScene(BattleMenuScene({battleScene: self}));
        // });
        this.setInteractive(true);
        this.on("pointstart", function() {
            if (cancelEvent) {
                cancelEvent = false;
                return;
            }
            App.pushScene(BattleMenuScene({battleScene: self}));
        });

        let step = 0;

        // プログラム１ターン実行
        self.applyOneStep = function(program, target, nonTarget) {

            const done = [];
            let cnt = 0;

            // 前回実行したブロックが2ターン必要な場合、skipフラグが立っている
            const block = program.getActiveBlock();
            if (block.skip) {
                block.skip = false;
                return;
            }

            applyOneStepRecursive(program, target, nonTarget);

            function applyOneStepRecursive(program, target, nonTarget) {
                const block = program.getActiveBlock();
                if (block === null) {
                    return;
                }
                if (block.name === BLOCK_NAME.empty) {
                    return;
                }
                // サブルーチン呼び出し
                if (block.name === BLOCK_NAME.gotoSub) {
                    program.startSubroutine(block);
                }
                if (block.applyProgram(target, nonTarget)) {
                    program.stepOK();
                } else {
                    program.stepNG();
                }

                if (block.turn === 0) {
                    // 既に実行済みのブロックがdone配列に存在する場合、
                    // 無限ループに入っているということなので中止する
                    if (block.name !== BLOCK_NAME.gotoSub && done.some(b =>  b === block)) {
                        cnt += 1;
                        // 50に特に意味はない。何度も繰り返されているなら無限ループしているとみなして中止する
                        if (cnt > 50) {
                            const question = Sprite("question").addChildTo(catPanel);
                            let x, y;
                            if (program === playerProgram) {
                                x = fieldPanel.gridX.span(self.player.nx);
                                y = fieldPanel.gridY.span(self.player.ny);
                            } else {
                                x = fieldPanel.gridX.span(self.enemy.nx);
                                y = fieldPanel.gridY.span(self.enemy.ny);
                            }
                            question.setPosition(x, y);
                            setTimeout(function() { question.remove()}, 400);
                            return;
                        }
                    }
                    done.push(block);
                    applyOneStepRecursive(program, target, nonTarget);
                }

                if (block.turn === 2) {
                    const nextBlock = program.getActiveBlock();
                    nextBlock.skip = true;
                }
            }
        };

        // フィールドの初期配置
        battleField = [];
        [...Array(13)].map(() => battleField.push([]));
        battleField.forEach((row, y) => {
            [...Array(10)].map((_, x) => {
                if (x === 0 || x === 9 || y === 0 || y === 12) {
                    const wall = Sprite("wall");
                    wall.name = "wall";
                    row.push(wall);
                } else {
                    row.push(null);
                }
            });
        });

        for (let x = 0; x < fieldPanel.gridX.columns; x++) {
            for (let y = 0; y < fieldPanel.gridY.columns; y++) {
                const f = battleField[y][x];
                if (x < 2 || x > 7 || y < 2 || y > 10) {
                    Sprite("flower").addChildTo(fieldPanel).setPosition(fieldPanel.gridX.span(x), fieldPanel.gridY.span(y));
                } else {
                    Sprite("green").addChildTo(fieldPanel).setPosition(fieldPanel.gridX.span(x), fieldPanel.gridY.span(y));
                }
                if (f && f.name === "wall") {
                    f.addChildTo(fieldPanel).setPosition(fieldPanel.gridX.span(x), fieldPanel.gridY.span(y))
                }
            }
        }

        // 陣地カウント
        self.countArea = function() {
            let w = 0, b = 0;
            battleField.forEach(row => {
                row.forEach(block => {
                    if (!block) {
                        return;
                    }
                    if (block.name === "white" || block.name === "whiteStone") {
                        w += 1;
                    } else if (block.name === "black" || block.name === "blackStone") {
                        b += 1;
                    }
                });
            });
            self.whiteAreaNumLabel.text = w;
            self.blackAreaNumLabel.text = b;
        };

        // バトルを最初からやり直す
        self.clear = function () {
            // いったん空のシーンに遷移して、戻る
            param.callbackScene = "BattleScene";
            self.exit("BlankScene", param);
            self.restartFlg = false;
            playerProgramingFlgA = false;
            enemyProgramingFlgA = false;
            playerProgramingFlgB = false;
            enemyProgramingFlgB = false;
        };

        self.on("resume", function() {
            if (self.restartFlg) {
                self.clear();
            }
            self.restartFlg = false;
        });

        self.player = Cat({playerOrEnemy: "player", x:4, y:11, direction: "north", field: fieldPanel, catPanel: catPanel});
        catPanel.player = self.player;
        if (playerProgram) {
            playerProgram.restart();
            playerProgram.blockHistory = [];
            playerProgram.lastX = playerProgram.x;
            playerProgram.lastY = playerProgram.y;
        } else {
            playerProgram = new Program("player", param.trainingMode);
            // ワーク領域のプログラムを読み込む
            const data = window.localStorage.getItem(STORAGE_KEY.WORK);
            if (data) {
                playerProgram.import(data);
            } else {
                // プレイヤーのデフォルトプラグラム
                playerProgram.import("0yvK5hN4cCOGJeCUvnIzvTNdUdNDADpLuCJgPGMGBIWqbR");
            }
        }

        // 敵を生成する
        self.enemy = Cat({playerOrEnemy: "enemy", enemyLevel: param.enemyLevel, x:5, y:1, direction: "south", field: fieldPanel, catPanel: catPanel});
        catPanel.enemy = self.enemy;
        if (!enemyProgram || param.trainingMode) {
            enemyProgram = new Program("enemy", param.trainingMode);
            // ワーク領域のプログラムを読み込む
            const data = window.localStorage.getItem(STORAGE_KEY.ENEMY_WORK);
            if (data) {
                enemyProgram.import(data);
            }
        } else {
            enemyProgram.restart();
            enemyProgram.blockHistory = [];
            enemyProgram.lastX = enemyProgram.x;
            enemyProgram.lastY = enemyProgram.y;
        }

        // カウントダウン
        const countdownPanel = RectangleShape({
            width: this.width - 50,
            height: 20,
            fill: "black",
            strokeWidth: 0,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(13.5));
        countdownPanel.alpha = 0.5;
        RectangleShape({
            width: this.width - 45,
            height: 20,
            fill: "transparent",
            strokeWidth: 2,
            stroke: "white",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(13.5));

        const countdownProgress = RectangleShape({
            width: 0,
            height: countdownPanel.height - 3,
            fill: "red",
            strokeWidth: 0,
            // stroke: "red",
        }).addChildTo(this).setPosition(17, this.gridY.span(13.5) - 16);
        countdownProgress.setOrigin(0, 0);


        self.updateCountdown = function() {
            countdownProgress.width = countdownPanel.width * (countdown / countdownMax);
        };

        self.updateCountdown();

        if (!param.skipHowToShow && !param.trainingMode && myLevel === 1) {
            setTimeout(function() {
                self.player.setDirection("south");
                App.pushScene(HowToScene({callback: function () {
                    self.gameStart();
                    self.player.setDirection("north");
                }}));
            }, 10)
        } else if (!param.skipHowToShow && param.trainingMode && myLevel < 4) {
            setTimeout(function() {
                App.pushScene(WhatIsFreeScene({callback: function () {
                    self.gameStart();
                }}));
            }, 10)
        } else {
            self.gameStart();
        }

    },
    step: 0,
    nextTurn: "player",
    restartFlg: false,
    gameEnd: function () {
        const self = this;
        self.gameStartFlg = false;
        Label({
            text: "TIME UP",
            fontSize: 60,
            fill: "white",
            fontWeight: 800,
            stroke: "black",
            strokeWidth: 10,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(-4))
        .tweener.wait(500)
        .call(function () {

            // const backButton = BasicButton({
            //     width: 250,
            //     height: 60,
            //     text: "対戦相手を変える",
            //     primary: true,
            // }).addChildTo(self).setPosition(self.gridX.center(), self.gridY.center(2))
            // .on("pointstart", function () {
            //     self.exit("EnemySelectScene");
            // });

            if (self.whiteAreaNumLabel.text > self.blackAreaNumLabel.text) {
                Label({
                    text: "勝ち！",
                    fontSize: 150,
                    fill: "white",
                    stroke: "red",
                    strokeWidth: 20,
                }).addChildTo(self).setPosition(self.gridX.center(0.4), self.gridY.center(-1));
                // レベルアップ？
                if (!self.trainingMode && self.enemyLevel >= myLevel) {
                    myLevel += 1;
                    localStorage.setItem(STORAGE_KEY.LEVEL, myLevel);
                }
            } else if (self.whiteAreaNumLabel.text < self.blackAreaNumLabel.text) {
                Label({
                    text: "負け",
                    fontSize: 150,
                    fill: "white",
                    fontWeight: 800,
                    stroke: "darkblue",
                    strokeWidth: 20,
                }).addChildTo(self).setPosition(self.gridX.center(), self.gridY.center(-1));
            } else {
                Label({
                    text: "引き分け",
                    fontSize: 150,
                    fill: "white",
                    fontWeight: 800,
                    stroke: "darkblue",
                    strokeWidth: 20,
                }).addChildTo(self).setPosition(self.gridX.center(), self.gridY.center(-1));
            }
    
        }).play();
    },
    gameStartFlg: false,
    gameStart: function () {
        const self = this;
        const readyLabel = Label({
            text: "READY",
            fontSize: 60,
            fill: "white",
            fontWeight: 800,
            stroke: "black",
            strokeWidth: 10,
        }).addChildTo(self).setPosition(this.gridX.center(-10), this.gridY.center(-2));
        const goLabel = Label({
            text: "GO!",
            fontSize: 110,
            fill: "white",
            fontWeight: 800,
            stroke: "black",
            strokeWidth: 10,
        }).addChildTo(self).setPosition(this.gridX.center(-13), this.gridY.center(-0.5));
        readyLabel.tweener
            .to({x: this.gridX.center()}, 100, "easeOut")
            .wait(600)
            .call(function () {
                goLabel.tweener.to({x: self.gridX.center()}, 100, "easeOut").play();
            })
            .wait(800)
            .call(function () {
                readyLabel.remove();
                goLabel.remove();
                self.gameStartFlg = true;
            }).play();
    },
    update: function() {
        const self = this;

        if (!playerProgram) {
            return;
        }

        if (!self.gameStartFlg) {
            return;
        }

        this.step += 1;
        if (this.step < 15) {
            return;
        }
        this.step = 0;

        if (countdown <= 0) {
            self.countArea();
            self.player.setDirection("south");
            if (self.enemy) {
                self.enemy.setDirection("south");
            }
            self.gameEnd();
            return;
        }
        countdown -= 1;
        this.updateCountdown();

        if (this.nextTurn === "player") {
            this.applyOneStep(playerProgram, self.player, self.enemy);
            this.nextTurn = "enemy";
        } else {
            this.applyOneStep(enemyProgram, self.enemy, self.player);
            this.nextTurn = "player";
        }

        self.countArea();

    },
});

// バトルのメニュー
phina.define('BattleMenuScene', {
    superClass: 'DisplayScene',
    init: function(param) {
  
        const self = this;

        this.superInit();

        this.backgroundColor = "rgba(0, 0, 0, 0.5)";

        // ウインドウ
        const base = RectangleShape({
            x: this.gridX.center(),
            y: this.gridY.center(),
            width: this.width - 250,
            height: this.height - 400,
            fill: "white",
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
        }).addChildTo(this);

        // 敵のプログラムを表示
        const saveButton = BasicButton({
            text: "敵のプログラムを見る",
            width: 320,
            height: 50,
            primary: true,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(5))
        .on("pointstart", function() {
            // if (param.battleScene.trainingMode) {
                // return;
            // }
            App.pushScene(ProgramingScene({targetProgram: enemyProgram, trainingMode: param.battleScene.trainingMode}));
        });

        // 最初からやり直すボタン
        const clearButton = BasicButton({
            text: "最初からやり直す",
            width: 320,
            height: 50,
            primary: true,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(7))
        .on("pointstart", function() {
            param.battleScene.restartFlg = true;
            self.exit();
        });

        const gotoTitleButton = BasicButton({
            text: "対戦を終了する",
            width: 320,
            height: 50,
            primary: true,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(9))
        .on("pointstart", function() {
            self.exit();
            param.battleScene.exit("EnemySelectScene");
        });

        // 閉じるボタン
        const closeButton = BasicButton({
            text: "とじる",
            width: 120,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(11.5))
        .on("pointstart", function() {
            self.exit();
        });

    },
});


let battleField = [];

// プログラミングのメニュー
phina.define('ProgramingMenuScene', {
    superClass: 'DisplayScene',
    init: function(param) {
  
        const self = this;

        this.superInit();

        this.backgroundColor = "rgba(0, 0, 0, 0.5)";

        // ウインドウ
        const base = RectangleShape({
            x: this.gridX.center(),
            y: this.gridY.center(),
            width: this.width - 300,
            height: this.height - 300,
            fill: "white",
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
        }).addChildTo(this);

        // セーブボタン
        const saveButton = BasicButton({
            text: "倉庫に保管する",
            width: 300,
            height: 50,
            primary: true,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(4))
        .on("pointstart", function() {
            App.pushScene(SaveAndLoadScene({mode: "save", playerOrEnemy: param.playerOrEnemy}));
        });

        // ロードボタン
        const loadButton = BasicButton({
            text: "倉庫から読み込む",
            width: 300,
            height: 50,
            primary: true,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(6))
        .on("pointstart", function() {
            App.pushScene(SaveAndLoadScene({mode: "load", playerOrEnemy: param.playerOrEnemy}));
        });

        // 全削除ボタン
        const clearButton = BasicButton({
            text: "プログラムをクリア",
            width: 300,
            height: 50,
            primary: true,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(8))
        .on("pointstart", function() {
            if (param.playerOrEnemy === "player") {
                playerProgram.clear();
            } else {
                enemyProgram.clear();
            }
            clearProgramFlg = true;
            App.pushScene(MessageDialogScene({message: "プログラムを消去しました。"}));
        });

        // シェアボタン
        const shareButton = BasicButton({
            text: "プログラムをシェア",
            width: 300,
            height: 50,
            primary: true,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(10))
        .on("pointstart", function() {
            if (param.playerOrEnemy === "enemy") {
                return;
            }
            const data = playerProgram.export();
            const url = location.protocol + "//" + location.host + location.pathname + "?data=" + data;
            navigator.clipboard.writeText(url);
            App.pushScene(MessageDialogScene({message: "このプログラムを公開するURLを\nクリップボードにコピーしました。"}));
        });
        if (param.playerOrEnemy === "enemy") {
            shareButton.disable();
        }

        // 閉じるボタン
        const closeButton = BasicButton({
            text: "とじる",
            width: 120,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(12.5))
        .on("pointstart", function() {
            self.exit();
        });

    },
});

// 複数ブロック選択シーン
phina.define('BlockMultiSelectScene', {
    superClass: 'DisplayScene',
    init: function(param) {
  
        const self = this;

        this.superInit();

        this.backgroundColor = "transparent";

        const blocksPanel = RectangleShape({
            width: 64 * 9,
            height: 64 * 13,
            x: self.gridX.center(),
            y: self.gridY.center(-0.5),
            fill: "transparent",
            stroke: 0,
        }).addChildTo(this);

        blocksPanel.gridX = Grid({
            width: blocksPanel.width,
            columns: 9,
            offset: blocksPanel.width / 2 * -1 + 32,
        });
        blocksPanel.gridY = Grid({
            width: blocksPanel.height,
            columns: 13,
            offset: blocksPanel.height / 2 * -1 + 32,
        });

        const controlPanel = RectangleShape({
            width: this.width,
            height: 100,
            x: self.gridX.center(),
            y: self.gridY.center(7.3),
            fill: "gray",
            stroke: 0,
        }).addChildTo(this);

        const removeButton = BasicButton({
            text: "選択したチップを削除",
            width: 300,
            height: 50,
            primary:true,
        }).addChildTo(self)
        .setPosition(self.gridX.center(-3), self.gridY.span(15.2))
        .on("pointstart", function() {
            blocks.forEach(function(block) {
                if (block.name === "on") {
                    param.targetProgram.blocks[block.ny][block.nx].changeBlock(BLOCK_NAME.empty, false, "down", "right");
                }
            });
            self.exit();
        });

        const closeButton = BasicButton({
            text: "キャンセル",
            width: 160,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(4.5), self.gridY.span(15.2))
        .on("pointstart", function() {
            self.exit();
        });

        const blocks = [];

        // ブロックを並べる
        for (let x = 0; x < blocksPanel.gridX.columns; x++) {
            for (let y = 0; y < blocksPanel.gridY.columns; y++) {
                const block = param.targetProgram.blocks[y][x];
                if (block.name !== BLOCK_NAME.empty && block.name !== BLOCK_NAME.start && block.name !== BLOCK_NAME.startSub) {
                    const selectMark = Sprite("checked");
                    selectMark.addChildTo(blocksPanel).setPosition(blocksPanel.gridX.span(x), blocksPanel.gridY.span(y));
                    selectMark.name = "off";
                    selectMark.alpha = 0;
                    selectMark.nx = x;
                    selectMark.ny = y;
                    selectMark.setInteractive(true);
                    selectMark.on("pointstart", function() {
                        if (this.name === "on") {
                            this.name = "off";
                            this.alpha = 0;
                        } else {
                            this.name = "on";
                            this.alpha = 1;
                        }
                    });
                    if (x === param.x && y === param.y) {
                        selectMark.alpha = 1;
                        selectMark.name = "on";
                    }
                    blocks.push(selectMark);
                }

            }
        }
    },
});

// プログラミングシーン
phina.define('ProgramingScene', {
    superClass: 'DisplayScene',
    init: function(param) {
  
        const self = this;

        this.superInit();

        this.backgroundColor = "gray";

        this.oldProgram = playerProgram.export();

        // レイヤー
        this.uiLayer = DisplayElement().addChildTo(self);

        const blocksPanel = RectangleShape({
            width: 64 * 9,
            height: 64 * 13,
            x: self.gridX.center(),
            y: self.gridY.center(-0.5),
            fill: "gray",
        }).addChildTo(this.uiLayer);

        blocksPanel.gridX = Grid({
            width: blocksPanel.width,
            columns: 9,
            offset: blocksPanel.width / 2 * -1 + 32,
        });
        blocksPanel.gridY = Grid({
            width: blocksPanel.height,
            columns: 13,
            offset: blocksPanel.height / 2 * -1 + 32,
        });

        // バトルシーン遷移ボタン
        const gotoBattleButton = BasicButton({
            text: "とじる",
            width: 120,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(1.7), self.gridY.span(15.2))
        .on("pointstart", function() {
            if (param.targetProgram === playerProgram) {
                // ワーク領域にプログラムを保存
                const data = playerProgram.export();
                window.localStorage.setItem(STORAGE_KEY.WORK, data);
            } else if (param.trainingMode) {
                // 敵のプログラムを保存するのはトレーニングの場合だけ
                // ワーク領域にプログラムを保存
                const data = enemyProgram.export();
                window.localStorage.setItem(STORAGE_KEY.ENEMY_WORK, data);
            }
            if (!param.trainingMode && playerProgram.export() !== self.oldProgram) {
                App.pushScene(MessageDialogScene({message: "プログラムを変更したので\n対戦をやり直します。", callback: function() {
                    param.battleScene.restartFlg = true;
                    self.exit("BattleScene", {trainingMode: param.trainingMode, enemyLevel: param.enemyLevel});
                }}));
            } else {
                self.exit("BattleScene", {trainingMode: param.trainingMode, enemyLevel: param.enemyLevel});
            }
        });

        if (param.targetProgram === playerProgram || param.trainingMode) {
            BasicButton({
                text: "メニュー",
                width: 140,
                height: 50,
                primary: true,
            }).addChildTo(self)
            .setPosition(self.gridX.center(5.6), self.gridY.span(15.2))
            .on("pointstart", function() {
                App.pushScene(ProgramingMenuScene({playerOrEnemy: (param.targetProgram === playerProgram ? "player" : "enemy")}));
            });
        }

        // ブロックを並べる
        for (let x = 0; x < blocksPanel.gridX.columns; x++) {
            for (let y = 0; y < blocksPanel.gridY.columns; y++) {
                param.targetProgram.blocks[y][x]
                    .addChildTo(blocksPanel)
                    .setPosition(blocksPanel.gridX.span(x), blocksPanel.gridY.span(y));
            }
        }

        // 実行中のブロックに印をつける
        const activeBlock = param.targetProgram.getLastActiveBlock();
        const mark = RectangleShape({
            width: activeBlock.width,
            heigth: activeBlock.height,
            fill: "red",
            stroke: "red",
            strokeWidth: 1,
        }).addChildTo(blocksPanel).setPosition(activeBlock.x, activeBlock.y);
        mark.alpha = 0.3;
        mark.tweener.to({alpha:0}, 300).to({alpha:0.5}, 300).setLoop(true).play();

        let historyIndex = param.targetProgram.blockHistory.length - 1;

        const stepBackButton = BasicButton({
            text: "<",
            width: 50,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(-6.5), self.gridY.span(15.2))
        .on("pointstart", function() {
            if (historyIndex > 0) {
                historyIndex -= 1;
                const block = param.targetProgram.blockHistory[historyIndex].block;
                mark.setPosition(block.x, block.y);
            }
            stepButtonEnable();
            setFlagLabelText();
        });

        const stepForwardButton = BasicButton({
            text: ">",
            width: 50,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(-4.7), self.gridY.span(15.2))
        .on("pointstart", function() {
            if (historyIndex < param.targetProgram.blockHistory.length - 1) {
                historyIndex += 1;
                const block = param.targetProgram.blockHistory[historyIndex].block;
                mark.setPosition(block.x, block.y);
            }
            stepButtonEnable();
            setFlagLabelText();
        });

        function stepButtonEnable() {
            stepBackButton.disable();
            stepForwardButton.disable();
            if (historyIndex < param.targetProgram.blockHistory.length - 1) {
                stepForwardButton.enable();
            }
            if (historyIndex > 0) {
                stepBackButton.enable();
            }
        }

        stepButtonEnable();

        function setFlagLabelText() {
            flagLabel.text =
                "フラグA：" + (param.targetProgram.blockHistory[historyIndex] && param.targetProgram.blockHistory[historyIndex].flagA ? "ON" : "OFF") +
                "\n" +
                "フラグB：" + (param.targetProgram.blockHistory[historyIndex] && param.targetProgram.blockHistory[historyIndex].flagB ? "ON" : "OFF");
        }

        const flagLabel = LabelArea({
            text: "",
            fontSize: 18,
            fill: "white",
            width: 120,
            height: 50,
        }).addChildTo(this).setPosition(self.gridX.center(-2.1), self.gridY.span(15.3));
        setFlagLabelText();

        self.on("resume", function() {
            if (clearProgramFlg) {
                historyIndex = 0;
                mark.remove();
                stepButtonEnable();
            }
            clearProgramFlg = false;
        });

    },
});

let clearProgramFlg = false;

// セーブ＆ロードシーン
phina.define('SaveAndLoadScene', {
    superClass: 'DisplayScene',
    init: function(param) {
        const self = this;
        this.superInit();

        this.backgroundColor = "rgba(0, 0, 0, 0.5)";

        // ウインドウ
        const base = RectangleShape({
            x: this.gridX.center(),
            y: this.gridY.center(),
            width: this.width - 200,
            height: this.height - 350,
            fill: "white",
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
        }).addChildTo(this);


        const label = Label({
            fontSize: 25,
            fill: "black",
            fontWeight: 800,
        }).addChildTo(this).setPosition(self.gridX.center(), self.gridY.span(4));

        if (param.mode === "save") {
            label.text = "どこに保管しますか？";
        } else {
            label.text = "どれを読み込みますか？";
        }

        // 保存場所１
        const file1Button = BasicButton({
            text: "倉庫１",
            width: 300,
            height: 50,
        }).addChildTo(self).setPosition(self.gridX.center(), self.gridY.span(6));
        if (param.mode === "save") {
            file1Button.on("pointstart", () => save("1"));
        } else {
            if (canLoad("1")) {
                file1Button.on("pointstart", () => load("1"));
            } else {
                file1Button.disable();
            }
        }

        // 保存場所２
        const file2Button = BasicButton({
            text: "倉庫２",
            width: 300,
            height: 50,
        }).addChildTo(self).setPosition(self.gridX.center(), self.gridY.span(8));
        if (param.mode === "save") {
            file2Button.on("pointstart", () => save("2"));
        } else {
            if (canLoad("2")) {
                file2Button.on("pointstart", () => load("2"));
            } else {
                file2Button.disable();
            }
        }

        // 保存場所３
        const file3Button = BasicButton({
            text: "倉庫３",
            width: 300,
            height: 50,
        }).addChildTo(self).setPosition(self.gridX.center(), self.gridY.span(10));
        if (param.mode === "save") {
            file3Button.on("pointstart", () => save("3"));
        } else {
            if (canLoad("3")) {
                file3Button.on("pointstart", () => load("3"));
            } else {
                file3Button.disable();
            }
        }

        function save(fileNumber) {
            const data = param.playerOrEnemy === "player" ? playerProgram.export() : enemyProgram.export();
            window.localStorage.setItem(STORAGE_KEY.DATA + fileNumber, data);
            App.pushScene(MessageDialogScene({message: "保存しました。"}));
        }

        function load(fileNumber) {
            const data = window.localStorage.getItem(STORAGE_KEY.DATA + fileNumber);
            if (param.playerOrEnemy === "player") {
                playerProgram.import(data);
            } else {
                enemyProgram.import(data);
            }
            App.pushScene(MessageDialogScene({message: "読み込みました。"}));
        }

        function canLoad(fileNumber) {
            return !!window.localStorage.getItem(STORAGE_KEY.DATA + fileNumber);
        }

        // 閉じるボタン
        const closeButton = BasicButton({
            text: "閉じる",
            width: 170,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(12))
        .on("pointstart", function() {
            self.exit();
        });

    },
});

// URL読み込みシーン
phina.define('LoadURLScene', {
    superClass: 'DisplayScene',
    init: function(param) {
        const self = this;
        this.superInit();

        this.backgroundColor = "rgba(0, 0, 0, 0.5)";

        // ウインドウ
        const base = RectangleShape({
            x: this.gridX.center(),
            y: this.gridY.center(),
            width: this.width - 100,
            height: this.height - 400,
            fill: "white",
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(-0.5));

        const label = Label({
            fontSize: 25,
            fill: "black",
            fontWeight: 800,
        }).addChildTo(this).setPosition(self.gridX.center(), self.gridY.span(4));
        label.text = "URLにプログラムが含まれています。";

        const okButton = BasicButton({
            text: "自分のプログラムとして読み込む",
            width: 450,
            height: 80,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(6))
        .on("pointstart", function() {
            if (!playerProgram) {
                playerProgram = new Program("player");
            }
            playerProgram.import(param.data);
            App.pushScene(MessageDialogScene({message: "自分のプログラムとして読み込みました。", callback: () => {removeQuery();self.exit()}}));
        });

        const ok2Button = BasicButton({
            text: "敵のプログラムとして読み込む",
            width: 450,
            height: 80,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(8))
        .on("pointstart", function() {
            window.localStorage.setItem(STORAGE_KEY.ENEMY_WORK, param.data);
            App.pushScene(MessageDialogScene({message: "読み込みました。\n対戦相手「フリー」を選択してください。", callback: () => {removeQuery();self.exit()}}));
        });

        const ok3Button = BasicButton({
            text: "無視する",
            width: 450,
            height: 80,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(10))
        .on("pointstart", function() {
            removeQuery();
            self.exit();
        });

        // // いいえボタン
        // const closeButton = BasicButton({
        //     text: "いいえ",
        //     width: 170,
        //     height: 50,
        // }).addChildTo(self)
        // .setPosition(self.gridX.center(3), self.gridY.span(9))
        // .on("pointstart", function() {
        //     self.exit();
        // });

        // クエリパラメータはもう不要
        function removeQuery() {
            const url = new URL(window.location.href);
            history.replaceState(null, '', url.pathname);
        }


    },
});

// 空っぽのシーン
phina.define('BlankScene', {
    superClass: 'DisplayScene',
    init: function(param) {
        const self = this;
        this.superInit();
        setTimeout(function() {
            param.skipHowToShow = true;
            self.exit(param.callbackScene, param);
        }, 1);
    }
});

// 簡単な説明シーン
phina.define('HowToScene', {
    superClass: 'DisplayScene',
    init: function(param) {
        const self = this;
        this.superInit();

        this.backgroundColor = "rgba(0, 0, 0, 0.3)";

        let step = 1;

        const title = Label({text:"あそびかた", fill:"white", fontSize: 35, fontWeight: 800}).addChildTo(this).setPosition(self.gridX.center(), self.gridY.center(-4));

        const label = LabelArea({
            text: "",
            fontSize: 30,
            fill: "white",
            width: this.width - 150,
            height: this.height - 600,
        }).addChildTo(this).setPosition(self.gridX.center(), self.gridY.center());

        label.text = "画面の下にいる白にゃんこをプログラムで動かして、陣地を広げていくゲームです。\n\n制限時間が終わったときに、陣地が広いほうが勝ち！";

        const time = Label({text:"制限時間", fill:"white", fontSize: 35}).addChildTo(this).setPosition(400, 720);
        const s1 = Sprite("howToArrow").addChildTo(this).setPosition(540, 775);
        s1.scaleX *= -1;

        const area = Label({text:"陣地", fill:"white", fontSize: 35}).addChildTo(this).setPosition(170, 785);
        const s2 = Sprite("howToArrow").addChildTo(this).setPosition(80, 840);

        this.on("pointstart", function() {
            let tmp1, tmp2;
            if (step === 1) {
                time.remove();
                s1.remove();
                area.remove();
                s2.remove();
                label.text = "にゃんこが「おじゃま石」を置くと、その石の周囲が陣地になります。\n\n相手の陣地には入れません。でも、相手の石の近くに自分の石を置いて陣地と陣地が重なると、その部分の陣地は消えます。";
                step = 2;
            } else if (step === 2) {
                label.text = "にゃんこはプログラムに従って動くので、対戦が始まったら、あなたは見ているだけです。\n\n勝てない時は、プログラムを改良してみてください。\n\nでは対戦スタート！";
                tmp1 = Label({text:"プログラムを\n開くボタン", fill:"white", fontSize: 30}).addChildTo(this).setPosition(500, 760);
                tmp2 = Sprite("howToArrow").addChildTo(this).setPosition(350, 840);
                step = 3;
            } else {
                if (param && param.callback) {
                    setTimeout(function() {
                        param.callback();
                    }, 1);
                }
                self.exit();
            }
        });
    },
});

// フリーモードの説明シーン
phina.define('WhatIsFreeScene', {
    superClass: 'DisplayScene',
    init: function(param) {
        const self = this;
        this.superInit();

        this.backgroundColor = "rgba(0, 0, 0, 0.3)";

        Label({text:"フリーモード", fill:"white", fontSize: 35, fontWeight: 800}).addChildTo(this).setPosition(self.gridX.center(), self.gridY.center(-4));

        const label = LabelArea({
            text: "",
            fontSize: 30,
            fill: "white",
            width: this.width - 150,
            height: this.height - 600,
        }).addChildTo(this).setPosition(self.gridX.center(), self.gridY.center());

        label.text = "ここでは、敵のプログラムを自由に変更できます。\n\nまた、誰かが公開したプログラムを敵のプログラムとして読み込んだ場合、ここで対決します。";

        this.on("pointstart", function() {
            if (param && param.callback) {
                setTimeout(function() {
                    param.callback();
                }, 1);
            }
            self.exit();
        });
    },
});

// シンプルなメッセージダイアログ
phina.define('MessageDialogScene', {
    superClass: 'DisplayScene',
    init: function(param) {
        const self = this;
        this.superInit();

        this.backgroundColor = "rgba(0, 0, 0, 0.5)";

        // ウインドウ
        const base = RectangleShape({
            x: this.gridX.center(),
            y: this.gridY.center(),
            width: this.width - 50,
            height: 200,
            fill: "white",
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
        }).addChildTo(this);

        // メッセージ
        const label = Label({
            text: param.message,
            fontSize: 25,
            fontWeight: 800,
            fill: "black",
        }).addChildTo(this).setPosition(self.gridX.center(), self.gridY.span(7.2));

        // 閉じるボタン
        const closeButton = BasicButton({
            text: "OK",
            width: 170,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(8.7))
        .on("pointstart", function() {
            if (param && param.callback) {
                setTimeout(function() {
                    param.callback();
                }, 1);
            }
            self.exit();
        });
    }
});

// 汎用ボタン
phina.define('BasicButton', {
    superClass: 'RectangleShape',
    init: function(param) {
        const self = this;
        this.superInit({
            width: param.width,
            height: param.height,
            fill: "white",
            cornerRadius: 8,
            strokeWidth: 8,
            stroke: "black",
        });
        const label = Label({
            text: param.text,
            fontSize: 25,
            fontWeight: 800,
        }).addChildTo(self);
        self.setInteractive(true);

        if (param.primary) {
            this.strokeWidth = 11;
        }

        self.disable = function () {
            self.stroke = "gray";
            label.fill = "gray";
        };

        self.enable = function () {
            self.stroke = "black";
            label.fill = "black";
        };
    },
});


let playerProgram;
let enemyProgram;

function Program(playerOrEnemy, trainingMode) {

    const self = this;

    playerProgramingFlgA = false;
    enemyProgramingFlgA = false;
    playerProgramingFlgB = false;
    enemyProgramingFlgB = false;

    self.blocks = [];

    // サブルーチンからの戻り先のブロック
    // サブルーチンに入ったらpushし、サブルーチンを出たらpopする
    self.blockToReturnWhenSubroutineDone = [];
    self.returnFromSubroutine = false;

    function initBlocks() {
        // ブロックの初期配置
        [...Array(13)].map(() => self.blocks.push([]));
        self.blocks.forEach((row, y) => {
            [...Array(9)].map((_, x) => {
                if (x === 4 && y === 0) {
                    var start = Sprite('start');
                    Sprite("arrowOK1").addChildTo(start).setPosition(0, 20);
                    start.name = BLOCK_NAME.start;
                    start.doubleArrow = false;
                    start.arrowOK = "down";
                    row.push(start);
                } else if (x === 4 && y === 8) {
                    var subroutine = Sprite('startSub');
                    Sprite("arrowOK1").addChildTo(subroutine).setPosition(0, 20);
                    subroutine.name = BLOCK_NAME.startSub;
                    subroutine.doubleArrow = false;
                    subroutine.arrowOK = "down";
                    row.push(subroutine);
                } else {
                    row.push(Block({name: BLOCK_NAME.empty, sampleMode: false, playerOrEnemy: playerOrEnemy, trainingMode: trainingMode}));
                }
            });
        });
    }

    initBlocks();

    self.x = 4;
    self.y = 1;

    self.lastX = self.x;
    self.lastY = self.y;

    self.blockHistory = [];

    self.startSubroutine = function (block) {

        // サブルーチンから抜けてきた時なら、サブルーチンには入らない
        if (self.returnFromSubroutine) {
            self.returnFromSubroutine = false;
            return;
        }

        // サブルーチンからの戻り先のブロックを保管
        self.blockToReturnWhenSubroutineDone.push({x: self.x, y: self.y});
        self.lastX = self.x;
        self.lastY = self.y;
        self.blockHistory.push({block: block, flagA: playerProgramingFlgA, flagB: playerProgramingFlgB});
        self.x = 4;
        self.y = 8;
    };

    self.clear = function () {
        self.blocks.forEach((row, y) => {
            row.forEach((block, x) => {
                if (x === 4 && (y === 0 || y === 8)) {
                    // スタートブロックなのでクリア不要
                } else {
                    block.changeBlock(BLOCK_NAME.empty, false, "down", "right");
                }
            });
        });
        playerProgramingFlgA = false;
        enemyProgramingFlgA = false;
        playerProgramingFlgB = false;
        enemyProgramingFlgB = false;
        self.lastX = self.x;
        self.lastY = self.y;
        self.blockHistory = [];
        self.restart();
    };

    self.export = function () {
        let data = "";

        self.blocks.forEach(row => {
            row.forEach(block => {
                data += blockToString(block) + ";";
            });
        });

        function blockToString(block) {
            let ret;
            ret = block.name;
            if (block.name !== BLOCK_NAME.empty) {
                ret += directionToNumber(block.arrowOK);
            }
            if (block.doubleArrow) {
                ret += directionToNumber(block.arrowNG);
            }
            return ret;
        }

        function directionToNumber(direction) {
            if (direction === "up") {
                return "1";
            } else if (direction === "rightUp") {
                return "2";
            } else if (direction === "right") {
                return "3";
            } else if (direction === "rightDown") {
                return "4";
            } else if (direction === "down") {
                return "5";
            } else if (direction === "leftDown") {
                return "6";
            } else if (direction === "left") {
                return "7";
            } else if (direction === "leftUp") {
                return "8";
            }
        }

        return URLCompressor.compress(data);
    };

    self.import = function (data) {

        self.clear();

        const program = URLCompressor.expand(data);

        const blocks = program.split(";");

        blocks.forEach(function(str, blockIndex) {

            if (str === "") {
                return;
            }

            const blockName = str.substring(0, 1);
            const targetBlock = self.blocks[Math.floor(blockIndex / 9)][blockIndex % 9];

            // スタート地点なら何もしない
            if (blockName === BLOCK_NAME.start || blockName === BLOCK_NAME.startSub) {
                return;
            }

            // 空ブロックなら矢印は不要
            if (blockName === BLOCK_NAME.empty) {
                if (!targetBlock.changeBlock) {
                    return;
                }
                targetBlock.changeBlock(BLOCK_NAME.empty, false);
                return;
            }

            const arrowOK = str.substring(1, 2);
            const nextChar = str.substring(2, 3);

            // 青矢印のみ？
            if (nextChar === ";") {
                targetBlock.changeBlock(blockName, false, NumberToDirection(arrowOK));
            } else {
                targetBlock.changeBlock(blockName, false, NumberToDirection(arrowOK), NumberToDirection(nextChar));
            }

        });

        function NumberToDirection(num) {
            if (num === "1") {
                return "up";
            } else if (num === "2") {
                return "rightUp";
            } else if (num === "3") {
                return "right";
            } else if (num === "4") {
                return "rightDown";
            } else if (num === "5") {
                return "down";
            } else if (num === "6") {
                return "leftDown";
            } else if (num === "7") {
                return "left";
            } else if (num === "8") {
                return "leftUp";
            }
        }
    };

    self.restart = function() {
        self.x = 4;
        self.y = 1;
    };

    self.returnToStart = function() {
        if (self.blockToReturnWhenSubroutineDone.length > 0) {
            self.x = self.blockToReturnWhenSubroutineDone[self.blockToReturnWhenSubroutineDone.length - 1].x;
            self.y = self.blockToReturnWhenSubroutineDone[self.blockToReturnWhenSubroutineDone.length - 1].y;
            self.blockToReturnWhenSubroutineDone.pop();
            self.returnFromSubroutine = true;
        } else {
            self.x = 4;
            self.y = 1;
        }
    };

    self.getActiveBlock = function() {
        // ブロックそのものが無い（＝プログラムの領域外）なら、エントリポイントに戻る
        if (!self.blocks[self.y] || !self.blocks[self.y][self.x]) {
            self.returnToStart();
        }
        // いまのブロックがなにも指定されていない場合は、エントリポイントに戻る
        if (self.blocks[self.y][self.x].name === BLOCK_NAME.empty) {
            self.returnToStart();
        }
        return self.blocks[self.y][self.x];
    };

    self.getLastActiveBlock = function () {
        return self.blocks[self.lastY][self.lastX];
    }

    self.stepOK = function() {
        const active = self.getActiveBlock();
        let x = self.x, y = self.y;
        if (active.arrowOK === "up") {
            y = y - 1;
        } else if (active.arrowOK === "down") {
            y = y + 1;
        } else if (active.arrowOK === "left") {
            x = x - 1;
        } else if (active.arrowOK === "right") {
            x = x + 1;
        } else if (active.arrowOK === "leftUp") {
            x = x - 1;
            y = y - 1;
        } else if (active.arrowOK === "leftDown") {
            x = x - 1;
            y = y + 1;
        } else if (active.arrowOK === "rightUp") {
            x = x + 1;
            y = y - 1;
        } else if (active.arrowOK === "rightDown") {
            x = x + 1;
            y = y + 1;
        }

        if (x < 0 || y > 13) {
            return null;
        }

        self.lastX = self.x;
        self.lastY = self.y;

        if (playerOrEnemy === "player") {
            self.blockHistory.push({block: self.blocks[self.y][self.x], flagA: playerProgramingFlgA, flagB: playerProgramingFlgB});
        } else {
            self.blockHistory.push({block: self.blocks[self.y][self.x], flagA: enemyProgramingFlgA, flagB: enemyProgramingFlgB});
        }

        if (self.blockHistory.length > 50) {
            self.blockHistory.shift();
        }

        self.x = x;
        self.y = y;

        return self.getActiveBlock();
    };

    self.stepNG = function() {
        const active = self.getActiveBlock();
        let x = self.x, y = self.y;
        if (active.arrowNG === "up") {
            y = y - 1;
        } else if (active.arrowNG === "down") {
            y = y + 1;
        } else if (active.arrowNG === "left") {
            x = x - 1;
        } else if (active.arrowNG === "right") {
            x = x + 1;
        } else if (active.arrowNG === "leftUp") {
            x = x - 1;
            y = y - 1;
        } else if (active.arrowNG === "leftDown") {
            x = x - 1;
            y = y + 1;
        } else if (active.arrowNG === "rightUp") {
            x = x + 1;
            y = y - 1;
        } else if (active.arrowNG === "rightDown") {
            x = x + 1;
            y = y + 1;
        }

        if (x < 0 || y > 13) {
            return null;
        }

        self.lastX = self.x;
        self.lastY = self.y;

        if (playerOrEnemy === "player") {
            self.blockHistory.push({block: self.blocks[self.y][self.x], flagA: playerProgramingFlgA, flagB: playerProgramingFlgB});
        } else {
            self.blockHistory.push({block: self.blocks[self.y][self.x], flagA: enemyProgramingFlgA, flagB: enemyProgramingFlgB});
        }

        if (self.blockHistory.length > 20) {
            self.blockHistory.shift();
        }

        self.x = x;
        self.y = y;

        return self.getActiveBlock();
    };
}

// プログラミングで使用するフラグ
let playerProgramingFlgA = false;
let enemyProgramingFlgA = false;
let playerProgramingFlgB = false;
let enemyProgramingFlgB = false;

// ブロック画像
phina.define('Block', {
    superClass: 'Sprite',
    init: function(params) {
  
        const self = this;

        this.superInit("empty");

        this.name = "";
        this.description = "";
        this.title = "";
        this.sampleMode = false;
        this.doubleArrow = false;
        this.arrowOK = "down";
        this.arrowNG = "";
        this.turn = 1;


        this.background = "white";


        this.setInteractive(true);

        let pointStartTime;

        this.on("pointstart", function() {
            pointStartTime = (new Date()).getTime();
        });

        this.on("pointstay", function() {

            if (self.name === BLOCK_NAME.empty) {
                return;
            }

            // console.log((new Date()).getTime(), pointStartTime, (new Date()).getTime() - pointStartTime);
            if (!pointStartTime) {
                return;
            }
            if ((new Date()).getTime() - pointStartTime < 200) {
                return;
            }
            pointStartTime = null;

            const program = params.playerOrEnemy === "player" ? playerProgram : enemyProgram;

            // 自分がプログラム中のどの位置なのか逆探索
            function getMyPosition() {
                for (let x = 0; x < 9; x++) {
                    for (let y = 0; y < 13; y++) {
                        if (program.blocks[y][x] === self) {
                            return {x: x, y: y};
                        }
                    }
                }
            }

            const position = getMyPosition();

            App.pushScene(BlockMultiSelectScene({
                targetProgram: program,
                x: position.x,
                y: position. y
            }));
        })

        this.on("pointend", function() {

            // 0.2秒以内に指を離したなら、タップしたと判定
            if ((new Date()).getTime() - pointStartTime > 200) {
                return;
            }

            if (self.sampleMode) {
                return;
            }
            if (!params.trainingMode && params.playerOrEnemy === "enemy") {
                return;
            }
            App.pushScene(BlockSelectScene({block: self}));
        });

        // 判定ブロック以外は常にtrueを返す。
        // 判定ブロックの場合、青矢印ならtrue、赤矢印ならfalseを返す
        this.applyProgram = function(target, nonTarget) {
            // 命令なし
            if (self.name === BLOCK_NAME.non) {
                return true;
            }
            // 前進
            if (self.name === BLOCK_NAME.forward) {
                if (target.direction === "north") {
                    target.moveToNorth();
                } else if (target.direction === "west") {
                    target.moveToWest();
                } else if (target.direction === "east") {
                    target.moveToEast();
                } else if (target.direction === "south") {
                    target.moveToSouth();
                }
                return true;
            }
            // 右斜め前
            if (self.name === BLOCK_NAME.goRight) {
                if (target.direction === "north") {
                    target.moveToNorth("right");
                } else if (target.direction === "west") {
                    target.moveToWest("right");
                } else if (target.direction === "east") {
                    target.moveToEast("right");
                } else if (target.direction === "south") {
                    target.moveToSouth("right");
                }
                return true;
            }
            // 左斜め前
            if (self.name === BLOCK_NAME.goLeft) {
                if (target.direction === "north") {
                    target.moveToNorth("left");
                } else if (target.direction === "west") {
                    target.moveToWest("left");
                } else if (target.direction === "east") {
                    target.moveToEast("left");
                } else if (target.direction === "south") {
                    target.moveToSouth("left");
                }
                return true;
            }
            // 後退
            if (self.name === BLOCK_NAME.goBack) {
                if (target.direction === "north") {
                    target.backToSouth();
                } else if (target.direction === "west") {
                    target.backToEast();
                } else if (target.direction === "east") {
                    target.backToWest();
                } else if (target.direction === "south") {
                    target.backToNorth();
                }
                return true;
            }
            // 右旋回
            if (self.name === BLOCK_NAME.turnRight) {
                if (target.direction === "north") {
                    target.setDirection("east");
                } else if (target.direction === "west") {
                    target.setDirection("north");
                } else if (target.direction === "east") {
                    target.setDirection("south");
                } else if (target.direction === "south") {
                    target.setDirection("west");
                }
                return true;
            }
            // 左旋回
            if (self.name === BLOCK_NAME.turnLeft) {
                if (target.direction === "north") {
                    target.setDirection("west");
                } else if (target.direction === "west") {
                    target.setDirection("south");
                } else if (target.direction === "east") {
                    target.setDirection("north");
                } else if (target.direction === "south") {
                    target.setDirection("east");
                }
                return true;
            }
            // 障害物確認
            if (self.name === BLOCK_NAME.stop) {
                return !target.bumpSomething(target.direction);
            }
            // 障害物確認（右斜め前）
            if (self.name === BLOCK_NAME.stopRight) {
                return !target.bumpSomething(target.direction, "right");
            }
            // 障害物確認（左斜め前）
            if (self.name === BLOCK_NAME.stopLeft) {
                return !target.bumpSomething(target.direction, "left");
            }
            // 50%の確率
            if (self.name === BLOCK_NAME.random1) {
                return Math.random() > 0.5;
            }
            // 目の前が自陣か
            if (self.name === BLOCK_NAME.myArea) {
                const fieldName = target.getForwardFieldName(target.direction);
                if (target.playerOrEnemy === "player") {
                    if (fieldName === "white" || fieldName === "whiteStone") {
                        return true;
                    }
                } else {
                    if (fieldName === "black" || fieldName === "blackStone") {
                        return true;
                    }
                }
                return false;
            }
            // 目の前が敵陣か
            if (self.name === BLOCK_NAME.enemyArea) {
                const fieldName = target.getForwardFieldName(target.direction);
                if (target.playerOrEnemy === "player") {
                    if (fieldName === "black" || fieldName === "blackStone") {
                        return true;
                    }
                } else {
                    if (fieldName === "white" || fieldName === "whiteStone") {
                        return true;
                    }
                }
                return false;
            }
            // 目の前が敵石か
            if (self.name === BLOCK_NAME.enemyStone) {
                const fieldName = target.getForwardFieldName(target.direction);
                if (target.playerOrEnemy === "player") {
                    if (fieldName === "blackStone") {
                        return true;
                    }
                } else {
                    if (fieldName === "whiteStone") {
                        return true;
                    }
                }
                return false;
            }
            // 目の前が自石か
            if (self.name === BLOCK_NAME.stone) {
                const fieldName = target.getForwardFieldName(target.direction);
                if (target.playerOrEnemy === "player") {
                    if (fieldName === "whiteStone") {
                        return true;
                    }
                } else {
                    if (fieldName === "blackStone") {
                        return true;
                    }
                }
                return false;
            }
            // 目の前が花壇か
            if (self.name === BLOCK_NAME.forwardFlower) {
                return target.checkForwardFieldFlower(target.direction);
            }
            // 足元が花壇か
            if (self.name === BLOCK_NAME.checkFlower) {
                return target.checkFieldFlower(target.direction);
            }
            // 残り時間が半分以下
            if (self.name === BLOCK_NAME.watch) {
                return (countdown / countdownMax) < 0.5;
            }
            // 足元に自分のおじゃま石を置けるか
            if (self.name === BLOCK_NAME.checkStone) {
                if (target.playerOrEnemy === "player") {
                    return target.getFieldName() !== "whiteStone";
                } else {
                    return target.getFieldName() !== "blackStone";
                }
            }
            // フラグＡを立てる
            if (self.name === BLOCK_NAME.flagAon) {
                if (target.playerOrEnemy === "player") {
                    playerProgramingFlgA = true;
                } else {
                    enemyProgramingFlgA = true;
                }
                return true;
            }
            // フラグＡを寝かす
            if (self.name === BLOCK_NAME.flagAoff) {
                if (target.playerOrEnemy === "player") {
                    playerProgramingFlgA = false;
                } else {
                    enemyProgramingFlgA = false;
                }
                return true;
            }
            // フラグＢを立てる
            if (self.name === BLOCK_NAME.flagBon) {
                if (target.playerOrEnemy === "player") {
                    playerProgramingFlgB = true;
                } else {
                    enemyProgramingFlgB = true;
                }
                return true;
            }
            // フラグＢを寝かす
            if (self.name === BLOCK_NAME.flagBoff) {
                if (target.playerOrEnemy === "player") {
                    playerProgramingFlgB = false;
                } else {
                    enemyProgramingFlgB = false;
                }
                return true;
            }
            // フラグＡのチェック
            if (self.name === BLOCK_NAME.flagACheck) {
                if (target.playerOrEnemy === "player") {
                    return playerProgramingFlgA;
                }
                return enemyProgramingFlgA;
            }
            // フラグＢのチェック
            if (self.name === BLOCK_NAME.flagBCheck) {
                if (target.playerOrEnemy === "player") {
                    return playerProgramingFlgB;
                }
                return enemyProgramingFlgB;
            }
            // 相手の方向を向く
            if (self.name === BLOCK_NAME.turnToEnemy) {
                if (!nonTarget) {
                    return true;
                }
                if (target.nx - (target.ny - nonTarget.ny) <= nonTarget.nx && nonTarget.nx <= target.nx + (target.ny - nonTarget.ny)) {
                    target.setDirection("north");
                    return true;
                }
                if (target.nx - (nonTarget.ny - target.ny) <= nonTarget.nx && nonTarget.nx <= target.nx + (nonTarget.ny - target.ny)) {
                    target.setDirection("south");
                    return true;
                }
                if (target.ny - (target.nx - nonTarget.nx) <= nonTarget.ny && nonTarget.ny <= target.ny + (target.nx - nonTarget.nx)) {
                    target.setDirection("west");
                    return true;
                }
                if (target.ny - (nonTarget.nx - target.nx) <= nonTarget.ny && nonTarget.ny <= target.ny + (nonTarget.nx - target.nx)) {
                    target.setDirection("east");
                    return true;
                }
                return true;
            }
            // 相手の方向に背を向ける
            if (self.name === BLOCK_NAME.away) {
                if (!nonTarget) {
                    return true;
                }
                if (target.nx - (target.ny - nonTarget.ny) <= nonTarget.nx && nonTarget.nx <= target.nx + (target.ny - nonTarget.ny)) {
                    target.setDirection("south");
                    return true;
                }
                if (target.nx - (nonTarget.ny - target.ny) <= nonTarget.nx && nonTarget.nx <= target.nx + (nonTarget.ny - target.ny)) {
                    target.setDirection("north");
                    return true;
                }
                if (target.ny - (target.nx - nonTarget.nx) <= nonTarget.ny && nonTarget.ny <= target.ny + (target.nx - nonTarget.nx)) {
                    target.setDirection("east");
                    return true;
                }
                if (target.ny - (nonTarget.nx - target.nx) <= nonTarget.ny && nonTarget.ny <= target.ny + (nonTarget.nx - target.nx)) {
                    target.setDirection("west");
                    return true;
                }
                return true;
            }
            // 進める方向を向く
            if (self.name === BLOCK_NAME.turnToGo) {
                if (!nonTarget) {
                    return true;
                }
                let directions = [];
                if (target.direction === "north") {
                    directions = ["north", "east", "south", "west"];
                } else if (target.direction === "east") {
                    directions = ["east", "south", "west", "north"];
                } else if (target.direction === "south") {
                    directions = ["south", "west", "north", "east"];
                } else if (target.direction === "west") {
                    directions = ["west", "north", "east", "south"];
                }
                for (let i = 0; i < 4; i++) {
                    const d = directions[i];
                    if (!target.bumpSomething(d)) {
                        target.setDirection(d);
                        return true;
                    }
                }
                return true;
            }
            // 相手が近いか？
            if (self.name === BLOCK_NAME.enemyDistance) {
                if (!nonTarget) {
                    return false;
                }
                return (target.nx - 2 <= nonTarget.nx) && (target.nx + 2 >= nonTarget.nx) &&
                    (target.ny - 2 <= nonTarget.ny) && (target.ny + 2 >= nonTarget.ny);
            }
            // 相手が前方か？
            if (self.name === BLOCK_NAME.enemy) {
                if (!nonTarget) {
                    return false;
                }
                if (target.direction === "north") {
                    if (target.ny < nonTarget.ny) {
                        return false;
                    };
                    const sa = target.ny - nonTarget.ny
                    if (nonTarget.nx < target.nx - sa || nonTarget.nx > target.nx + sa) {
                        return false;
                    }
                    return true;
                } else if (target.direction === "west") {
                    if (target.nx < nonTarget.nx) {
                        return false;
                    };
                    const sa = target.nx - nonTarget.nx
                    if (nonTarget.ny < target.ny - sa || nonTarget.ny > target.ny + sa) {
                        return false;
                    }
                    return true;
                } else if (target.direction === "east") {
                    if (target.nx > nonTarget.nx) {
                        return false;
                    };
                    const sa = nonTarget.nx - target.nx;
                    if (nonTarget.ny < target.ny - sa || nonTarget.ny > target.ny + sa) {
                        return false;
                    }
                    return true;
                } else if (target.direction === "south") {
                    if (target.ny > nonTarget.ny) {
                        return false;
                    };
                    const sa = nonTarget.ny - target.ny;
                    if (nonTarget.nx < target.nx - sa || nonTarget.nx > target.nx + sa) {
                        return false;
                    }
                    return true;
                }
            }
            // 碁石を置く
            if (self.name === BLOCK_NAME.putStone) {
                target.putStone();
                return true;
            }
            // サブルーチンへジャンプ
            if (self.name === BLOCK_NAME.gotoSub) {
                // プログラムクラス側で対応する
                return true;
            }
            // サブルーチン入り口
            if (self.name === BLOCK_NAME.startSub) {
                // プログラムクラス側で対応する
                return true;
            }

        };

        this.changeBlock = function(name, sampleMode, arrowOKDirection, arrowNGDirection) {
            if (name === BLOCK_NAME.turnRight) {
                self.title = "右旋回";
                self.setImage("turnRight");
                self.description = "その場で右に向きを変える。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.turnLeft) {
                self.title = "左旋回";
                self.setImage("turnLeft");
                self.description = "その場で左に向きを変える。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.goBack) {
                self.title = "後退";
                self.setImage("goBack");
                self.description = "向きを変えずに１マス後退する。";
                self.doubleArrow = false;
                self.turn = 1;
            } else if (name === BLOCK_NAME.forward) {
                self.title = "前進";
                self.setImage("forward");
                self.description = "１マス前進する。障害物に当たったら前進できない。";
                self.doubleArrow = false;
                self.turn = 1;
            } else if (name === BLOCK_NAME.putStone) {
                self.title = "石配置";
                self.setImage("putStone");
                self.description = "足元に「おじゃま石」を置く。";
                self.doubleArrow = false;
                self.turn = 2;
            } else if (name === BLOCK_NAME.non) {
                self.title = "コネクタ";
                self.setImage("non");
                self.description = "なにも指示しない。離れた場所にある命令チップ同士をつなげる線として使う。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.stop) {
                self.title = "前進判定";
                self.setImage("stop");
                self.description = "前進できるかどうかを判定する。前進できるなら青矢印へ。障害物があり前進できない場合、赤矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.random1) {
                self.title = "ランダム";
                self.setImage("random1");
                self.description = "２分の１の確率で、青矢印と赤矢印のどちらかへ進む。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.myArea) {
                self.title = "前方自陣地判定";
                self.setImage("myArea");
                self.description = "１マス先が自分の陣地かどうかを判定する。自分の陣地なら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.enemyArea) {
                self.title = "前方敵陣地判定";
                self.setImage("enemyArea");
                self.description = "１マス先が敵の陣地かどうかを判定する。敵の陣地なら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.watch) {
                self.title = "時間判定";
                self.setImage("watch");
                self.description = "残り時間が半分以下なら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagAon) {
                self.title = "フラグAオン";
                self.setImage("flagAon");
                self.description = "フラグＡをオンにする。フラグとは、オンとオフを記憶しておく変数。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagAoff) {
                self.title = "フラグAオフ";
                self.setImage("flagAoff");
                self.description = "フラグＡをオフにする。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagACheck) {
                self.title = "フラグA判定";
                self.setImage("flagACheck");
                self.description = "フラグＡがオンなら青矢印へ、オフなら赤矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagBon) {
                self.title = "フラグBオン";
                self.setImage("flagBon");
                self.description = "フラグＢをオンにする。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagBoff) {
                self.title = "フラグBオフ";
                self.setImage("flagBoff");
                self.description = "フラグＢをオフにする。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagBCheck) {
                self.title = "フラグB判定";
                self.setImage("flagBCheck");
                self.description = "フラグＢがオンなら青矢印へ、オフなら赤矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.enemy) {
                self.title = "敵方向判定";
                self.setImage("enemy");
                self.description = "距離に関係なく、敵が自分の前方（扇形）にいるかを判定する。前方にいるなら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.turnToEnemy) {
                self.title = "索敵";
                self.setImage("turnToEnemy");
                self.description = "敵がいる方向を向く。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.away) {
                self.title = "離脱";
                self.setImage("away");
                self.description = "敵がいる方向に背を向ける。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.goRight) {
                self.title = "斜め右前進";
                self.setImage("goRight");
                self.description = "右斜め前に１マス前進する。";
                self.doubleArrow = false;
                self.turn = 1;
            } else if (name === BLOCK_NAME.goLeft) {
                self.title = "斜め左前進";
                self.setImage("goLeft");
                self.description = "左斜め前に１マス前進する。";
                self.doubleArrow = false;
                self.turn = 1;
            } else if (name === BLOCK_NAME.stopRight) {
                self.title = "斜め右判定";
                self.setImage("stopRight");
                self.description = "右斜め前に前進できるかどうかを判定する。前進できるなら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.stopLeft) {
                self.title = "斜め左判定";
                self.setImage("stopLeft");
                self.description = "左斜め前に前進できるかどうかを判定する。前進できるなら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.enemyDistance) {
                self.title = "敵距離判定";
                self.setImage("enemyDistance");
                self.description = "敵が近く（自分を中心に５×５マスの正方形の領域）に存在するかを判定する。存在するなら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.checkStone) {
                self.title = "石配置判定";
                self.setImage("checkStone");
                self.description = "足元におじゃま石を置けるかどうかを判定する。置けるなら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.startSub) {
                self.title = "サブルーチン";
                self.setImage("startSub");
                self.description = "サブルーチンの入り口。サブルーチンとは、別の場所から呼び出して使うプログラムのかたまり。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.gotoSub) {
                self.title = "サブルーチン";
                self.setImage("gotoSub");
                self.description = "サブルーチンを実行する。サブルーチンが終わると、ここにまた戻る。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.enemyStone) {
                self.title = "前方敵石判定";
                self.setImage("enemyStone");
                self.description = "１マス先が敵のおじゃま石かどうかを判定する。敵のおじゃま石なら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.stone) {
                self.title = "前方自石判定";
                self.setImage("stone");
                self.description = "１マス先が自分のおじゃま石かどうかを判定する。自分のおじゃま石なら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.checkFlower) {
                self.title = "花壇判定";
                self.setImage("checkFlower");
                self.description = "足元が花壇かどうかを判定する。花壇なら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.forwardFlower) {
                self.title = "前方花壇判定";
                self.setImage("forwardFlower");
                self.description = "１マス先が花壇かどうかを判定する。花壇なら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.turnToGo) {
                self.title = "前進旋回";
                self.setImage("turnToGo");
                self.description = "前進できる方向に向く。前方→右→後ろ→左の順に探す。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.empty) {
                self.title = "チップなし";
                self.setImage("empty");
                self.description = "命令チップなし。命令チップが無い場合は、スタート地点に戻る。";
                self.doubleArrow = false;
                self.turn = 0;
            }
            self.name = name;
            self.sampleMode = sampleMode;

            if (self.doubleArrow) {
                // OKとNGが同じ方向だとNGだけ表示されてしまうので、デフォルトの方向にする
                if (arrowOKDirection === arrowNGDirection) {
                    this.arrowOK = "down";
                    this.arrowNG = "right";
                } else {
                    if (arrowOKDirection) {
                        this.arrowOK = arrowOKDirection;
                    } else {
                        this.arrowOK = "leftDown";
                    }
                    if (arrowNGDirection) {
                        this.arrowNG = arrowNGDirection;
                    } else {
                        if (this.arrowOK !== "right") {
                            this.arrowNG = "right";
                        } else {
                            this.arrowNG = "rightDown";
                        }
                    }
                }
            } else {
                if (arrowOKDirection) {
                    this.arrowOK = arrowOKDirection;
                } else {
                    this.arrowOK = "down";
                }
            }

            redrawArrow();
        };

        this.changeArrowOKDirection = function() {
            if (self.arrowOK === "down") {
                if (self.doubleArrow && self.arrowNG === "leftDown") {
                    self.arrowOK = "left";
                } else {
                    self.arrowOK = "leftDown";
                }
            } else if (self.arrowOK === "leftDown") {
                if (self.doubleArrow && self.arrowNG === "left") {
                    self.arrowOK = "leftUp";
                } else {
                    self.arrowOK = "left";
                }
            } else if (self.arrowOK === "left") {
                if (self.doubleArrow && self.arrowNG === "leftUp") {
                    self.arrowOK = "up";
                } else {
                    self.arrowOK = "leftUp";
                }
            } else if (self.arrowOK === "leftUp") {
                if (self.doubleArrow && self.arrowNG === "up") {
                    self.arrowOK = "rightUp";
                } else {
                    self.arrowOK = "up";
                }
            } else if (self.arrowOK === "up") {
                if (self.doubleArrow && self.arrowNG === "rightUp") {
                    self.arrowOK = "right";
                } else {
                    self.arrowOK = "rightUp";
                }
            } else if (self.arrowOK === "rightUp") {
                if (self.doubleArrow && self.arrowNG === "right") {
                    self.arrowOK = "rightDown";
                } else {
                    self.arrowOK = "right";
                }
            } else if (self.arrowOK === "right") {
                if (self.doubleArrow && self.arrowNG === "rightDown") {
                    self.arrowOK = "down";
                } else {
                    self.arrowOK = "rightDown";
                }
            } else if (self.arrowOK === "rightDown") {
                if (self.doubleArrow && self.arrowNG === "down") {
                    self.arrowOK = "leftDown";
                } else {
                    self.arrowOK = "down";
                }
            }
            redrawArrow();
        };

        this.changeArrowNGDirection = function() {
            if (self.arrowNG === "down") {
                if (self.doubleArrow && self.arrowOK === "leftDown") {
                    self.arrowNG = "left";
                } else {
                    self.arrowNG = "leftDown";
                }
            } else if (self.arrowNG === "leftDown") {
                if (self.doubleArrow && self.arrowOK === "left") {
                    self.arrowNG = "leftUp";
                } else {
                    self.arrowNG = "left";
                }
            } else if (self.arrowNG === "left") {
                if (self.doubleArrow && self.arrowOK === "leftUp") {
                    self.arrowNG = "up";
                } else {
                    self.arrowNG = "leftUp";
                }
            } else if (self.arrowNG === "leftUp") {
                if (self.doubleArrow && self.arrowOK === "up") {
                    self.arrowNG = "rightUp";
                } else {
                    self.arrowNG = "up";
                }
            } else if (self.arrowNG === "up") {
                if (self.doubleArrow && self.arrowOK === "rightUp") {
                    self.arrowNG = "right";
                } else {
                    self.arrowNG = "rightUp";
                }
            } else if (self.arrowNG === "rightUp") {
                if (self.doubleArrow && self.arrowOK === "right") {
                    self.arrowNG = "rightDown";
                } else {
                    self.arrowNG = "right";
                }
            } else if (self.arrowNG === "right") {
                if (self.doubleArrow && self.arrowOK === "rightDown") {
                    self.arrowNG = "down";
                } else {
                    self.arrowNG = "rightDown";
                }
            } else if (self.arrowNG === "rightDown") {
                if (self.doubleArrow && self.arrowOK === "down") {
                    self.arrowNG = "leftDown";
                } else {
                    self.arrowNG = "down";
                }
            }
            redrawArrow();
        };

        this.arrowOKSprite = Sprite("arrowOK1").addChildTo(this).hide();
        this.arrowNGSprite = Sprite("arrowNG1").addChildTo(this).hide();

        function redrawArrow() {

            self.arrowOKSprite.hide();
            self.arrowNGSprite.hide();

            if (params.hideArrows) {
                return;
            }

            if (self.name === BLOCK_NAME.empty) {
                return;
            }

            if (self.arrowOK === "down") {
                self.arrowOKSprite.setImage("arrowOK1").setPosition(0, 20).setRotation(0).show();
            } else if (self.arrowOK === "up") {
                self.arrowOKSprite.setImage("arrowOK1").setPosition(0, -20).setRotation(180).show();
            } else if (self.arrowOK === "left") {
                self.arrowOKSprite.setImage("arrowOK1").setPosition(-20, 0).setRotation(90).show();
            } else if (self.arrowOK === "right") {
                self.arrowOKSprite.setImage("arrowOK1").setPosition(20, 0).setRotation(-90).show();
            } else if (self.arrowOK === "leftDown") {
                self.arrowOKSprite.setImage("arrowOK2").setPosition(-18, 18).setRotation(0).show();
            } else if (self.arrowOK === "leftUp") {
                self.arrowOKSprite.setImage("arrowOK2").setPosition(-18, -18).setRotation(90).show();
            } else if (self.arrowOK === "rightUp") {
                self.arrowOKSprite.setImage("arrowOK2").setPosition(18, -18).setRotation(180).show();
            } else if (self.arrowOK === "rightDown") {
                self.arrowOKSprite.setImage("arrowOK2").setPosition(18, 18).setRotation(-90).show();
            }

            if (!self.doubleArrow) {
                self.arrowNGSprite.hide();
                return;
            }

            if (self.arrowNG === "down") {
                self.arrowNGSprite.setImage("arrowNG1").setPosition(0, 20).setRotation(0).show();
            } else if (self.arrowNG === "up") {
                self.arrowNGSprite.setImage("arrowNG1").setPosition(0, -20).setRotation(180).show();
            } else if (self.arrowNG === "left") {
                self.arrowNGSprite.setImage("arrowNG1").setPosition(-20, 0).setRotation(90).show();
            } else if (self.arrowNG === "right") {
                self.arrowNGSprite.setImage("arrowNG1").setPosition(20, 0).setRotation(-90).show();
            } else if (self.arrowNG === "leftDown") {
                self.arrowNGSprite.setImage("arrowNG2").setPosition(-18, 18).setRotation(0).show();
            } else if (self.arrowNG === "leftUp") {
                self.arrowNGSprite.setImage("arrowNG2").setPosition(-18, -18).setRotation(90).show();
            } else if (self.arrowNG === "rightUp") {
                self.arrowNGSprite.setImage("arrowNG2").setPosition(18, -18).setRotation(180).show();
            } else if (self.arrowNG === "rightDown") {
                self.arrowNGSprite.setImage("arrowNG2").setPosition(18, 18).setRotation(-90).show();
            }

        }

        this.changeBlock(params.name, params.sampleMode, params.arrowOK, params.arrowNG);
        
    },
});


phina.main(function() {
    App = GameApp({
        assets: ASSETS,
        startLabel: 'TitleScene',
        scenes: [
            {
                label: 'TitleScene',
                className: 'TitleScene',
            },
            {
                label: 'BattleScene',
                className: 'BattleScene',
            },
            {
                label: 'ProgramingScene',
                className: 'ProgramingScene',
            },
            {
                label: "EnemySelectScene",
                className: "EnemySelectScene",
            },
            {
                label: "BlankScene",
                className: "BlankScene",
            },
        ],
    });

    App.fps = 60;
    // App.enableStats();

    App.run();

});

// window.onerror = function(message) {
//     alert("予期しないエラー：" + message);
//     return true;
// };
