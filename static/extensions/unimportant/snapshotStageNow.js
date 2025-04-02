(function (Scratch) {
	"use strict";
  
	const renderer = Scratch.vm.runtime.renderer;
  
	class SnapshotStageNow {
	  getInfo() {
		return {
		  id: "cstInstantSnapshot",
		  name: "Snapshot Stage Now",
		  color1: "#9966FF",
		  color2: "#855CD6",
		  color3: "#774DCB",
		  blocks: [
			{
			  opcode: "snapshotStageNow",
			  blockType: Scratch.BlockType.REPORTER,
			  text: Scratch.translate("snapshot stage now"),
			  disableMonitor: true,
			  extensions: ["colours_looks"],
			},
		  ],
		};
	  }
  
	  snapshotStageNow() {
		let dataUrl;
		const oldCallbacks = renderer._snapshotCallbacks;

		renderer.dirty = true;
		renderer._snapshotCallbacks = [(url) => {dataUrl = url}];
		renderer.draw();
		renderer._snapshotCallbacks = oldCallbacks;
		renderer.dirty = true;
		return dataUrl || "";
	  }
	}
	Scratch.extensions.register(new SnapshotStageNow());
  })(Scratch);
  