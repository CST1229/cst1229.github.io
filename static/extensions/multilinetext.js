(function(Scratch) {
	if (!Scratch.extensions.unsandboxed) {
		throw new Error("This extension must be run unsandboxed");
	}
	
	const extId = "cst1229multiline";
	class MultilineTextInput {
		getInfo() {
			return {
				id: extId,
				name: "Mutliline Text Input",
				color1: "#a63fa6",
				blocks: [
					{
						blockType: Scratch.BlockType.REPORTER,
						opcode: "input",
						text: "[TEXT]",
						arguments: {
							TEXT: {
								type: Scratch.BlockType.TEXT,
								defaultValue: "",
								[extId + "_isMultilineField"]: true,
							}
						},
						[extId + "_isSquare"]: true,
						extensions: ["colours_textfield"],
						hideFromPalette: true,
					},
					{
						blockType: Scratch.BlockType.REPORTER,
						opcode: "returnMultiline",
						text: "multiline [TEXT]",
						arguments: {
							TEXT: {
								type: null,
							}
						},
						[extId + "_isSquare"]: true,
						hideFromPalette: true,
					},
					{
						blockType: Scratch.BlockType.XML,
						xml: `
						<block type="${extId}_returnMultiline">
							<value name="TEXT">
								<shadow id="text" type="${extId}_input">
									<field name="TEXT">text
with
new
lines</field>
								</shadow>
							</value>
						</block>
						`,
					}
				],
			};
		}
		
		input({TEXT}) {return TEXT;}
		returnMultiline({TEXT}) {return TEXT;}
	}
	
	const runtime = Scratch.vm.runtime;
	const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
	runtime._convertBlockForScratchBlocks = function(blockInfo, categoryInfo) {
		const res = cbfsb(blockInfo, categoryInfo);
		for (const [key, value] of Object.entries(blockInfo.arguments || {})) {
			if (value && value[extId + "_isMultilineField"]) {
				const arg = (res.json.args0 || []).find(arg => arg.name === key);
				if (arg) arg.type = "field_" + extId + "_multilinetext";
			}
		}
		if (blockInfo[extId + "_isSquare"]) {
			res.json.outputShape = 3; // square
		}
		return res;
	}
	
	if (Scratch?.gui?.getBlockly) Scratch.gui.getBlockly().then(SB => {
		// a lot of this is copied from https://github.com/TurboWarp/scratch-blocks/
		const isGecko = navigator.userAgent.includes("Gecko/");
		const isWebKit = navigator.userAgent.includes("AppleWebKit/");
		class FieldMultilineText extends ScratchBlocks.FieldTextInput {
			constructor(text) {
				super(text);
			}
			className_ = "blocklyText cstMultilineTextInput"
			
			static ZWS = "\u200B";
			getDisplayText_() {
				var text = this.text_;
				if (!text) {
					// Prevent the field from disappearing if empty.
					return SB.Field.NBSP;
				}
				return FieldMultilineText.ZWS + text + FieldMultilineText.ZWS;
			}
			
			init() {
				const initted = !!this.fieldGroup_;
				super.init();
				if (!initted && this.textElement_) {
					const el = this.textElement_;
					el.style.whiteSpace = "pre";
					el.style.lineHeight = "1lh";
					el.setAttribute("text-anchor", "left");
					el.removeAttribute("dominantBaseline");
					this.repositionText(el);
				}
			}
			render_() {
				if (this.visible_ && this.textElement_) {
					// Replace the text.
					this.textElement_.textContent = this.getDisplayText_();
					this.updateWidth();
				}
				// Update any drawn box to the correct width and height.
				if (this.box_) {
					this.box_.setAttribute('width', this.size_.width);
					this.box_.setAttribute('height', this.size_.height);
				}
			}
			repositionText(el) {
				el.setAttribute("x", SB.BlockSvg.EDITABLE_FIELD_PADDING / 2);
				el.setAttribute("y", SB.BlockSvg.EDITABLE_FIELD_PADDING + SB.BlockSvg.BOX_FIELD_PADDING);
			}
			updateWidth() {
				let width = FieldMultilineText.getCachedSize(this.textElement_, "width");
				let height = FieldMultilineText.getCachedSize(this.textElement_, "height");
				if (this.EDITABLE) {
					height += SB.BlockSvg.EDITABLE_FIELD_PADDING;
					width += SB.BlockSvg.EDITABLE_FIELD_PADDING;
				}
				if (this.box_) {
					width += 2 * SB.BlockSvg.BOX_FIELD_PADDING;
					height += 2 * SB.BlockSvg.BOX_FIELD_PADDING;
					height += SB.BlockSvg.EDITABLE_FIELD_PADDING;
				}
				this.size_.width = width;
				this.size_.height = height;
			}
			
			showEditor_(opt_quietInput, opt_readOnly, opt_withArrow, opt_arrowCallback) {
				const createDom = (tagName, className) => Object.assign(document.createElement(tagName), {className});
				this.workspace_ = this.sourceBlock_.workspace;
				const quietInput = opt_quietInput || false;
				const readOnly = opt_readOnly || false;
				SB.WidgetDiv.show(this, this.sourceBlock_.RTL,
						this.widgetDispose_(), this.widgetDisposeAnimationFinished_(),
						SB.FieldTextInput.ANIMATION_TIME);
				const div = SB.WidgetDiv.DIV;
				// Apply text-input-specific fixed CSS
				div.className += ' fieldTextInput';
				// Create the input.
				const htmlInput = createDom("textarea", 'blocklyHtmlInput');
				htmlInput.setAttribute('spellcheck', this.spellcheck_);
				if (readOnly) {
					htmlInput.setAttribute('readonly', 'true');
				}
				/** @type {!HTMLInputElement} */
				SB.FieldTextInput.htmlInput_ = htmlInput;
				div.appendChild(htmlInput);

				htmlInput.value = htmlInput.defaultValue = this.text_;
				htmlInput.oldValue_ = null;
				htmlInput.style.resize = "none";
				
				htmlInput.style.textAlign = "left";
				htmlInput.style.paddingLeft = (SB.BlockSvg.EDITABLE_FIELD_PADDING / 2 + 8) + "px";
				htmlInput.style.paddingTop = (SB.BlockSvg.BOX_FIELD_PADDING / 2 + SB.BlockSvg.EDITABLE_FIELD_PADDING / 2) + "px";
				htmlInput.style.overflow = "hidden";
				
				this.validate_();
				this.resizeEditor_();
				if (!quietInput) {
					htmlInput.focus();
					htmlInput.select();
					// For iOS only
					htmlInput.setSelectionRange(0, 99999);
				}

				this.bindEvents_(htmlInput, quietInput || readOnly);

				// Add animation transition properties
				const transitionProperties = 'box-shadow ' + SB.FieldTextInput.ANIMATION_TIME + 's';
				if (SB.BlockSvg.FIELD_TEXTINPUT_ANIMATE_POSITIONING) {
					div.style.transition += ',padding ' + SB.FieldTextInput.ANIMATION_TIME + 's,' +
						'width ' + SB.FieldTextInput.ANIMATION_TIME + 's,' +
						'height ' + SB.FieldTextInput.ANIMATION_TIME + 's,' +
						'margin-left ' + SB.FieldTextInput.ANIMATION_TIME + 's';
				}
				div.style.transition = transitionProperties;
				htmlInput.style.transition = 'font-size ' + SB.FieldTextInput.ANIMATION_TIME + 's';
				// The animated properties themselves
				htmlInput.style.fontSize = SB.BlockSvg.FIELD_TEXTINPUT_FONTSIZE_FINAL + 'pt';
				div.style.boxShadow = '0px 0px 0px 4px ' + SB.Colours.fieldShadow;
			}
			resizeEditor_() {
				const scale = this.sourceBlock_.workspace.scale;
				const div = SB.WidgetDiv.DIV;

				let width, height;
				this.updateWidth();
				this.sourceBlock_.render();
				if (this.sourceBlock_.isShadow()) {
					const hw = this.sourceBlock_.getHeightWidth();
					width = hw.width * scale;
					height = hw.height * scale;
				} else {
					width = this.size_.width * scale;
					height = this.size_.height * scale;
				}
				
				// The width must be at least FIELD_WIDTH and at most FIELD_WIDTH_MAX_EDIT
				width = Math.max(width, SB.BlockSvg.FIELD_WIDTH_MIN_EDIT * scale);
				width = Math.min(width, SB.BlockSvg.FIELD_WIDTH_MAX_EDIT * scale);
				
				height = Math.max(height, SB.BlockSvg.FIELD_HEIGHT_MAX_EDIT * scale);
				// Add 1px to width and height to account for border (pre-scale)
				div.style.width = (width / scale + 1) + 'px';
				div.style.height = (height / scale + 1) + 'px';
				div.style.transform = 'scale(' + scale + ')';

				// Add 0.5px to account for slight difference between SVG and CSS border
				const borderRadius = this.getBorderRadius() + 0.5;
				div.style.borderRadius = borderRadius + 'px';
				SB.FieldTextInput.htmlInput_.style.borderRadius = borderRadius + 'px';
				// Pull stroke colour from the existing shadow block
				const strokeColour = this.sourceBlock_.getColourTertiary();
				div.style.borderColor = strokeColour;

				const xy = this.getAbsoluteXY_();
				// Account for border width, post-scale
				xy.x -= scale / 2;
				xy.y -= scale / 2;
				// In RTL mode block fields and LTR input fields the left edge moves,
				// whereas the right edge is fixed.	Reposition the editor.
				if (this.sourceBlock_.RTL) {
					xy.x += width;
					xy.x -= div.offsetWidth * scale;
					xy.x += 1 * scale;
				}
				// Shift by a few pixels to line up exactly.
				xy.y += 1 * scale;
				if (isGecko && SB.WidgetDiv.DIV.style.top) {
					// Firefox mis-reports the location of the border by a pixel
					// once the WidgetDiv is moved into position.
					xy.x += 2 * scale;
					xy.y += 1 * scale;
				}
				if (isWebKit) {
					xy.y -= 1 * scale;
				}
				// Finally, set the actual style
				div.style.left = xy.x + 'px';
				div.style.top = xy.y + 'px';
			}
			onHtmlInputKeyDown_(e) {
				const htmlInput = SB.FieldTextInput.htmlInput_;
				const tabKey = 9, enterKey = 13, escKey = 27;
				if (e.keyCode == enterKey && e.ctrlKey) {
					SB.WidgetDiv.hide();
					SB.DropDownDiv.hideWithoutAnimation();
				} else if (e.keyCode == escKey) {
					htmlInput.value = htmlInput.defaultValue;
					SB.WidgetDiv.hide();
					SB.DropDownDiv.hideWithoutAnimation();
				} else if (e.keyCode == tabKey) {
					SB.WidgetDiv.hide();
					SB.DropDownDiv.hideWithoutAnimation();
					this.sourceBlock_.tab(this, !e.shiftKey);
					e.preventDefault();
				}
			};
			
			static fromJson(options) {
				const text = SB.utils.replaceMessageReferences(options["text"]) || '';
				return new FieldMultilineText(text);
			}
			
			static getCachedSize(textElement, sizeKey) {
				const key = textElement.textContent + "\n" + textElement.className.baseVal + "\n" + "cst multiline " + sizeKey;
				let height;
				if (SB.Field.cacheWidths_) {
					height = SB.Field.cacheWidths_[key];
					if (height) {
						return height;
					}
				}
				try {
					height = textElement.getBBox()[sizeKey];
				} catch (e) {
					return 20;
				}
				if (SB.Field.cacheWidths_) {
					SB.Field.cacheWidths_[key] = height;
				}
				return height;
			};
		}
		SB.Field.register("field_" + extId + "_multilinetext", FieldMultilineText);
	});
	
	Scratch.extensions.register(new MultilineTextInput());
})(Scratch);