phina.globalize();

const version = "1.0";

const BATTLE_TIME = 200;
let countdownMax = BATTLE_TIME;
let countdown = BATTLE_TIME;

ASSETS = {
    image: {
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
        "flagA": "img/blocks/flagA.png",
        "flagACheck": "img/blocks/flagACheck.png",
        "flagB": "img/blocks/flagB.png",
        "flagBCheck": "img/blocks/flagBCheck.png",
        "enemy": "img/blocks/enemy.png",
        "turnToEnemy": "img/blocks/turnToEnemy.png",

        "player": "img/player.png",
        "enemy1": "img/enemy1.png",
        "enemy2": "img/enemy2.png",
        "enemy3": "img/enemy3.png",
        "green": "img/green.png",
        "wall": "img/wall.png",
        "white": "img/white.png",
        "black": "img/black.png",
        "whiteStone": "img/whiteStone.png",
        "blackStone": "img/blackStone.png",
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
    flagA: "L",
    flagACheck: "M",
    enemy: "N",
    turnToEnemy: "O",
    flagB: "P",
    flagBCheck: "Q",
};


phina.define('TitleScene', {
    superClass: 'DisplayScene',
  
    init: function(options) {
        this.superInit(options);

        const self = this;

        this.backgroundColor = "pink";

        Label({
            text: "にゃんこの",
            fontSize: 30,
            fontWeight: 800,
            fill: "brown",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(-6))

        Label({
            text: "陣取りアルゴリズム",
            fontSize: 60,
            fontWeight: 800,
            fill: "brown",
            strokeWidth: 20,
            stroke: "white",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(-5))

        Sprite("title").addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

        BasicButton({
            width: 300,
            height: 60,
            text: "CPUと対戦",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(4.5))
        .on("pointstart", function() {
            self.exit("EnemySelectScene");
        });

        BasicButton({
            width: 300,
            height: 60,
            text: "一人で訓練",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(6))
        .on("pointstart", function() {
            self.exit("BattleScene", {trainingMode: true});
        });

    },

});

phina.define('EnemySelectScene', {
    superClass: 'DisplayScene',
  
    init: function(options) {
        this.superInit(options);

        const self = this;

        this.backgroundColor = "white";

        Label({
            text: "対戦相手",
            fontSize: 40,
            fill: "black",
            fontWeight: 800,
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(1));

        const enemy1Button = RectangleShape({
            width: 600,
            height: 200,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(3.5))
        Label({
            text: "よわい",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy1Button).addChildTo(enemy1Button).setPosition(-170, -50);
        const enemy1Sprite = Sprite("enemy1").addChildTo(enemy1Button).setPosition(-170, 10);
        const enemy1SS = FrameAnimation('nekoSpriteSheet')
        enemy1SS.attachTo(enemy1Sprite);
        enemy1SS.gotoAndPlay("south");
        LabelArea({
            text: "ランダムに動きまわる。障害物に当たって進めなくなることが多いのが弱点。",
            width: 280,
            height: 300,
            fontSize: 25,
            // fontWeight: 800,
        }).addChildTo(enemy1Button).addChildTo(enemy1Button).setPosition(100, 100);
        enemy1Button.setInteractive(true);
        enemy1Button.on("pointstart", function() {
            enemyProgram = new Program("enemy");
            enemyProgram.import("0yvK5hN4cCmGJehhjU6_tigYNoVo66gksYO9QiYG");
            self.exit("BattleScene", {trainingMode: false, enemyLevel: 1});
        });

        const enemy2Button = RectangleShape({
            width: 600,
            height: 200,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(7.5))
        Label({
            text: "ふつう",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy2Button).addChildTo(enemy2Button).setPosition(-170, -50);
        const enemy2Sprite = Sprite("enemy2").addChildTo(enemy2Button).setPosition(-170, 10);
        const enemy2SS = FrameAnimation('nekoSpriteSheet')
        enemy2SS.attachTo(enemy2Sprite);
        enemy2SS.gotoAndPlay("south");
        LabelArea({
            text: "おじゃま石でじわじわ囲ってくる、やっかいな相手。",
            width: 280,
            height: 300,
            fontSize: 25,
            // fontWeight: 800,
        }).addChildTo(enemy2Button).addChildTo(enemy2Button).setPosition(100, 100);
        enemy2Button.setInteractive(true);
        enemy2Button.on("pointstart", function() {
            enemyProgram = new Program("enemy");
            enemyProgram.import("0yvK5hN4cCmGOSAXCZOpzsj9M4We0JptdGQwzeBlKNPyA51U4F");
            self.exit("BattleScene", {trainingMode: false, enemyLevel: 2});
        });

        const enemy3Button = RectangleShape({
            width: 600,
            height: 200,
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
            fill: "white",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(11.5))
        Label({
            text: "つよい",
            fontSize: 30,
            fontWeight: 800,
        }).addChildTo(enemy3Button).addChildTo(enemy3Button).setPosition(-170, -50);
        const enemy3Sprite = Sprite("enemy3").addChildTo(enemy3Button).setPosition(-170, 10);
        const enemy3SS = FrameAnimation('nekoSpriteSheet')
        enemy3SS.attachTo(enemy3Sprite);
        enemy3SS.gotoAndPlay("south");
        LabelArea({
            text: "ランダムに動くだけなので、障害物に当たってタイムロスするのが弱点。",
            width: 280,
            height: 300,
            fontSize: 25,
            // fontWeight: 800,
        }).addChildTo(enemy3Button).addChildTo(enemy3Button).setPosition(100, 100);
        enemy3Button.setInteractive(true);
        enemy3Button.on("pointstart", function() {
            enemyProgram = new Program("enemy");
            enemyProgram.import("0yvK5hN4cCmGOSAXCZOpzsj9M4We0JptdGQwzeBlKNPyA51U4F");
            self.exit("BattleScene", {trainingMode: false, enemyLevel: 3});
        });

        BasicButton({
            width: 120,
            height: 60,
            text: "もどる",
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(6.5))
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

        if (params.block.name === BLOCK_NAME.empty || params.block.name === BLOCK_NAME.non) {
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

        // 青矢印ボタン
        const arrowOKButton = RectangleShape({
            width: 80,
            height: 40,
            fill: "white",
            cornerRadius: 8,
            strokeWidth: 8,
            stroke: "black",
        }).addChildTo(self).setPosition(self.gridX.center(2.5), self.gridY.span(1.4)).hide();
        Label({
            text: "　を回転",
            fontSize: 15,
            fontWeight: 800,
        }).addChildTo(arrowOKButton);
        arrowOKButton.setInteractive(true);
        arrowOKButton.on("pointstart", function() {
            selectedBlock.changeArrowOKDirection();
            arrowOK = selectedBlock.arrowOK;
        });
        Sprite("arrowOK1").addChildTo(arrowOKButton).setPosition(-25, -5);

        // 赤矢印ボタン
        const arrowNGButton = RectangleShape({
            width: 80,
            height: 40,
            fill: "white",
            cornerRadius: 8,
            strokeWidth: 8,
            stroke: "black",
        }).addChildTo(self).setPosition(self.gridX.center(5), self.gridY.span(1.4)).hide();
        Label({
            text: "　を回転",
            fontSize: 15,
            fontWeight: 800,
        }).addChildTo(arrowNGButton);
        arrowNGButton.setInteractive(true);
        arrowNGButton.on("pointstart", function() {
            selectedBlock.changeArrowNGDirection();
            arrowNG = selectedBlock.arrowNG;
        });
        Sprite("arrowNG1").addChildTo(arrowNGButton).setPosition(-25, -5);

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

        const sampleGroup = DisplayElement().addChildTo(this);

        // const selectMark = RectangleShape({
        //     width: 75,
        //     height: 75,
        //     fill: "transparent",
        //     stroke: "red",
        //     strokeWidth: 5,
        //     cornerRadius: 3,
        // }).addChildTo(this);

        let selectMark;

        function moveSelectMark() {
            const block = sampleGroup.children.find(b => {
                return b.name === selectedBlock.name;
            });
            // selectMark.setPosition(block.x, block.y);
            if (selectMark) {
                selectMark.remove();
            }
            selectMark = RectangleShape({
                width: 75,
                height: 75,
                fill: "transparent",
                stroke: "red",
                strokeWidth: 5,
                cornerRadius: 3,
            }).addChildTo(self).setPosition(block.x, block.y);
        }

        function markFirstSelectedBlock() {
            const block = sampleGroup.children.find(b => {
                return b.name === selectedBlock.name;
            });
            RectangleShape({
                width: 75,
                height: 75,
                fill: "transparent",
                stroke: "lightgray",
                strokeWidth: 5,
                cornerRadius: 3,
            }).addChildTo(self).setPosition(block.x, block.y);
        }

        // ブロックを並べる
        function addSampleBlock(name, x, y) {
            const block = Block({name: name, sampleMode: true, hideArrows: true}).addChildTo(self);
            block.setPosition(x, y);
            block.on("pointstart", () => {
                selectedBlock.changeBlock(block.name, true, arrowOK, arrowNG);
                description.text = block.description;
                showArrow();
                moveSelectMark();
            });
            block.addChildTo(sampleGroup);
        }

        // 特殊もの
        addSampleBlock(BLOCK_NAME.empty, this.gridX.span(3), this.gridY.span(6));
        addSampleBlock(BLOCK_NAME.non, this.gridX.span(5), this.gridY.span(6));

        // アクション系
        addSampleBlock(BLOCK_NAME.forward, this.gridX.span(3), this.gridY.span(8));
        addSampleBlock(BLOCK_NAME.goBack, this.gridX.span(5), this.gridY.span(8));
        addSampleBlock(BLOCK_NAME.turnRight, this.gridX.span(7), this.gridY.span(8));
        addSampleBlock(BLOCK_NAME.turnLeft, this.gridX.span(9), this.gridY.span(8));
        addSampleBlock(BLOCK_NAME.putStone, this.gridX.span(11), this.gridY.span(8));
        addSampleBlock(BLOCK_NAME.flagA, this.gridX.span(13), this.gridY.span(8));

        addSampleBlock(BLOCK_NAME.flagB, this.gridX.span(3), this.gridY.span(9.5));
        addSampleBlock(BLOCK_NAME.turnToEnemy, this.gridX.span(5), this.gridY.span(9.5));

        // 判定系
        addSampleBlock(BLOCK_NAME.stop, this.gridX.span(3), this.gridY.span(11.5));
        addSampleBlock(BLOCK_NAME.random1, this.gridX.span(5), this.gridY.span(11.5));
        addSampleBlock(BLOCK_NAME.myArea, this.gridX.span(7), this.gridY.span(11.5));
        addSampleBlock(BLOCK_NAME.watch, this.gridX.span(9), this.gridY.span(11.5));
        addSampleBlock(BLOCK_NAME.flagACheck, this.gridX.span(11), this.gridY.span(11.5));
        addSampleBlock(BLOCK_NAME.flagBCheck, this.gridX.span(13), this.gridY.span(11.5));

        addSampleBlock(BLOCK_NAME.enemy, this.gridX.span(3), this.gridY.span(13));

        markFirstSelectedBlock();
        moveSelectMark();

        const submitButton = BasicButton({
            text: "閉じる",
            width: 150,
            height: 50,
        })
        .addChildTo(self).setPosition(self.gridX.center(), self.gridY.span(14.5))
        .on("pointstart", function() {
            params.block.changeBlock(selectedBlock.name, false, selectedBlock.arrowOK, selectedBlock.arrowNG);
            self.exit();
        });
        submitButton.setInteractive(true);

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
            if (param.enemyLevel === 1) {
                img = "enemy1";
            } else if (param.enemyLevel === 2) {
                img = "enemy2";
            } else {
                img = "enemy3";
            }
        }
        
        this.superInit(img);

        const moveSpeed = 100;

        self.nx = param.x;
        self.ny = param.y;
        self.direction = param.direction;
        self.playerOrEnemy = param.playerOrEnemy;

        const ss = FrameAnimation('nekoSpriteSheet')
        ss.attachTo(this);
        ss.gotoAndPlay(self.direction);

        this.addChildTo(param.catPanel);
        this.setPosition(param.field.gridX.span(self.nx), param.field.gridY.span(self.ny));

        // 外壁にぶつかる？
        self.bumpWall = function (direction) {
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
            const stone = Sprite(color + "Stone").addChildTo(param.field)
                .setPosition(param.field.gridX.span(self.nx), param.field.gridY.span(self.ny));
            stone.name = color + "Stone";
            battleField[self.ny][self.nx] = stone;
        };

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

        function addArea() {
            let color;
            if (param.playerOrEnemy === "player") {
                color = "white";
            } else {
                color = "black";
            }
            // 自分の色のおじゃま石があるなら不要
            if (battleField[self.ny][self.nx] && battleField[self.ny][self.nx].name === color + "Stone") {
                return;
            }
            if (!battleField[self.ny][self.nx] || battleField[self.ny][self.nx].name !== color) {
                const area = Sprite(color).addChildTo(param.field)
                    .setPosition(param.field.gridX.span(self.nx), param.field.gridY.span(self.ny));
                area.setScale(0.1);
                area.alpha = 0.6;
                area.tweener.scaleTo(1, 200).play();
                area.name = color;
                if (battleField[self.ny][self.nx]) {
                    battleField[self.ny][self.nx].remove();
                }
                battleField[self.ny][self.nx] = area;
            }
        }

        // 前進
        self.moveToSouth = function() {
            ss.gotoAndPlay("workToSouth");
            if (self.bumpWall("south")) {
                self.tweener
                .to({y: param.field.gridY.span(self.ny + 0.5)}, moveSpeed/2)
                .to({y: param.field.gridY.span(self.ny)}, 100)
                .call(function() {ss.gotoAndPlay("south");})
                .play();
                return;
            }
            self.tweener
                .to({y: param.field.gridY.span(self.ny + 1)}, moveSpeed)
                .call(function() {
                    self.ny += 1;
                    ss.gotoAndPlay("south");
                    addArea();
                })
                .play();
        };

        self.moveToNorth = function() {
            ss.gotoAndPlay("workToNorth");
            if (self.bumpWall("north")) {
                self.tweener
                .to({y: param.field.gridY.span(self.ny - 0.5)}, moveSpeed/2)
                .to({y: param.field.gridY.span(self.ny)}, 100)
                .call(function() {ss.gotoAndPlay("north");})
                .play();
                return;
            }
            self.tweener
                .to({y: param.field.gridY.span(self.ny - 1)}, moveSpeed)
                .call(function() {
                    self.ny -= 1;
                    ss.gotoAndPlay("north");
                    addArea();
                })
                .play();
        };

        self.moveToWest = function() {
            ss.gotoAndPlay("workToWest");
            if (self.bumpWall("west")) {
                self.tweener
                .to({x: param.field.gridX.span(self.nx - 0.5)}, moveSpeed/2)
                .to({x: param.field.gridX.span(self.nx)}, 100)
                .call(function() {ss.gotoAndPlay("west");})
                .play();
                return;
            }
            self.tweener
                .to({x: param.field.gridX.span(self.nx - 1)}, moveSpeed)
                .call(function() {
                    self.nx -= 1;
                    ss.gotoAndPlay("west");
                    addArea();
                })
                .play();
        };

        self.moveToEast = function() {
            ss.gotoAndPlay("workToEast");
            if (self.bumpWall("east")) {
                self.tweener
                .to({x: param.field.gridX.span(self.nx + 0.5)}, moveSpeed/2)
                .to({x: param.field.gridX.span(self.nx)}, 100)
                .call(function() {ss.gotoAndPlay("east");})
                .play();
                return;
            }
            self.tweener
                .to({x: param.field.gridX.span(self.nx + 1)}, moveSpeed)
                .call(function() {
                    self.nx += 1;
                    ss.gotoAndPlay("east");
                    addArea();
                })
                .play();
        };

        // 後退
        self.backToSouth = function() {
            ss.gotoAndPlay("workToNorth");
            if (self.bumpWall("south")) {
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
                    addArea();
                })
                .play();
        };

        self.backToNorth = function() {
            ss.gotoAndPlay("workToSouth");
            if (self.bumpWall("north")) {
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
                    addArea();
                })
                .play();
        };

        self.backToWest = function() {
            ss.gotoAndPlay("workToEast");
            if (self.bumpWall("west")) {
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
                    addArea();
                })
                .play();
        };

        self.backToEast = function() {
            ss.gotoAndPlay("workToWest");
            if (self.bumpWall("east")) {
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
                    addArea();
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

        if (param.trainingMode) {
            countdown = BATTLE_TIME / 2;
        } else {
            countdown = BATTLE_TIME;
        }
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

        Sprite("green").addChildTo(this).setPosition(self.gridX.span(1.3), self.gridY.span(15));
        const whiteAreaPanel = Sprite("white").addChildTo(this).setPosition(self.gridX.span(1.3), self.gridY.span(15)).alpha = 0.6;
        Sprite("green").addChildTo(this).setPosition(self.gridX.span(3.3), self.gridY.span(15));
        const blackAreaPanel = Sprite("black").addChildTo(this).setPosition(self.gridX.span(3.3), self.gridY.span(15)).alpha = 0.6;

        self.whiteAreaNumLabel = Label({fontSize:30,fontWeight:800, text: "0", fill: "black"}).addChildTo(this).setPosition(self.gridX.span(1.3), self.gridY.span(15));
        self.blackAreaNumLabel = Label({fontSize:30,fontWeight:800, text: "0", fill: "white"}).addChildTo(this).setPosition(self.gridX.span(3.3), self.gridY.span(15));
 
        // プログラミングボタン
        const playerEditButton = BasicButton({
            text: "プログラムする",
            width: 220,
            height: 50,
            primary: true,
        }).addChildTo(self).setPosition(self.gridX.center(), self.gridY.span(15));
        playerEditButton.setInteractive(true);
        playerEditButton.on("pointstart", function() {
            // self.exit("ProgramingScene", {targetProgram: playerProgram, trainingMode: self.trainingMode, enemyLevel: param.enemyLevel});
            App.pushScene(ProgramingScene({targetProgram: playerProgram, trainingMode: self.trainingMode, enemyLevel: param.enemyLevel}));
        });

        // その他ボタン
        const stepButton = BasicButton({
            text: "その他",
            width: 100,
            height: 50,
        }).addChildTo(self).setPosition(self.gridX.span(13), self.gridY.span(15));
        stepButton.setInteractive(true);
        stepButton.on("pointstart", function() {
            App.pushScene(BattleMenuScene({battleScene: self}));
        });

        let step = 0;

        // プログラム１ターン実行
        self.applyOneStep = function(program, target, nonTarget) {

            const done = [];
            let cnt = 0;

            applyOneStepRecursive(program, target, nonTarget);

            function applyOneStepRecursive(program, target, nonTarget) {
                const block = program.getActiveBlock();
                if (block === null) {
                    return;
                }
                if (block.applyProgram(target, nonTarget)) {
                    program.stepOK();
                } else {
                    program.stepNG();
                }
                if (block.turn === 0) {
                    if (done.some(b =>  b === block)) {
                        if (cnt >= 3) {
                            return;
                        }
                        cnt += 1;
                    }
                    done.push(block);
                    applyOneStepRecursive(program, target, nonTarget);
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
                Sprite("green").addChildTo(fieldPanel).setPosition(fieldPanel.gridX.span(x), fieldPanel.gridY.span(y));
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
        } else {
            playerProgram = new Program("player");
            // ワーク領域のプログラムを読み込む
            const data = window.localStorage.getItem("work");
            if (data) {
                playerProgram.import(data);
            } else {
                playerProgram.import("0yvK5hN4cCmGOSAXYIHbRAucjJgU");
            }
        }

        // トレーニングモードではないのなら敵を生成する
        if (!param.trainingMode) {
            self.enemy = Cat({playerOrEnemy: "enemy", enemyLevel: param.enemyLevel, x:5, y:1, direction: "south", field: fieldPanel, catPanel: catPanel});
            catPanel.enemy = self.enemy;
            if (enemyProgram) {
                enemyProgram.restart();
            } else {
                enemyProgram = new Program("enemy");
            }
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

    },
    step: 0,
    nextTurn: "player",
    restartFlg: false,
    update: function() {
        const self = this;

        if (!playerProgram) {
            return;
        }

        this.step += 1;
        if (this.trainingMode) {
            if (this.step < 30) {
                return;
            }
        } else {
            if (this.step < 15) {
                return;
            }
        }
        this.step = 0;


        if (countdown <= 0) {
            self.countArea();
            self.player.setDirection("south");
            if (self.enemy) {
                self.enemy.setDirection("south");
            }
            return;
        }
        countdown -= 1;
        this.updateCountdown();

        if (this.nextTurn === "player") {
            this.applyOneStep(playerProgram, self.player, self.enemy);
            if (!this.trainingMode) {
                this.nextTurn = "enemy";
            }
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
            width: this.width - 300,
            height: this.height - 400,
            fill: "white",
            stroke: "black",
            strokeWidth: 10,
            cornerRadius: 10,
        }).addChildTo(this);

        // 最初からやり直すボタン
        const clearButton = BasicButton({
            text: "最初からやり直す",
            width: 300,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(5))
        .on("pointstart", function() {
            param.battleScene.restartFlg = true;
            self.exit();
        });

        // 敵のプログラムを表示
        const saveButton = BasicButton({
            text: "相手のプログラム",
            width: 300,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(7))
        .on("pointstart", function() {
            App.pushScene(ProgramingScene({targetProgram: enemyProgram}));
        });

        const gotoTitleButton = BasicButton({
            text: "タイトルにもどる",
            width: 300,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(9))
        .on("pointstart", function() {
            self.exit();
            param.battleScene.exit("TitleScene");
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

        // const label = Label({
        //     fontSize: 25,
        //     fill: "black",
        //     fontWeight: 800,
        // }).addChildTo(this).setPosition(self.gridX.center(), self.gridY.span(3));

        // 全削除ボタン
        const clearButton = BasicButton({
            text: "プログラムをクリア",
            width: 300,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(4))
        .on("pointstart", function() {
            playerProgram.clear();
            App.pushScene(MessageDialogScene({message: "プログラムを消去しました。"}));
        });

        // セーブボタン
        const saveButton = BasicButton({
            text: "保存する",
            width: 300,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(6))
        .on("pointstart", function() {
            App.pushScene(SaveAndLoadScene({mode: "save"}));
        });

        // ロードボタン
        const loadButton = BasicButton({
            text: "読み込む",
            width: 300,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(8))
        .on("pointstart", function() {
            App.pushScene(SaveAndLoadScene({mode: "load"}));
        });

        // シェアボタン
        const shareButton = BasicButton({
            text: "シェア用のURL作成",
            width: 300,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(10))

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

// プログラミングシーン
phina.define('ProgramingScene', {
    superClass: 'DisplayScene',
    init: function(param) {
  
        const self = this;

        this.superInit();

        this.backgroundColor = "gray";

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

        if (param.targetProgram === playerProgram) {
            BasicButton({
                text: "その他",
                width: 100,
                height: 50,
            }).addChildTo(self)
            .setPosition(self.gridX.center(5), self.gridY.span(15.2))
            .on("pointstart", function() {
                App.pushScene(ProgramingMenuScene());
            });
        }

        // バトルシーン遷移ボタン
        const gotoBattleButton = BasicButton({
            text: "もどる",
            width: 120,
            height: 50,
            primary: true,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(15.2))
        .on("pointstart", function() {
            if (param.targetProgram === playerProgram) {
                // ワーク領域にプログラムを保存
                const data = playerProgram.export();
                window.localStorage.setItem("work", data);
            }
            self.exit("BattleScene", {trainingMode: param.trainingMode, enemyLevel: param.enemyLevel});
        });

        for (let x = 0; x < blocksPanel.gridX.columns; x++) {
            for (let y = 0; y < blocksPanel.gridY.columns; y++) {
                param.targetProgram.blocks[y][x]
                    .addChildTo(blocksPanel)
                    .setPosition(blocksPanel.gridX.span(x), blocksPanel.gridY.span(y));
            }
        }
        

    },
});

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
            width: this.width - 100,
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
            label.text = "どこに保存しますか？";
        } else {
            label.text = "どれを読み込みますか？";
        }

        // 保存場所１
        const file1Button = BasicButton({
            text: "保存場所１",
            width: 500,
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
            text: "保存場所２",
            width: 500,
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
            text: "保存場所３",
            width: 500,
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
            const data = playerProgram.export();
            window.localStorage.setItem("data" + fileNumber, data);
            App.pushScene(MessageDialogScene({message: "保存しました。"}));
        }

        function load(fileNumber) {
            const data = window.localStorage.getItem("data" + fileNumber);
            playerProgram.import(data);
            App.pushScene(MessageDialogScene({message: "読み込みました。"}));
        }

        function canLoad(fileNumber) {
            return !!window.localStorage.getItem("data" + fileNumber);
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

// 空っぽのシーン
phina.define('BlankScene', {
    superClass: 'DisplayScene',
    init: function(param) {
        const self = this;
        this.superInit();
        setTimeout(function() {
            self.exit(param.callbackScene, param);
        }, 1);
    }
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
            width: this.width,
            height: 180,
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
        }).addChildTo(this).setPosition(self.gridX.center(), self.gridY.span(7.3));

        // 閉じるボタン
        const closeButton = BasicButton({
            text: "OK",
            width: 170,
            height: 50,
        }).addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.span(8.5))
        .on("pointstart", function() {
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
    },
});


let playerProgram;
let enemyProgram;

function Program(playerOrEnemy) {

    const self = this;

    playerProgramingFlgA = false;
    enemyProgramingFlgA = false;
    playerProgramingFlgB = false;
    enemyProgramingFlgB = false;

    self.blocks = [];

    function initBlocks() {
        // ブロックの初期配置
        [...Array(13)].map(() => self.blocks.push([]));
        self.blocks.forEach((row, y) => {
            [...Array(9)].map((_, x) => {
                if (x === 4 && y === 0) {
                    var start = Sprite('start');
                    Sprite("arrowOK1").addChildTo(start).setPosition(0, 20);
                    start.name = "Z";
                    start.doubleArrow = false;
                    start.arrowOK = "down";
                    row.push(start);
                } else {
                    row.push(Block({name: BLOCK_NAME.empty, sampleMode: false, playerOrEnemy: playerOrEnemy}));
                }
            });
        });
    }

    initBlocks();

    self.x = 4;
    self.y = 1;

    self.clear = function () {
        self.blocks.forEach((row, y) => {
            row.forEach((block, x) => {
                if (x === 4 && y === 0) {
                    // スタートブロックなのでクリア不要
                } else {
                    block.changeBlock(BLOCK_NAME.empty, false, "down", "down");
                }
            });
        });
        playerProgramingFlgA = false;
        enemyProgramingFlgA = false;
        playerProgramingFlgB = false;
        enemyProgramingFlgB = false;
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

        const program = URLCompressor.expand(data);

        const blocks = program.split(";");

        blocks.forEach(function(str, blockIndex) {

            if (str === "") {
                return;
            }

            const blockName = str.substring(0, 1);
            const targetBlock = self.blocks[Math.floor(blockIndex / 9)][blockIndex % 9];

            // スタート地点なら何もしない
            if (blockName === "Z") {
                return;
            }

            // 空ブロックなら矢印は不要
            if (blockName === BLOCK_NAME.empty) {
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

    self.getActiveBlock = function() {
        // いまのブロックがなにも指定されていない場合は、エントリポイントに戻る
        if (self.blocks[self.y][self.x].name === BLOCK_NAME.empty) {
            self.restart();
        }
        return self.blocks[self.y][self.x];
    };

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
        this.sampleMode = false;
        this.doubleArrow = false;
        this.arrowOK = "down";
        this.arrowNG = "";
        this.turn = 1;


        this.background = "white";


        this.setInteractive(true);

        this.on("pointstart", function() {
            if (self.sampleMode || params.playerOrEnemy === "enemy") {
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
                return !target.bumpWall(target.direction);
            }
            // 50%の確率
            if (self.name === BLOCK_NAME.random1) {
                return Math.random() > 0.5;
            }
            // 目の前が自陣か
            if (self.name === BLOCK_NAME.myArea) {
                if (target.playerOrEnemy === "player") {
                    if (target.getForwardFieldName(target.direction) === "white") {
                        return true;
                    }
                } else {
                    if (target.getForwardFieldName(target.direction) === "black") {
                        return true;
                    }
                }
                return false;
            }
            // 残り時間が半分以下
            if (self.name === BLOCK_NAME.watch) {
                return (countdown / countdownMax) < 0.5;
            }
            // フラグＡのトグル
            if (self.name === BLOCK_NAME.flagA) {
                if (target.playerOrEnemy === "player") {
                    playerProgramingFlgA = !playerProgramingFlgA;
                } else {
                    enemyProgramingFlgA = !enemyProgramingFlgA;
                }
                return true;
            }
            // フラグＢのトグル
            if (self.name === BLOCK_NAME.flagB) {
                if (target.playerOrEnemy === "player") {
                    playerProgramingFlgB = !playerProgramingFlgB;
                } else {
                    enemyProgramingFlgB = !enemyProgramingFlgB;
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
            // 相手が前方か？
            if (self.name === BLOCK_NAME.enemy) {
                if (!nonTarget) {
                    return;
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
                return !target.putStone();
            }

        };

        this.changeBlock = function(name, sampleMode, arrowOKDirection, arrowNGDirection) {
            if (name === BLOCK_NAME.turnRight) {
                self.setImage("turnRight");
                self.description = "その場で右に向きを変える。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.turnLeft) {
                self.setImage("turnLeft");
                self.description = "その場で左に向きを変える。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.goBack) {
                self.setImage("goBack");
                self.description = "向きを変えずに１マス後退する。";
                self.doubleArrow = false;
                self.turn = 1;
            } else if (name === BLOCK_NAME.forward) {
                self.setImage("forward");
                self.description = "１マス前進する。障害物に当たったら跳ね返される。";
                self.doubleArrow = false;
                self.turn = 1;
            } else if (name === BLOCK_NAME.putStone) {
                self.setImage("putStone");
                self.description = "足元に「おじゃま石」を置く。";
                self.doubleArrow = false;
                self.turn = 1;
            } else if (name === BLOCK_NAME.non) {
                self.setImage("non");
                self.description = "なにも指示しない、という命令。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.stop) {
                self.setImage("stop");
                self.description = "前進できるかどうかを判定する。前進できるなら青矢印へ。障害物があり前進できない場合、赤矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.random1) {
                self.setImage("random1");
                self.description = "２分の１の確率で、青矢印と赤矢印のどちらかへ進む。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.myArea) {
                self.setImage("myArea");
                self.description = "１マス先が自分の陣地かどうかを判定する。自分の陣地なら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.watch) {
                self.setImage("watch");
                self.description = "残り時間が半分以下なら、青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagA) {
                self.setImage("flagA");
                self.description = "フラグＡがオフならオン、オンならオフにする。フラグとは、オンとオフを記憶しておく変数。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagACheck) {
                self.setImage("flagACheck");
                self.description = "フラグＡがオンなら青矢印へ、オフなら赤矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagB) {
                self.setImage("flagB");
                self.description = "フラグＢがオフならオン、オンならオフにする。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.flagBCheck) {
                self.setImage("flagBCheck");
                self.description = "フラグＢがオンなら青矢印へ、オフなら赤矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.enemy) {
                self.setImage("enemy");
                self.description = "距離に関係なく、相手が自分の前方にいるかどうかを判定する。前方にいるなら青矢印へ。";
                self.doubleArrow = true;
                self.turn = 0;
            } else if (name === BLOCK_NAME.turnToEnemy) {
                self.setImage("turnToEnemy");
                self.description = "相手がいる方向を向く。";
                self.doubleArrow = false;
                self.turn = 0;
            } else if (name === BLOCK_NAME.empty) {
                self.setImage("empty");
                self.description = "命令なし。";
                self.doubleArrow = false;
                self.turn = 0;
            }
            self.name = name;
            self.sampleMode = sampleMode;

            if (self.doubleArrow) {
                if (arrowOKDirection) {
                    this.arrowOK = arrowOKDirection;
                } else {
                    this.arrowOK = "leftDown";
                }
                if (arrowNGDirection) {
                    this.arrowNG = arrowNGDirection;
                } else {
                    this.arrowNG = "rightDown";
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
                if (self.arrowNG === "leftDown") {
                    self.arrowOK = "left";
                } else {
                    self.arrowOK = "leftDown";
                }
            } else if (self.arrowOK === "leftDown") {
                if (self.arrowNG === "left") {
                    self.arrowOK = "leftUp";
                } else {
                    self.arrowOK = "left";
                }
            } else if (self.arrowOK === "left") {
                if (self.arrowNG === "leftUp") {
                    self.arrowOK = "up";
                } else {
                    self.arrowOK = "leftUp";
                }
            } else if (self.arrowOK === "leftUp") {
                if (self.arrowNG === "up") {
                    self.arrowOK = "rightUp";
                } else {
                    self.arrowOK = "up";
                }
            } else if (self.arrowOK === "up") {
                if (self.arrowNG === "rightUp") {
                    self.arrowOK = "right";
                } else {
                    self.arrowOK = "rightUp";
                }
            } else if (self.arrowOK === "rightUp") {
                if (self.arrowNG === "right") {
                    self.arrowOK = "rightDown";
                } else {
                    self.arrowOK = "right";
                }
            } else if (self.arrowOK === "right") {
                if (self.arrowNG === "rightDown") {
                    self.arrowOK = "down";
                } else {
                    self.arrowOK = "rightDown";
                }
            } else if (self.arrowOK === "rightDown") {
                if (self.arrowNG === "down") {
                    self.arrowOK = "leftDown";
                } else {
                    self.arrowOK = "down";
                }
            }
            redrawArrow();
        };

        this.changeArrowNGDirection = function() {
            if (self.arrowNG === "down") {
                if (self.arrowOK === "leftDown") {
                    self.arrowNG = "left";
                } else {
                    self.arrowNG = "leftDown";
                }
            } else if (self.arrowNG === "leftDown") {
                if (self.arrowOK === "left") {
                    self.arrowNG = "leftUp";
                } else {
                    self.arrowNG = "left";
                }
            } else if (self.arrowNG === "left") {
                if (self.arrowOK === "leftUp") {
                    self.arrowNG = "up";
                } else {
                    self.arrowNG = "leftUp";
                }
            } else if (self.arrowNG === "leftUp") {
                if (self.arrowOK === "up") {
                    self.arrowNG = "rightUp";
                } else {
                    self.arrowNG = "up";
                }
            } else if (self.arrowNG === "up") {
                if (self.arrowOK === "rightUp") {
                    self.arrowNG = "right";
                } else {
                    self.arrowNG = "rightUp";
                }
            } else if (self.arrowNG === "rightUp") {
                if (self.arrowOK === "right") {
                    self.arrowNG = "rightDown";
                } else {
                    self.arrowNG = "right";
                }
            } else if (self.arrowNG === "right") {
                if (self.arrowOK === "rightDown") {
                    self.arrowNG = "down";
                } else {
                    self.arrowNG = "rightDown";
                }
            } else if (self.arrowNG === "rightDown") {
                if (self.arrowOK === "down") {
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

