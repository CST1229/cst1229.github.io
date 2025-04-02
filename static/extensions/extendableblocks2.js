// Name: Extendable Blocks 2
// ID: cst1229extendable2
// Description: If Extendable Blocks is so good, why isn't there an Extendable Blocks 2?
// By: CST1229 <https://scratch.mit.edu/users/CST1229/>
// License: MPL-2.0

(function (Scratch) {
	"use strict";

	if (!Scratch.extensions.unsandboxed) {
		throw new Error("Extendable Blocks 2 must be run unsandboxed");
	}

	const exId = "cst1229extendable2";

	const menuIconURI =
		"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCwwLDQwLDQwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIwLC0xNjApIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMjIsMTgwYzAsLTkuOTQxMTMgOC4wNTg4NywtMTggMTgsLTE4YzkuOTQxMTMsMCAxOCw4LjA1ODg3IDE4LDE4YzAsOS45NDExMyAtOC4wNTg4NywxOCAtMTgsMThjLTkuOTQxMTMsMCAtMTgsLTguMDU4ODcgLTE4LC0xOHoiIGZpbGw9IiM1OWMwNTkiIHN0cm9rZT0iIzM4OTQzOCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PGltYWdlIHg9IjIyNCIgeT0iMTY0IiB3aWR0aD0iMTYiIGhlaWdodD0iMzIiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkFBQUFBZ0NBWUFBQUFiaWZqTUFBQUNia2xFUVZSSVMyTmtvQkF3VXFpZllRUVp3QXdNS3lZZy9vMGVab1RDZ0ZsRlFrS0ltWldWRmFUeHgvZnYveG5mdkhuL0FNaUVHWVRQQUJZRlVWRVJkZzRPcGpYYnRqa0w4UEZKdHpjMXJkbTdhOWUzbTQ4ZnY0YTVCcGNCWU0zaWtwSXNlNDRlbmNMRHcrTVBzdkhYcjE4WDlWUlV2UDUrL2ZybHpydDNuMEJpMkF3QWE1WlRVR0Rkdm4vL0xDNXViZzlrZjllV2wyc3RXTGJzNVpNblQ5NWhNd0N1ZWVlQkEvTTR1TGhjMEFQdDBMNTk3c25SMGVmdnZIZ0I4Z2FLQ3docUJtbTRkT2xTVklDcjY3NzdyMTY5UkRhQUtNMGdEYmR1M1VwenQ3SFovT0QxNnhjd0E1aUFmaGFEK25rTzBNOXUrUExIZzd0Mzh4MHNMRlkvZlBQbU9kZ0FCUUVCQVhaZVhxNXoxNi9QQm1yMklwUzVIajk4V094cWE3c0NHSlhQd0FZb2lvbUpyOTY4MmRMWXpHdzlJYzBnZWFBQnBVQURscUVZc0dielppc2pNN04xeEJqdzVPSERNaGRiMjZWQUEwQmUrTThveDg4dnlNbkh4d24wQWlqT3ZRa1pndVFGaUFGQUFoeUlXcnE2N0d1M2JGbk13Y2xwaXpjUTc5MHI4SEJ3V0EzM0FsUXhPQnBOTFN3NEY2MWF0WXlEZzhNQ2x5R2dhSFN6dHQ0Q2p3VWtoV0JEbkZ4ZHVhYlBuNytLalkzTkdKc2g1ODZkaXdqMjhEaUluQTZRMVlFTjhRc0s0dTJlTkdrMTBCQjlkRU9BdWRFdFBTN3U0dDJYTDE5aHl3c2dNYkFoWVZGUi9DM2QzZXVBUllFV3NpRTliVzI2RTZkUGY0WXJNOEhVZ2czSnlNMFZMcXFvV0E4MFJCVWs4ZS9mdjNkYUNncTZoTEl6aWlFZzc5UTBOaVl3TWpKeVhMcDRjV2RXY3ZJVllBeUFuUDhIbHhlUVhjd0VUQ2Y4akt5c0hNRG9aZnovOSs4djFtZlBQbDBGbGkwd1JZVEtSR1Ixb0VMMUwzcWdFbXNBenJRMWFnQURBd0FXK1BnaE4rNlNhZ0FBQUFCSlJVNUVya0pnZ2c9PSIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48aW1hZ2UgeD0iMjQwIiB5PSIxNjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCQUFBQUFnQ0FZQUFBQWJpZmpNQUFBQ1kwbEVRVlJJUzJOa29CQXdVcWlmWVJnYndBb01tMzlBL0pkUUdLR0VnWUtDQXNmL0wxOEVPVGc1d2VKL2YvLytmZWZGaTNmNERJSWJvTTNBd1BaSFZsYkUzY3VMdTdTcUt2amRodzhQdzN4OER2Nzg4ZVBmZzlldjN3QU4rWVBOTlhBRGxBUUYrVmw1ZUxndjNibXpnNDJOVFJlaytNdVhMeHRjcksxelh6NS8vZ2VYSVhBRDFLU2tSREx5OGlRTHk4c3ZJZHYwN2R1M3paNE9EdG1QSGp6NGpjMFF1QUVLb3FJU3k5ZXRNN1d3c2RtRTd0UWYzNzd0Y1hkd1NNSm1DTndBZVJFUnlaMUhqbmlvcTZ2UHcrWlhYSWJBREdCVWw1V1YzTEYvZjRpQ3N2SkVYRkdIelJDWUFVeEFBeVQySGoyYUlDMHIyNG92N3I5OS9iclQwOUV4RmVxZFZ5Z0dIRGh4SWxWQ1NxcUJVT0lCQmF5UmhrYkd6OCtmdjZGNDRlREprNW5pa3BJMWhBd0F5Wjg0ZXRRL0tpam9KSW9CaDArZnpoSVZGNjhteG9BekowOEdoUG41blNETEJjQncyR3FrcVptRzdBVUdZQ0JLQWNNZ0RSZ0c5ZmhjOE9QNzk4UEJQajZ4MXk1Zi9nbE1XUEJBQkJ1dzU4aVJPQms1dVhhYzBmamp4NG00c0xDbzB5ZE9mSWVsU3BTVXVPL1lzV0JGRlpVcDJBejQ5ZXZYMmN6RXhMQjl1M2QvUTA3U2NBTVV4Y1RFTis3WjQ2S3JxN3NFM1FDZzV2T0ZXVmxoMnpadCtvS2VIMUF5MDdUNTh3MmQzZHgySVJzQUxCS3UxWlNXQnExYXR1d2ozc3dFeXM0T25wN0NjNVlzdWNESXlNZ0xNZ1NvK1VaSGMzUEl2Qmt6M2hMTXppb01ET3pNc3JMQ3N4WXMwTkhTMFhILy8vLy96NWI2K3ZtYjE2Ly9kUC9WcTdjRUN4U1FqYUJTNmJlVUZCOGpNek1iTUxyK00vNzU4LzNCaHcrZm9PVWoxc2pCVlM4d1F6WDlKNVFxaDNIRlFzanJjSG1Ld3dBQXhsWXpuR1BaZHRnQUFBQUFTVVZPUks1Q1lJST0iIGZpbGw9IiMwMDAwMDAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIyNy40NzIxNywxNzMuMjc4MjhjMC4wOTg1NiwtMC4xMTAxNSAwLjE5MDk0LC0wLjIyNDQ3IDAuMjc4NDUsLTAuMzQyMjVjMC4xMDI1MiwtMC4yMTkyNCAwLjIzNTkyLC0wLjQyMTE0IDAuMzk0NiwtMC42MDAxMmMwLjYxNTUzLC0xLjA0MjEzIDEuMDQ1NTUsLTIuMjM3MTkgMi4wMDU0NywtMy4xODc3YzQuMDA5NTIsLTMuOTcwMTkgMTEuNzI4OTEsLTUuMjQzODEgMTUuNzE1MDIsLTAuNTkzMzVjMi43MTA0NCwzLjE2MjE4IDEuMjMzNjgsOS43NjkzMyAtMC40MDQwMiwxMy4xMjQ2MWMtMC40NzU2MiwwLjk3NDQ1IC0xLjE0OTU2LDIuNjc4MTggLTEuOTQ0MTgsMy41Mjc3Yy0wLjYyOTcsMC42NzMyMSAtMi45MDExNCwxLjkwNjQ0IC0xLjk3OTY2LDEuOTMwOTNjMS42MzQ0MSwwLjA0MzQ0IDE2Ljg2ODk4LC0wLjkwNDk4IDEwLjkwNzUzLDUuMDU2NDdjLTEuNDE4OTgsMS40MTg5OCAtMy45OTMyNiwtMC4wNDk3MyAtNS42MzM5MywtMC4wNTY0N2MtNC42NjM1NSwtMC4wMTkxNyAtOS4zMjcyMiwwLjAxNzM0IC0xMy45OTA3OCwwYy0xLjY3NDMyLC0wLjAwNjIzIC00LjYwNTQxLC0wLjc2NTggLTUuMDI4MjksLTIuNjY4NzVjLTAuODkyNTgsLTQuMDE2NjIgNi4wMjg3NywtMy44MTA5IDguMzU2MDMsLTQuOTE5M2MzLjA3NTMzLC0xLjQ2NDY4IDQuNjEwOTEsLTMuNzM4MTUgNS41MDMwOCwtNy4wMTg2MmMwLjMzNDQ0LC0xLjIyOTcyIDEuMjkwOTIsLTUuMTA2MSAtMC4wOTc5NCwtNi4wODAwNmMtNC40NTI5OSwtMy4xMjI3MyAtNi42MDY4NiwwLjk1MjU3IC05LjIyMDk5LDMuNDg1MzdjLTAuMzcyMjIsMC45MTMzIC0xLjI2ODk2LDEuNTU3MDMgLTIuMzE2MDUsMS41NTcwM2MtMC44MTk5OSwwLjI3MzQzIC0xLjU2ODA1LC0wLjI5ODM2IC0yLjAzNTk3LC0xLjA0ODg2Yy0wLjE5NDQ0LC0wLjI3MjMyIC0wLjMzNTYxLC0wLjU4NTI4IC0wLjQwODI4LC0wLjkyMzY4Yy0wLjA4NzY3LC0wLjMxODk5IC0wLjExNjEzLC0wLjYyNDUgLTAuMDcxNTYsLTAuODcyMzl6IiBmaWxsPSIjZmYwMDAwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MjA6MjAtLT4=";

	const vm = Scratch.vm;

	const blocks = [];
	const funcs = {};
	const MIN_INPUTS = 1;
	const MAX_INPUTS = 24;
	let paletteInputs = 2;

	for (let i = MIN_INPUTS; i <= MAX_INPUTS; i++) {
		const inputCount = i;

		const sep = () => ({
			blockType: Scratch.BlockType.XML,
			xml: '<sep gap="36"/>',
		});

		const inputsFor = (prefix, count = inputCount) => {
			return (new Array(count)).fill(0).map((val, i) => `[${prefix}${i}]`);
		};
		const argsFor = (prefix, type, defaultValue = undefined, count = inputCount) => {
			const args = {};
			for (let i = 0; i < count; i++) {
				args[`${prefix}${i}`] = {
					type,
					defaultValue,
				};
			}
			return args;
		};
		// haha bfdi branches
		const branches = (count, func) => {
			return (new Array(count)).fill(0).map((val, i) => func(i));
		};

		blocks.push(...([
			{
				opcode: "extendJoin" + inputCount,
				blockType: Scratch.BlockType.REPORTER,
				text: "join " + inputsFor("ARG").join(""),
				arguments: argsFor("ARG", Scratch.ArgumentType.STRING, ""),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			{
				opcode: "extendSum" + inputCount,
				blockType: Scratch.BlockType.REPORTER,
				text: inputsFor("ARG").join("+"),
				arguments: argsFor("ARG", Scratch.ArgumentType.NUMBER, "0", inputCount + 1),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			{
				opcode: "extendMinus" + inputCount,
				blockType: Scratch.BlockType.REPORTER,
				text: inputsFor("ARG").join("-"),
				arguments: argsFor("ARG", Scratch.ArgumentType.NUMBER, "0", inputCount + 1),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			{
				opcode: "extendProduct" + inputCount,
				blockType: Scratch.BlockType.REPORTER,
				text: inputsFor("ARG").join("*"),
				arguments: argsFor("ARG", Scratch.ArgumentType.NUMBER, "1", inputCount + 1),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			{
				opcode: "extendDivide" + inputCount,
				blockType: Scratch.BlockType.REPORTER,
				text: inputsFor("ARG").join("/"),
				arguments: argsFor("ARG", Scratch.ArgumentType.NUMBER, "1", inputCount + 1),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			sep(),
			{
				opcode: "extendAnd" + inputCount,
				blockType: Scratch.BlockType.BOOLEAN,
				text: inputsFor("ARG").join("and"),
				arguments: argsFor("ARG", Scratch.ArgumentType.BOOLEAN, undefined, inputCount + 1),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			{
				opcode: "extendOr" + inputCount,
				blockType: Scratch.BlockType.BOOLEAN,
				text: inputsFor("ARG").join("or"),
				arguments: argsFor("ARG", Scratch.ArgumentType.BOOLEAN, undefined, inputCount + 1),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			{
				opcode: "extendLess" + inputCount,
				blockType: Scratch.BlockType.BOOLEAN,
				text: inputsFor("ARG").join("<"),
				arguments: argsFor("ARG", Scratch.ArgumentType.STRING, "", inputCount + 1),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			{
				opcode: "extendEqual" + inputCount,
				blockType: Scratch.BlockType.BOOLEAN,
				text: inputsFor("ARG").join("="),
				arguments: argsFor("ARG", Scratch.ArgumentType.STRING, "", inputCount + 1),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			{
				opcode: "extendGreater" + inputCount,
				blockType: Scratch.BlockType.BOOLEAN,
				text: inputsFor("ARG").join(">"),
				arguments: argsFor("ARG", Scratch.ArgumentType.STRING, "", inputCount + 1),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			sep(),
			{
				opcode: "joinWith" + inputCount,
				blockType: Scratch.BlockType.REPORTER,
				text: "join " + inputsFor("ARG").join("") + ` with [ARG${inputCount}]`,
				arguments: {
					...argsFor("ARG", Scratch.ArgumentType.STRING, ""),
					["ARG" + inputCount]: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "_"
					},
				},
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			{
				opcode: "extendArray" + inputCount,
				blockType: Scratch.BlockType.REPORTER,
				text: "create json array " + inputsFor("ARG").join(""),
				arguments: argsFor("ARG", Scratch.ArgumentType.STRING, ""),
				extensions: ["colours_operators"],
				disableMonitor: true,
			},
			sep(),
			{
				opcode: "runBranch" + inputCount,
				blockType: Scratch.BlockType.CONDITIONAL,
				text: "run branch [BRANCH] of",
				branchCount: inputCount,
				arguments: {
					BRANCH: {
						type: Scratch.ArgumentType.NUMBER,
						defaultValue: 1,
					},
				},
				extensions: ["colours_control"],
			},
			{
				opcode: "extendIf" + inputCount,
				blockType: Scratch.BlockType.CONDITIONAL,
				text: branches(inputCount + 1, (i) => {
					if (i === 0) {
						return `if [CONDITION${i}] then`;
					}
					return `else if [CONDITION${i}] then`;
				}),
				arguments: argsFor("CONDITION", Scratch.ArgumentType.BOOLEAN, "", inputCount + 1),
				branchCount: inputCount + 1,
				extensions: ["colours_control"],
			},
			{
				opcode: "extendIfElse" + inputCount,
				blockType: Scratch.BlockType.CONDITIONAL,
				text: branches(inputCount + 2, (i) => {
					if (i === 0) {
						return `if [CONDITION${i}] then`;
					} else if (i === (inputCount + 1)) {
						return "else";
					}
					return `else if [CONDITION${i}] then`;
				}),
				arguments: argsFor("CONDITION", Scratch.ArgumentType.BOOLEAN, "", inputCount + 1),
				branchCount: inputCount + 2,
				extensions: ["colours_control"],
			},
			{
				opcode: "extendSwitch" + inputCount,
				blockType: Scratch.BlockType.CONDITIONAL,
				text: branches(inputCount + 1, (i) => {
					const val = `case [CASE_VALUE${i}]`;
					if (i === 0) {
						return "switch [VALUE] " + val;
					} else if (i === inputCount) {
						return "default";
					}
					return val;
				}),
				arguments: {
					VALUE: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: "",
					},
					...argsFor("CASE_VALUE", Scratch.ArgumentType.STRING, "", inputCount)
				},
				branchCount: inputCount + 1,
				extensions: ["colours_control"],
			},
		].map(o => {
			if (typeof o !== "object") return o;
			return {
				...o,
				extendable2Inputs: inputCount
			};
		})));

		// regex:
		// 	(\w+)\((.+)\) \{
		// 	funcs["$1" + inputCount] = function($2) {

		funcs["extendJoin" + inputCount] = function (args) {
			const prefix = "ARG";
			let string = "";
			for (let i = 0; prefix + i in args; i++) {
				string += Scratch.Cast.toString(args[prefix + i]);
			}
			return string;
		}
		funcs["extendSum" + inputCount] = function (args) {
			const prefix = "ARG";
			let number = 0;
			for (let i = 0; prefix + i in args; i++) {
				number += Scratch.Cast.toNumber(args[prefix + i]);
			}
			return number;
		}
		funcs["extendProduct" + inputCount] = function (args) {
			const prefix = "ARG";
			let number = 1;
			for (let i = 0; prefix + i in args; i++) {
				number *= Scratch.Cast.toNumber(args[prefix + i]);
			}
			return number;
		}
		funcs["extendMinus" + inputCount] = function (args) {
			const prefix = "ARG";
			let number = Scratch.Cast.toNumber(args[prefix + 0]);
			for (let i = 1; prefix + i in args; i++) {
				number -= Scratch.Cast.toNumber(args[prefix + i]);
			}
			return number;
		}
		funcs["extendDivide" + inputCount] = function (args) {
			const prefix = "ARG";
			let number = Scratch.Cast.toNumber(args[prefix + 0]);
			for (let i = 1; prefix + i in args; i++) {
				number /= Scratch.Cast.toNumber(args[prefix + i]);
			}
			return number;
		}

		funcs["extendArray" + inputCount] = function (args, util) {
			const prefix = "ARG";
			const array = [];

			if (util.thread.isCompiled) {
				args = this.fixCompilerArgs(args, util, prefix);
			}

			for (let i = 0; prefix + i in args; i++) {
				array.push(args[prefix + i]);
			}

			try {
				return JSON.stringify(array);
			} catch (e) {
				return "[]";
			}
		}
		funcs["joinWith" + inputCount] = function (args, util) {
			const prefix = "ARG";
			const joiner = Scratch.Cast.toString(args[prefix + inputCount]);
			if (inputCount <= 0) return "";

			let string = "";
			for (let i = 0; i < inputCount; i++) {
				string += Scratch.Cast.toString(args[prefix + i]);
				if (i + 1 < inputCount) {
					string += joiner;
				}
			}
			return string;
		}
		funcs["extendAnd" + inputCount] = function (args, util) {
			if (inputCount <= 0) return false;

			const prefix = "ARG";
			for (let i = 0; i < inputCount + 1; i++) {
				if (!Scratch.Cast.toBoolean(args[prefix + i])) return false;
			}
			return true;
		}
		funcs["extendOr" + inputCount] = function (args, util) {
			if (inputCount <= 0) return false;

			const prefix = "ARG";
			for (let i = 0; i < inputCount + 1; i++) {
				if (Scratch.Cast.toBoolean(args[prefix + i])) return true;
			}
			return false;
		}
		funcs["extendLess" + inputCount] = function (args, util) {
			const prefix = "ARG";
			for (let i = 1; prefix + i in args; i++) {
				const a = args[prefix + (i - 1)];
				const b = args[prefix + i];
				if (Scratch.Cast.compare(a, b) >= 0) return false;
			}
			return true;
		}
		funcs["extendEqual" + inputCount] = function (args, util) {
			const prefix = "ARG";
			for (let i = 1; prefix + i in args; i++) {
				const a = args[prefix + (i - 1)];
				const b = args[prefix + i];
				if (Scratch.Cast.compare(a, b) !== 0) return false;
			}
			return true;
		}
		funcs["extendGreater" + inputCount] = function (args, util) {
			const prefix = "ARG";
			for (let i = 1; prefix + i in args; i++) {
				const a = args[prefix + (i - 1)];
				const b = args[prefix + i];
				if (Scratch.Cast.compare(a, b) <= 0) return false;
			}
			return true;
		}

		funcs["runBranch" + inputCount] = function (args, util) {
			util.startBranch(Scratch.Cast.toNumber(args.BRANCH));
		}

		funcs["extendIf" + inputCount] = function (args, util) {
			const prefix = "CONDITION";
			for (let i = 0; i < inputCount + 1; i++) {
				if (args[prefix + i]) {
					util.startBranch(i + 1);
					return;
				}
			}
		}

		funcs["extendIfElse" + inputCount] = function (args, util) {
			const prefix = "CONDITION";
			for (let i = 0; i < inputCount + 1; i++) {
				if (args[prefix + i]) {
					util.startBranch(i + 1);
					return;
				}
			}
			util.startBranch(inputCount + 2);
		}

		funcs["extendSwitch" + inputCount] = function (args, util) {
			const value = args.VALUE;
			const prefix = "CASE_VALUE";
			for (let i = 0; i < inputCount; i++) {
				if (Scratch.Cast.compare(value, args[prefix + i]) === 0) {
					util.startBranch(i + 1);
					return;
				}
			}
			util.startBranch(inputCount + 1);
		}
	}

	class ExtendableBlocks2 {
		constructor() {
			for (const key of Object.keys(funcs)) {
				this[key] = funcs[key].bind(this);
			}
		}

		getInfo() {
			return {
				id: exId,
				name: "Extendable Blocks 2",
				menuIconURI: menuIconURI,
				blocks: [
					// i was gonna have buttons to add/remove inputs in the palette but having them all at once makes it funnier
					/*
					{
						blockType: Scratch.BlockType.LABEL,
						text: "Number of inputs: " + paletteInputs,
					},
					{
						blockType: Scratch.BlockType.BUTTON,
						func: "removeInput",
						text: paletteInputs === MIN_INPUTS ? "(Remove Input)" : "Remove Input"
					},
					{
						blockType: Scratch.BlockType.BUTTON,
						func: "addInput",
						text: paletteInputs === MAX_INPUTS ? "(Add Input)" : "Add Input"
					},
					"---",
					*/
					...blocks.map((o) => {
						if (typeof o !== "object" || !("extendable2Inputs" in o)) return o;
						return {
							...o,
							//hideFromPalette: o.hideFromPalette || o.extendable2Inputs !== paletteInputs
						};
					})
				],
			};
		}

		removeInput() {
			if (paletteInputs === MIN_INPUTS) return;
			paletteInputs--;
			vm.extensionManager.refreshBlocks(exId);
		}
		addInput() {
			if (paletteInputs === MAX_INPUTS) return;
			paletteInputs++;
			vm.extensionManager.refreshBlocks(exId);
		}

		// The compiler does some weird stuff with arguments
		// (this is not the case in the interpreter, so
		// this *is* a parity issue)
		fixCompilerArgs(args, util, prefix = "") {
			// Copy the object just in case
			args = Object.assign({}, args);

			const blocks = util.target.blocks;
			// In the compiler, thread.peekStack works for reporter blocks
			const block = blocks.getBlock(util.thread.peekStack());
			if (!block) return args;
			for (const key in args) {
				if (key.toString().startsWith(prefix)) {
					const input = block.inputs[key];
					if (!input) continue;
					const inputBlock = blocks.getBlock(input.block);
					const shadowBlock = blocks.getBlock(input.shadow);
					if (
						shadowBlock?.opcode === "text" &&
						(!inputBlock || inputBlock?.opcode === "text")
					) {
						args[key] = Scratch.Cast.toString(args[key]);
					}
				}
			}
			return args;
		}
	}

	// @ts-ignore
	Scratch.extensions.register(new ExtendableBlocks2());
})(Scratch);
