// Based off of the Fetch extension on extensions.turbowarp.org
(function (Scratch) {
	"use strict";

	class FetchDataURL {
		getInfo() {
			return {
				id: "cst1229fetchdataurl",
				name: "Fetch Data URL",
				blocks: [
					{
						opcode: "get",
						blockType: Scratch.BlockType.REPORTER,
						text: "GET [URL] as data URL",
						arguments: {
							URL: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "https://extensions.turbowarp.org/hello.txt",
							},
						},
					},
				]
			};
		}

		get(args) {
			return new Promise(async (res) => {
				let resp;
				try {
					resp = await Scratch.fetch(args.URL);
				} catch(e) {
					return res("");
				}
				
				const reader = new FileReader();
				reader.addEventListener("load", () => {
					res(reader.result);
				}, false);
				reader.addEventListener("error", () => {
					res("");
				}, false);
				reader.readAsDataURL(await resp.blob());
			});
		}
	}

	Scratch.extensions.register(new FetchDataURL());
})(Scratch);