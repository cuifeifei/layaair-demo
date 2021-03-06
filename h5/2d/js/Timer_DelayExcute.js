class Timer_DelayExcute {
	constructor() {
		const 
			Browser = Laya.Browser,
			WebGL = Laya.WebGL,
			Stage = Laya.Stage,
			Stat = Laya.Stat,
			Handler = Laya.Handler;

		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.width, Browser.height, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
		Laya.stage.bgColor = "#232628";

		Stat.show();
		this.setup();
	}

	setup() {
		const Event = Laya.Event;

		let vGap = 100;

		this.button1 = this.createButton("点我3秒之后 alpha - 0.5");
		this.button1.x = (Laya.stage.width - this.button1.width) / 2;
		this.button1.y = (Laya.stage.height - this.button1.height - vGap) / 2;
		this.button1.on(Event.CLICK, this, this.onDecreaseAlpha1);

		this.button2 =this. createButton("点我60帧之后 alpha - 0.5");
		this.button2.pos(this.button1.x, this.button1.y + vGap);
		this.button2.on(Event.CLICK, this, this.onDecreaseAlpha2);
	}

	createButton(label) {
		const Sprite = Laya.Sprite;

		let w = 300,
			h = 60;

		let button = new Sprite();
		Laya.stage.addChild(button);
		button.graphics.drawRect(0, 0, w, h, "#FF7F50");
		button.size(w, h);
		button.graphics.fillText(label, w / 2, 17, "20px simHei", "#ffffff", "center");
		return button;
	}

	onDecreaseAlpha1(e) {
		const Event = Laya.Event;

		//移除鼠标单击事件
		this.button1.off(Event.CLICK, this, this.onDecreaseAlpha1);
		//定时执行一次(间隔时间)
		Laya.timer.once(3000, this, this.onComplete1);
	}

	onDecreaseAlpha2(e) {
		const Event = Laya.Event;

		//移除鼠标单击事件
		this.button2.off(Event.CLICK, this, this.onDecreaseAlpha2);
		//定时执行一次(基于帧率)
		Laya.timer.frameOnce(60, this, this.onComplete2);
	}

	onComplete1() {
		//spBtn1的透明度减少0.5
		this.button1.alpha -= 0.5;
	}

	onComplete2() {
		//spBtn2的透明度减少0.5
		this.button2.alpha -= 0.5;
	}
}

new Timer_DelayExcute();