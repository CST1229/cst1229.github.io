(function(Scratch) {
	function getCurrentBlockArgs() {
		const ScratchBlocks = window.ScratchBlocks;
		if (!ScratchBlocks) return {};
		const source = ScratchBlocks.selected;
		if (!source) return {};
		
		const args = {};
		for (const input of source.inputList) {
			for (const field of input.fieldRow) {
				if (field.isCurrentlyEditable()) args[field.name] = field.getValue();
			}
			if (!input.connection) continue;
			const block = input.connection.targetConnection.sourceBlock_;
			if (!block || !block.isShadow()) continue;
			for (const input2 of block.inputList) {
				for (const field2 of input2.fieldRow) {
					if (field2.isCurrentlyEditable()) args[input.name] = field2.getValue();
				}
			}
		}
		return args;
	}

	class ADM {
		constructor() {
			this.info = this.getInfo();
		}
		getInfo() {
			return {
				id: "adm",
				name: "ADM",
				blocks: [
					{
						opcode: "testBlock",
						blockType: Scratch.BlockType.COMMAND,
						text: "[A] -> [B]",
						arguments: {
							A: {
								type: Scratch.ArgumentType.STRING,
								menu: "test",
								defaultValue: "option",
							},
							B: {
								type: Scratch.ArgumentType.STRING,
								menu: "adm",
								defaultValue: "",
							},
						}
					},
				],
				menus: {
					test: {
						acceptReporters: true,
						items: ["0", "1", "2"],
					},
					adm: {
						acceptReporters: false,
						items: 'getADM',
					},
				}
			}
		}
		
		getADM() {
			const args = getCurrentBlockArgs();
			return ["The left argument is " + (args.A || "")];
		}
		testBlock() {
			return "";
		}
	}
	Scratch.extensions.register(new ADM());
})(Scratch);