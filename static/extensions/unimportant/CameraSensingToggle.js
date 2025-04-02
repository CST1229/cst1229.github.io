(function(Scratch) {
	class PrivateSkinAccess {
		getInfo() {
			return {
				name: "Camera Sensing Toggle",
				id: "cstcamerasensingtoggle",
				blocks: [{
					opcode: "toggle",
					blockType: Scratch.BlockType.COMMAND,
					text: "[TOGGLE] camera sensing (unsafe!)",
					arguments: {
						TOGGLE: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "enable",
							menu: "toggleMenu"
						}
					}
				}],
				menus: {
					toggleMenu: {
						acceptReporters: true,
						items: ["disable", "enable"]
					}
				}
			};
		}
		
		toggle({TOGGLE}) {
			TOGGLE = (TOGGLE === "enable" || TOGGLE == true || TOGGLE == 1) ? true : false;
			vm.runtime.setEnforcePrivacy(!TOGGLE);
		}
	}

	Scratch.extensions.register(new PrivateSkinAccess());
})(Scratch);