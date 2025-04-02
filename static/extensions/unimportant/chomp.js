(function(Scratch) {
	"use strict";
	
	if (!Scratch.extensions.unsandboxed) {
		alert("you have to unsandbox it");
		return;
	}
	
	const exId = "cst1229chomp";
	
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
	
	let chomped = false;
	
	class ChompExt {
		getInfo() {
			return {
				id: exId,
				name: "Chomp",
				color1: "#bfbfbf",
				color2: "#b2b2b2",
				color3: "#909090",
				blocks: [
					{
						opcode: "chomp",
						blockType: Scratch.BlockType.COMMAND,
						text: "enable chompinate mode",
						arguments: {},
					},
				],
			};
		}
		
		chomp() {
			if (!window.ScratchBlocks) {
				return;
			}
			
			if (chomped) return;
			chomped = true;
			
			patch(ScratchBlocks.InsertionMarkerManager.prototype, {
				/*createMarkerBlock_(og, sourceBlock) {
					ScratchBlocks.Events.disable();
					try {
						var result = ScratchBlocks.Xml.domToBlock(ScratchBlocks.Xml.blockToDom(sourceBlock), sourceBlock.workspace);
						ScratchBlocks.scratchBlocksUtils.changeObscuredShadowIds(result);
						result.setInsertionMarker(true, sourceBlock.width);
						if (sourceBlock.mutationToDom) {
							var oldMutationDom = sourceBlock.mutationToDom();
							if (oldMutationDom) {
								result.domToMutation(oldMutationDom);
							}
						}
						result.initSvg();
					} finally {
						ScratchBlocks.Events.enable();
					}
					return result;
				},*/
				// rerender dragged block when updating the insertion marker
				connectMarker_(og) {
					og();
					if (this.firstMarker_) {
						var block = this?.workspace_?.currentGesture_?.blockDragger_?.draggingBlock_;
						if (block) block.render(false);
					}
				},
				disconnectMarker_(og) {
					og();
					if (this.firstMarker_) {
						var block = this?.workspace_?.currentGesture_?.blockDragger_?.draggingBlock_;
						if (block) block.render(false, true);
					}
				},
			});
			
			patch(ScratchBlocks.BlockSvg.prototype, {
				render(og, opt_bubble, opt_noconnection) {
					ScratchBlocks.Field.startCache();
					this.rendered = true;

					var cursorX = ScratchBlocks.BlockSvg.SEP_SPACE_X;
					if (this.RTL) {
						cursorX = -cursorX;
					}
					// Move the icons into position.
					var icons = this.getIcons();
					var scratchCommentIcon = null;
					for (var i = 0; i < icons.length; i++) {
						if (icons[i] instanceof ScratchBlocks.ScratchBlockComment) {
							// Don't render scratch block comment icon until
							// after the inputs
							scratchCommentIcon = icons[i];
						} else {
							cursorX = icons[i].renderIcon(cursorX);
						}
					}
					cursorX += this.RTL ?
							ScratchBlocks.BlockSvg.SEP_SPACE_X : -ScratchBlocks.BlockSvg.SEP_SPACE_X;
					// If there are no icons, cursorX will be 0, otherwise it will be the
					// width that the first label needs to move over by.

					// If this is an extension reporter block, add a horizontal offset.
					if (this.isScratchExtension && this.outputConnection) {
						cursorX += this.RTL ?
							-ScratchBlocks.BlockSvg.GRID_UNIT : ScratchBlocks.BlockSvg.GRID_UNIT;
					}
					
					// CHANGED CODE START
					var computeBlock = this;
					if (this?.workspace?.currentGesture_?.blockDragger_?.draggedConnectionManager_) {
						var dragger = this.workspace.currentGesture_.blockDragger_;
						var manager = dragger.draggedConnectionManager_;
						if (manager.markerConnection_ && manager.firstMarker_ && dragger.draggingBlock_ == this && dragger.draggingBlock_.type == manager.firstMarker_.type) {
							computeBlock = manager.firstMarker_;
						}
					}
					var inputRows = this.renderCompute_(cursorX);
					// change the height of substacks
					// (if we set inputRows to computeBlock.renderCompute_,
					// the references to the inputs would be wrong
					// so they just won't update properly)
					if (computeBlock !== this) {
						var _inputRows = computeBlock.renderCompute_(cursorX);
						for (let i = 0; i < inputRows.length; i++) {
							const row = inputRows[i];
							row.height = _inputRows[i].height;
						}
					}
					this.renderDraw_(cursorX, inputRows);
					// weirdness happens if we move connections on the dragged block while chomping
					if (computeBlock === this && opt_noconnection !== true) this.renderMoveConnections_();
					// CHANGED CODE END

					this.renderClassify_();

					// Position the Scratch Block Comment Icon at the end of the block
					if (scratchCommentIcon) {
						var iconX = this.RTL ? -inputRows.rightEdge : inputRows.rightEdge;
						var inputMarginY = inputRows[0].height / 2;
						scratchCommentIcon.renderIcon(iconX, inputMarginY);
					}

					if (opt_bubble !== false) {
						// Render all blocks above this one (propagate a reflow).
						var parentBlock = this.getParent();
						if (parentBlock) {
							parentBlock.render(true);
						} else {
							// Top-most block.	Fire an event to allow scrollbars to resize.
							ScratchBlocks.resizeSvgContents(this.workspace);
						}
					}
					ScratchBlocks.Field.stopCache();

					this.updateIntersectionObserver();
				}
			});
		}
	}
	
	Scratch.extensions.register(new ChompExt());
})(Scratch);