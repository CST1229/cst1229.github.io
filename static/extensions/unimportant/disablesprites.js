(function(Scratch) {
	const Sequencer = Scratch.vm.runtime.sequencer.constructor;
	const oldStepThread = Sequencer.prototype.stepThread;
	Sequencer.prototype.stepThread = function(thread) {
		if (thread.target._disabled && (!thread.stackClick || thread._disableable)) return;
		return oldStepThread.call(this, thread);
	} 
	
	class DisableSpritesExt {
		getInfo() {
			return {
				id: "cst1229disablesprites",
				name: "Disable Sprites",
				blocks: [
					{
						opcode: "disable",
						blockType: Scratch.BlockType.COMMAND,
						text: "disable [SPRITE]",
						arguments: {
							SPRITE: {
								type: Scratch.ArgumentType.STRING,
								menu: "spriteMenu",
							},
						},
					},
					{
						opcode: "enable",
						blockType: Scratch.BlockType.COMMAND,
						text: "enable [SPRITE]",
						arguments: {
							SPRITE: {
								type: Scratch.ArgumentType.STRING,
								menu: "spriteMenu",
							},
						},
					},
					{
						opcode: "isEnabled",
						blockType: Scratch.BlockType.BOOLEAN,
						text: "[SPRITE] is enabled?",
						arguments: {
							SPRITE: {
								type: Scratch.ArgumentType.STRING,
								menu: "spriteMenu",
							},
						},
					},
				],
				
				menus: {
					spriteMenu: {
						acceptReporters: true,
						items: "getSprites",
					},
				},
			};
		}
		
		getTargets(name, util) {
			let targetObjs = [];
			if (name === "__myself__") {
				targetObjs = [util.target];
			} else if (args.SPRITE === "__all__") {
				targetObjs = Scratch.vm.runtime.targets.filter(o => o.isOriginal);
			} else {
				targetObjs = [Scratch.vm.runtime.getSpriteTargetByName(name)];
			}
			return targetObjs;
		}
		
		_enable(enabled, args, util) {
			const targetObjs = this.getTargets(args.SPRITE, util);
			for (const obj of targetObjs) {
				if (obj) obj._disabled = !enabled;
			}
			for (const thread of vm.runtime.threads) {
				thread._disableable = true;
			}
		}
		
		enable(args, util) {
			this._enable(true, args, util);
		}
		disable(args, util) {
			this._enable(false, args, util);
		}
		isEnabled(args, util) {
			return !this.getTargets(args.SPRITE, util).find((o) => (o && o._disabled));
		}

		// https://extensions.turbowarp.org/Lily/ClonesPlus.js
		getSprites() {
			let spriteNames = [];
			const targets = Scratch.vm.runtime.targets;
			spriteNames.push({ text: "myself", value: "__myself__"});
			const myself = Scratch.vm.runtime.getEditingTarget().sprite.name;
			for (let index = 0; index < targets.length; index++) {
				const curTarget = targets[index].sprite;
				let display = curTarget.name;
				if (targets[index].isOriginal) {
					const jsonOBJ = {
						text: display,
						value: curTarget.name,
					};
					spriteNames.push(jsonOBJ);
				}
			}
			spriteNames.push({ text: "all sprites", value: "__all__"});
			return spriteNames;
		}
	}
	
	Scratch.extensions.register(new DisableSpritesExt());
})(Scratch);