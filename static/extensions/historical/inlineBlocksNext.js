/**
 * Most code by CST1229
 * Idea and original non-functional proof of concept by LilyMakesThings
 */

(function (Scratch) {
	"use strict";

	if (!Scratch.extensions.unsandboxed) {
		throw new Error("Inline Blocks must run unsandboxed");
	}
	
	const vm = Scratch.vm;
	const runtime = vm.runtime;
	
	const exId = "cstlmsInline";
	
	const PATCHES_ID = "__patches_" + exId;
	const patch = (obj, functions) => {
		if (obj[PATCHES_ID]) return;
		obj[PATCHES_ID] = {};
		for (const name in functions) {
			const original = obj[name];
			obj[PATCHES_ID][name] = obj[name];
			if (original) {
				obj[name] = function(...args) {
					const callOriginal = (...args) => original.call(this, ...args);
					return functions[name].call(this, callOriginal, ...args);
				};
			} else {
				obj[name] = function (...args) {
					return functions[name].call(this, () => {}, ...args);
				}
			}
		}
	}
	const unpatch = (obj) => {
		if (!obj[PATCHES_ID]) return;
		for (const name in obj[PATCHES_ID]) {
			obj[name] = obj[PATCHES_ID][name];
		}
		obj[PATCHES_ID] = null;
	}
	
	// Fix report bubble
	patch(runtime.constructor.prototype, {
		visualReport(original, blockId, value) {
			if (vm.editingTarget) {
				const block = vm.editingTarget.blocks.getBlock(blockId);
				if (block && block.opcode === (exId + "_inline") && !block.topLevel)
					return;
			}
			original(blockId, value);
		}
	});
	
	patch(runtime.sequencer.constructor.prototype, {
		stepThread(original, thread) {
			if (thread.dontStepJustThisOneTime) {
				thread.dontStepJustThisOneTime = false;
				return;
			}
			return original(thread);
		}
	});
	
	try {
		const compilerExports = vm.exports.i_will_not_ask_for_help_when_these_break();
		const {IRGenerator, JSGenerator, ScriptTreeGenerator} = compilerExports;
		const {Frame, TypedInput, TYPE_UNKNOWN} = JSGenerator.unstable_exports;
		
		patch(ScriptTreeGenerator.prototype, {
			descendStackedBlock(original, block) {
				if (block.opcode === (exId + "_return")) {
					return {
						kind: exId + ".return",
						value: this.descendInputOfBlock(block, "VALUE")
					};
				}
				return original(block);
			},
			// inline {} can be used both as a stack (top-level) and reporter (in input)
			descendInput(original, block) {
				if (block.opcode === (exId + "_inline")) {
					return {
						kind: exId + ".inline",
						stack: this.descendSubstack(block, "SUBSTACK")
					};
				}
				return original(block);
			},
		});
		
		patch(JSGenerator.prototype, {
			descendStackedBlock(original, node) {
				if (node.kind === (exId + ".return")) {
					this.source += `return ${this.descendInput(node.value).asSafe()};\n`;
				} else {
					original(node);
				}
			},
			// inline {} can be used both as a stack (top-level) and reporter (in input)
			descendInput(original, node) {
				if (node.kind === (exId + ".inline")) {
					// big hack
					const oldSrc = this.source;
					this.descendStack(node.stack, new Frame(false));
					const stackSrc = this.source.substring(oldSrc.length);
					this.source = oldSrc;
					
					return new TypedInput(
						`(yield* (function*() {
							${stackSrc};
							return "";
							})()
						)`,
						TYPE_UNKNOWN
					);
				}
				return original(node);
			},
		});
	} catch (e) {
		console.error("did garbo break stuff?", e);
	}
	
	class inline {
		getInfo() {
			return {
				id: exId,
				color1: "#565656",
				name: "Inline Blocks",
				blocks: [
					{
						opcode: "inline",
						blockType: Scratch.BlockType.REPORTER,
						text: ["inline"],
						output: "Boolean",
						outputShape: 3,
						branchCount: 1
					},
					{
						opcode: "return",
						blockType: Scratch.BlockType.COMMAND,
						text: "return [VALUE]",
						arguments: {
							VALUE: {
								type: Scratch.ArgumentType.STRING
							},
						},
						isTerminal: true
					}
				]
			}
		}
		
		// The below functions run only in the interpreter.

		inline(args, util) {
			const thread = util.thread;
			const sequencer = util.sequencer;
			
			const realBlockId = util.thread.peekStackFrame().op.id;
			const branchBlockId = thread.target.blocks.getBranch(realBlockId, 1);
			
			// Empty branch? Just return an empty string
			if (!branchBlockId) return "";
			
			const stackFrame = util.stackFrame;
			
			// https://github.com/TurboWarp/scratch-vm/blob/dff3c2f6bab2fec3c9cebbdb91fae75f9a50af51/src/blocks/scratch3_procedures.js#L32
			if (stackFrame.executed) {
				const returnValue = stackFrame.returnValue;
				// This stackframe will be reused for other reporters in this block, so clean it up for them.
				// Can't use reset() because that will reset too much.
				const threadStackFrame = util.thread.peekStackFrame();
				delete stackFrame.returnValue;
				delete stackFrame.executed;
				return returnValue;
			}
			
			stackFrame.executed = true;

			util.thread.peekStackFrame().waitingReporter = true;
			// Default return value
			stackFrame.returnValue = '';

			util.thread.pushStack(branchBlockId);
		}

		return({VALUE}, util) {
			util.stopThisScript();
			// If used outside of a custom block, there may be no stackframe.
			if (util.thread.peekStackFrame()) {
				util.stackFrame.returnValue = args.VALUE;
			}
		}
	}

	// Reimplementing the "output" and "outputShape" block parameters
	const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
	runtime._convertBlockForScratchBlocks = function(blockInfo, categoryInfo) {
		const res = cbfsb(blockInfo, categoryInfo);
		if (blockInfo.outputShape) {
			res.json.outputShape = blockInfo.outputShape;
		}
		if (blockInfo.output) {
			res.json.output = blockInfo.output;
		}
		if (!res.json.branchCount) res.json.branchCount = blockInfo.branchCount;
		return res;
	}
	
	// Compiler support
	if (vm.exports.IRGenerator && vm.exports.JSGenerator) {
		const IRGenerator = vm.exports.IRGenerator;
		const JSGenerator = vm.exports.JSGenerator;
		const ScriptTreeGenerator = IRGenerator.exports.ScriptTreeGenerator;
		const {Frame, TypedInput, TYPE_UNKNOWN} = JSGenerator.exports;
		
		patch(ScriptTreeGenerator.prototype, {
			descendStackedBlock(original, block) {
				if (block.opcode === (exId) + "_return") {
					return {
						kind: exId + ".return",
						value: this.descendInputOfBlock(block, "VALUE")
					};
				}
				return original(block);
			},
			descendInput(original, block) {
				if (block.opcode === (exId + "_inline")) {
					return {
						kind: exId + ".inline",
						stack: this.descendSubstack(block, "SUBSTACK")
					};
				}
				return original(block);
			},
		});
		
		patch(JSGenerator.prototype, {
			descendStackedBlock(original, node) {
				if (node.kind === (exId + ".return")) {
					this.source += `throw {inlineReturn: true, value: ${this.descendInput(node.value).asSafe()}}\n`;
				} else {
					original(node);
				}
			},
			descendInput(original, node) {
				if (node.kind === (exId + ".inline")) {
					// big hack
					const oldSrc = this.source;
					this.descendStack(node.stack, new Frame(false));
					const stackSrc = this.source.substring(oldSrc.length);
					this.source = oldSrc;
					
					return new TypedInput(
						`(yield* (function*() {
							try {
								${stackSrc};
								return "";
							} catch (e) {
								if (!e.inlineReturn) throw e;
								return e.value;
							}
							})()
						)`,
						TYPE_UNKNOWN
					);
				}
				return original(node);
			},
			// Error handling for when returning at the top level
			descendStack(original, nodes, frame) {
				if (nodes !== this.script.stack || this.isProcedure)
					return original(nodes, frame);
				this.source += `try {\n`;
				original(nodes, frame);
				this.source += `} catch(e) {\n`;
				this.source += `if (!e.inlineReturn) throw e;\n`;
				this.source += `}\n`;
			},
		});
	}

	Scratch.extensions.register(new inline());
})(Scratch);
