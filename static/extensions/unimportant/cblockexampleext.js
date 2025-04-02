(function(Scratch) {
	if (!Scratch.extensions.unsandboxed) throw new Error("Custom C blocks don't work in sandboxed extensions")
	class CBlockTest {
		getInfo() {
			return {
				id: "cblocktest",
				name: "C Block Example",
				blocks: [
					{
						opcode: "ifelse",
						text: ["if [CONDITION] then", "else", "(text after last branch)"],
						blockType: Scratch.BlockType.CONDITIONAL,
						branchCount: 2,
						arguments: {
							CONDITION: {
								type: Scratch.ArgumentType.BOOLEAN,
							},
						},
					},
					{
						opcode: "forever",
						text: "forever",
						blockType: Scratch.BlockType.LOOP,
						isTerminal: true,
					},
					{
						opcode: "repeatUntil",
						text: "repeat until [CONDITION]",
						blockType: Scratch.BlockType.LOOP,
						arguments: {
							CONDITION: {
								type: Scratch.ArgumentType.BOOLEAN,
							},
						},
					},
				]
			}
		}
		// Recreation of Scratch's if-else block, paired with the example block info above
		ifelse(args, util) {
			if (args.CONDITION) {
				util.startBranch(1);
			} else {
				util.startBranch(2);
			}
		}
		// Forever block
		forever(args, util) {
			util.startBranch(1, true);
		}
		// Repeat until block
		repeatUntil(args, util) {
			// Arguments are reevaluated each time the block's code is run.
			// So args.CONDITION will change
			if (!args.CONDITION) {
				util.startBranch(1, true);
			}
		}
	}

	Scratch.extensions.register(new CBlockTest());
})(Scratch);