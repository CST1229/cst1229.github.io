// basically just the video recorder addon but in an extension and its my fork that has a resolution option
// (it's probably not getting merged into the extension any time soon, let alone turbowarp)
// licensed under GPLv3 i guess, because it uses turbowarp code

(function(Scratch) {
	"use strict";

	const exId = "cst1229highresmediarecorder";
	const css = `
	.cstmediaRecorderPopup {
		box-sizing: border-box;
		width: 600px;
		max-height: min(800px, 80vh);
		max-width: 85%;
		margin-top: 12vh;
		overflow-y: auto;
		margin-left: auto;
		margin-right: auto;
	}

	.cstmediarecorderhighresmodalcontent {
		background-color: var(--ui-modal-background);
		color: var(--ui-modal-foreground);
	}

	.cstmediaRecorderPopup .mediaRecorderPopupContent {
		padding: 1.5rem 2.25rem;
	}

	.cstmediaRecorderPopup p.recordOptionDescription {
		margin-bottom: 1.5rem;
	}

	.cstmediaRecorderPopup .recordOptionNote {
		border: 1px solid var(--error-primary, #855cd6);
		background-color: var(--error-transparent, #855cd626);
		padding: 0.5rem;
		border-radius: 0.25rem;
	}

	.cstmediaRecorderPopup p {
		font-size: 1rem;
		margin: 0.5rem auto;
	}

	.cstmediaRecorderPopup p :not(:first-child) {
		margin-left: 1rem;
	}

	.cstmediaRecorderPopup[dir="rtl"] p :not(:first-child) {
		margin-left: 0;
		margin-right: 1rem;
	}

	.cstmediaRecorderPopup p.mediaRecorderPopupOption {
		display: flex;
		align-items: center;
	}

	.cstmediaRecorderPopup .mediaRecorderPopupOption input[type="checkbox"] {
		height: 1.5rem;
		margin-right: -0.25rem;
		accent-color: var(--editorDarkMode-primary, #855cd6);
	}

	.cstmediaRecorderPopup #recordOptionSecondsInput,
	.cstmediaRecorderPopup #recordOptionDelayInput,
	.cstmediaRecorderPopup #recordOptionScaleInputW,
	.cstmediaRecorderPopup #recordOptionScaleInputH {
		width: 5rem;
		margin-bottom: 0.25rem;
	}

	.cstmediaRecorderPopup #recordOptionScaleInputW,
	.cstmediaRecorderPopup #recordOptionScaleInputH {
		width: 6rem;
	}

	.cstmediaRecorderPopup .mediaRecorderSeparator {
		height: 1.25rem;
	}

	.cstmediaRecorderPopup .mediaRecorderPopupButtons {
		margin-top: 1.5rem;
	}

	.cstmediaRecorderPopup .mediaRecorderPopupButtons button {
		margin-left: 0.5rem;
	}

	/* warning on the regular popup */
	.mediaRecorderPopup .mediaRecorderPopupContent::before {
		content: 'This is the non-high resolution recorder popup! Please use the "Record" button in the "High Resolution Video Recorder" category of the block palette.';
		font-weight: bold;
		line-height: 1.5em;
		border: 1px solid var(--error-primary, #855cd6);
		background-color: var(--error-transparent, #855cd626);
		padding: 0.5rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		display: block;
	}
	`;
	const styleEl = document.createElement("style");
	styleEl.textContent = css;
	document.head.appendChild(styleEl);

	const strings = {
		"mediarecorder/record": "Record",
		"mediarecorder/stop": "Stop Recording",
		"mediarecorder/option-title": "Record Options",
		"mediarecorder/record-duration": "End recording after:",
		"mediarecorder/start-delay": "Start recording after:",
		"mediarecorder/video-resolution": "Video resolution:",
		"mediarecorder/seconds": "seconds",
		"mediarecorder/starting-in": "Starting in {secs}...",
		"mediarecorder/record-audio": "Record project audio",
		"mediarecorder/record-mic": "Record microphone audio",
		"mediarecorder/record-audio-description": "This does not include Text-to-Speech.",
		"mediarecorder/record-after-flag": "Wait until green flag is clicked",
		"mediarecorder/record-until-stop": "End recording when project is stopped",
		"mediarecorder/record-description": "Record a video of the stage and save it to your computer as a {extension} file after the recording is finished.",
		"mediarecorder/record-note": "Note: Variable, list, and reporter monitors, as well as ask prompts will not be visible in the recording.",
		"mediarecorder/start": "Start",
		"mediarecorder/cancel": "Cancel",
		"mediarecorder/added-by": "Added by an extension",
		"mediarecorder/click-flag": "Waiting...",
		"mediarecorder/click-flag-description": "Click the green flag to start recording. Click here to abort the recording.",
		"mediarecorder/record-until-stop-disabled": "You need to enable \"{afterFlagOption}\" to use this option."
	};
	const msg = (msgid, replace = {}) => {
		let text = strings["mediarecorder/" + msgid] || msgid;
		for (const key of Object.keys(replace)) {
			text = text.replaceAll(`{${key}}`, String(replace[key]));
		}
		return text;
	};
	let recordText = msg("record");
	const closeIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==";

	// pasted scratchClass implementation from turbowarp
	let _scratchClassNames = null;
	const getScratchClassNames = () => {
		if (_scratchClassNames) {
			return _scratchClassNames;
		}
		const cssRules = Array.from(document.styleSheets)
			// Ignore some scratch-paint stylesheets
			.filter(styleSheet => (
				!(
					styleSheet.ownerNode.textContent.startsWith(
						'/* DO NOT EDIT\n@todo This file is copied from GUI and should be pulled out into a shared library.'
					) &&
					(
						styleSheet.ownerNode.textContent.includes('input_input-form') ||
						styleSheet.ownerNode.textContent.includes('label_input-group_')
					)
				)
			))
			.map(e => {
				try {
					return [...e.cssRules];
				} catch (_e) {
					return [];
				}
			})
			.flat();
		const classes = cssRules
			.map(e => e.selectorText)
			.filter(e => e)
			.map(e => e.match(/(([\w-]+?)_([\w-]+)_([\w\d-]+))/g))
			.filter(e => e)
			.flat();
		_scratchClassNames = [...new Set(classes)];
		const observer = new MutationObserver(mutationList => {
			for (const mutation of mutationList) {
				for (const node of mutation.addedNodes) {
					if (node.tagName === 'STYLE') {
						_scratchClassNames = null;
						observer.disconnect();
						return;
					}
				}
			}
		});
		observer.observe(document.head, {
			childList: true
		});
		return _scratchClassNames;
	};


	// similarly pasted createModal implementation from turbowarp
	const createEditorModal = (tab, title, {isOpen = false} = {}) => {
		const container = Object.assign(document.createElement('div'), {
			className: tab.scratchClass('modal_modal-overlay'),
			dir: tab.direction
		});
		container.style.display = isOpen ? '' : 'none';
		document.body.appendChild(container);
		const modal = Object.assign(document.createElement('div'), {
			className: tab.scratchClass('modal_modal-content')
		});
		modal.addEventListener('click', e => e.stopPropagation());
		container.appendChild(modal);
		const header = Object.assign(document.createElement('div'), {
			className: tab.scratchClass('modal_header')
		});
		modal.appendChild(header);
		header.appendChild(
			Object.assign(document.createElement('div'), {
				className: tab.scratchClass('modal_header-item', 'modal_header-item-title'),
				innerText: title
			})
		);
		const closeContainer = Object.assign(document.createElement('div'), {
			className: tab.scratchClass('modal_header-item', 'modal_header-item-close')
		});
		header.appendChild(closeContainer);
		const closeButton = Object.assign(document.createElement('div'), {
			className: tab.scratchClass('close-button_close-button', 'close-button_large')
		});
		closeContainer.appendChild(closeButton);
		closeButton.appendChild(
			Object.assign(document.createElement('img'), {
				className: tab.scratchClass('close-button_close-icon'),
				src: closeIcon
			})
		);
		const content = Object.assign(document.createElement('div'), {
			className: "cstmediarecorderhighresmodalcontent"
		});
		modal.appendChild(content);
		return {
			container: modal,
			content,
			backdrop: container,
			closeButton,
			open: () => {
				container.style.display = '';
			},
			close: () => {
				container.style.display = 'none';
			},
			remove: container.remove.bind(container)
		};
	};

	const downloadBlob = (filename, blob) => {
		const url = URL.createObjectURL(blob);
		const a = Object.assign(document.createElement("a"), {
			href: url,
			download: filename,
			type: blob.type,
		});
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	};

	const addon = {
		tab: {
			traps: {
				vm: Scratch.vm,
			},
			redux: {
				get state() {
					return window.ReduxStore.getState();
				}
			},
			get direction () {
				return addon.tab.redux.state.locales.isRtl ? 'rtl' : 'ltr';
			},
			scratchClass(...args) {
				const scratchClasses = getScratchClassNames();
				const classes = [];
				for (const arg of args) {
					if (typeof arg === 'string') {
						for (const scratchClass of scratchClasses) {
							if (scratchClass.startsWith(`${arg}_`) && scratchClass.length === arg.length + 6) {
								classes.push(scratchClass);
								break;
							}
						}
					}
				}
				const options = args[args.length - 1];
				if (typeof options === 'object') {
					const others = Array.isArray(options.others) ? options.others : [options.others];
					for (const className of others) {
						classes.push(className);
					}
				}
				return classes.join(' ');
			},
			createModal (title, {isOpen = false} = {}) {
				return createEditorModal(addon.tab, title, {isOpen});
			},
		},
	};



	const MAX_RECORD_TIME = 600; // seconds
	const MIN_SCALE = 0.0001;
	const SCALE_LIMIT = 20;
	const DEFAULT_SETTINGS = {
		secs: 30,
		delay: 0,
		audioEnabled: true,
		micEnabled: false,
		waitUntilFlag: true,
		useStopSign: true,
		stageScale: 1,
	};
	const LOCALSTORAGE_ENTRY = "sa-record-options";

	const vm = addon.tab.traps.vm;

	let isRecording = false;
	let isWaitingForFlag = false;
	let waitingForFlagFunc = null;
	let abortController = null;
	let stopSignFunc = null;
	let recordBuffer = [];
	let stageScale = 1;
	let recorder;
	let timeout;

	let recordElem = {
		get textContent() {
			return recordText;
		},
		set textContent(value) {
			if (recordText != value) {
				recordText = value;
				vm.extensionManager.refreshBlocks(exId);
			}
		},
		title: "",
	};

	const getStoredOptions = () => {
		try {
			// If any new properties get added to DEFAULT_SETTINGS,
			// this makes sure that they are individually applied to the saved settings too
			return Object.assign(
				structuredClone(DEFAULT_SETTINGS),
				JSON.parse(localStorage.getItem(LOCALSTORAGE_ENTRY)) ?? DEFAULT_SETTINGS
			);
		} catch {
			return DEFAULT_SETTINGS;
		}
	};

	const mimeType = [
		// Prefer mp4 format over webm (Chrome and Safari)
		"video/mp4; codecs=mp4a.40.2",
		// Chrome 125 and below and Firefox only support encoding as webm
		// VP9 is preferred as its playback is better supported across platforms
		"video/webm; codecs=vp9",
		// Firefox only supports encoding VP8
		"video/webm",
	].find((i) => MediaRecorder.isTypeSupported(i));
	const fileExtension = mimeType.split(";")[0].split("/")[1];

	function getStageWidth() {
		// TurboWarp compatibility
		return vm.runtime?.stageWidth ?? vm.runtime.constructor.STAGE_WIDTH;
	}
	function getStageHeight() {
		// TurboWarp compatibility
		return vm.runtime?.stageHeight ?? vm.runtime.constructor.STAGE_HEIGHT;
	}

	// When recording, resize stage canvas with the resolution scale
	const oldResize = vm.runtime.renderer.constructor.prototype.resize;
	let actualWidth = vm.runtime.renderer.gl?.canvas?.width ?? getStageWidth();
	let actualHeight = vm.runtime.renderer.gl?.canvas?.height ?? getStageHeight();
	vm.runtime.renderer.constructor.prototype.resize = function (pixelsWide, pixelsTall) {
		actualWidth = pixelsWide;
		actualHeight = pixelsTall;
		if (!isRecording) return oldResize.call(this, pixelsWide, pixelsTall);
		const scale = Math.max(MIN_SCALE, stageScale);
		return oldResize.call(this, Math.ceil(getStageWidth() * scale), Math.ceil(getStageHeight() * scale));
	};
	function forceRendererResize() {
		vm.runtime.renderer.resize(actualWidth, actualHeight);
	}

	// Options modal
	const getOptions = () => {
		const storedOptions = getStoredOptions();
		const { backdrop, container, content, closeButton, remove } = addon.tab.createModal(msg("option-title"), {
			isOpen: true,
			useEditorClasses: true,
		});
		container.classList.add("cstmediaRecorderPopup");
		content.classList.add("mediaRecorderPopupContent");

		const recordOptionDescription = Object.assign(document.createElement("p"), {
			textContent: msg("record-description", {
				extension: `.${fileExtension}`,
			}),
			className: "recordOptionDescription",
		});
		recordOptionDescription.appendChild(
			Object.assign(document.createElement("p"), {
				textContent: msg("record-note"),
				className: "recordOptionNote",
			})
		);
		content.appendChild(recordOptionDescription);

		// Create settings elements
		// Delay before starting
		const recordOptionDelay = document.createElement("p");
		const recordOptionDelayInput = Object.assign(document.createElement("input"), {
			type: "number",
			min: 0,
			max: MAX_RECORD_TIME,
			defaultValue: storedOptions.delay,
			id: "recordOptionDelayInput",
			className: addon.tab.scratchClass("prompt_variable-name-text-input"),
		});
		const recordOptionDelayLabel = Object.assign(document.createElement("label"), {
			htmlFor: "recordOptionDelayInput",
			textContent: msg("start-delay"),
		});
		recordOptionDelay.appendChild(recordOptionDelayLabel);
		recordOptionDelay.appendChild(recordOptionDelayInput);
		recordOptionDelay.appendChild(
			Object.assign(document.createElement("span"), {
				textContent: msg("seconds"),
			})
		);
		content.appendChild(recordOptionDelay);

		// Wait for green flag
		const recordOptionFlag = Object.assign(document.createElement("p"), {
			className: "mediaRecorderPopupOption",
		});
		const recordOptionFlagInput = Object.assign(document.createElement("input"), {
			type: "checkbox",
			defaultChecked: storedOptions.waitUntilFlag,
			id: "recordOptionFlagInput",
		});
		const recordOptionFlagLabel = Object.assign(document.createElement("label"), {
			htmlFor: "recordOptionFlagInput",
			textContent: msg("record-after-flag"),
		});
		recordOptionFlag.appendChild(recordOptionFlagInput);
		recordOptionFlag.appendChild(recordOptionFlagLabel);
		content.appendChild(recordOptionFlag);

		content.appendChild(
			Object.assign(document.createElement("div"), {
				className: "mediaRecorderSeparator",
			})
		);

		// Recording length
		const recordOptionSeconds = document.createElement("p");
		const recordOptionSecondsInput = Object.assign(document.createElement("input"), {
			type: "number",
			min: 1,
			max: MAX_RECORD_TIME,
			defaultValue: storedOptions.secs,
			id: "recordOptionSecondsInput",
			className: addon.tab.scratchClass("prompt_variable-name-text-input"),
		});
		const recordOptionSecondsLabel = Object.assign(document.createElement("label"), {
			htmlFor: "recordOptionSecondsInput",
			textContent: msg("record-duration"),
		});
		recordOptionSeconds.appendChild(recordOptionSecondsLabel);
		recordOptionSeconds.appendChild(recordOptionSecondsInput);
		recordOptionSeconds.appendChild(
			Object.assign(document.createElement("span"), {
				textContent: msg("seconds"),
			})
		);
		content.appendChild(recordOptionSeconds);

		// End on stop sign
		const recordOptionStop = Object.assign(document.createElement("p"), {
			className: "mediaRecorderPopupOption",
		});
		const recordOptionStopInput = Object.assign(document.createElement("input"), {
			type: "checkbox",
			defaultChecked: storedOptions.useStopSign,
			id: "recordOptionStopInput",
		});
		const recordOptionStopLabel = Object.assign(document.createElement("label"), {
			htmlFor: "recordOptionStopInput",
			textContent: msg("record-until-stop"),
		});
		let wasStopInputChecked = storedOptions.useStopSign;
		const onFlagInputToggle = () => {
			const disabled = (recordOptionStopInput.disabled = !recordOptionFlagInput.checked);
			if (disabled) {
				wasStopInputChecked = recordOptionStopInput.checked;
				recordOptionStopLabel.title = msg("record-until-stop-disabled", {
					afterFlagOption: msg("record-after-flag"),
				});
				recordOptionStopInput.checked = false;
			} else {
				recordOptionStopLabel.title = "";
				recordOptionStopInput.checked = wasStopInputChecked;
			}
		};
		recordOptionFlagInput.addEventListener("change", onFlagInputToggle);
		onFlagInputToggle(); // The option could be unchecked to begin with
		recordOptionStop.appendChild(recordOptionStopInput);
		recordOptionStop.appendChild(recordOptionStopLabel);
		content.appendChild(recordOptionStop);

		content.appendChild(
			Object.assign(document.createElement("div"), {
				className: "mediaRecorderSeparator",
			})
		);

		// Video resolution.
		// In the user interface this is shown as linked width/height inputs,
		// but internally this is actually a scaling factor
		// (which, for example, makes things simpler when storing the scale value with changing stage sizes)
		const stageWidth = getStageWidth();
		const stageHeight = getStageHeight();
		const recordOptionScale = document.createElement("p");
		const recordOptionScaleInputW = Object.assign(document.createElement("input"), {
			type: "number",
			min: Math.ceil(stageWidth * MIN_SCALE),
			max: stageWidth * SCALE_LIMIT,
			defaultValue: Math.ceil(stageWidth * (storedOptions.stageScale || 1)),
			id: "recordOptionScaleInputW",
			step: "any",
			className: addon.tab.scratchClass("prompt_variable-name-text-input"),
		});
		const recordOptionScaleInputH = Object.assign(document.createElement("input"), {
			type: "number",
			min: Math.ceil(stageHeight * MIN_SCALE),
			max: stageHeight * SCALE_LIMIT,
			defaultValue: Math.ceil(stageHeight * (storedOptions.stageScale || 1)),
			id: "recordOptionScaleInputH",
			step: "any",
			className: addon.tab.scratchClass("prompt_variable-name-text-input"),
		});
		const recordOptionScaleLabel = Object.assign(document.createElement("label"), {
			htmlFor: "recordOptionScaleInput",
			textContent: msg("video-resolution"),
		});
		const recordOptionScaleX = Object.assign(document.createElement("span"), {
			textContent: "x",
		});
		recordOptionScale.appendChild(recordOptionScaleLabel);
		recordOptionScale.appendChild(recordOptionScaleInputW);
		recordOptionScale.appendChild(recordOptionScaleX);
		recordOptionScale.appendChild(recordOptionScaleInputH);
		content.appendChild(recordOptionScale);
		const onScaleInputChange = (e) => {
			const _value = Number(e.target.value);
			let value = isNaN(_value) ? e.target.defaultValue : _value;
			if (value <= e.target.min) {
				value = e.target.min;
			} else if (value > e.target.max) {
				value = e.target.max;
			}
			e.target.value = value;
		};

		// Match aspect ratio
		const onScaleInputWChange = () => {
			recordOptionScaleInputH.value = Math.ceil(recordOptionScaleInputW.value / (stageWidth / stageHeight));
		};
		const onScaleInputHChange = () => {
			recordOptionScaleInputW.value = Math.floor(recordOptionScaleInputH.value * (stageWidth / stageHeight));
			onScaleInputWChange();
		};
		recordOptionScaleInputW.addEventListener("change", onScaleInputChange);
		recordOptionScaleInputH.addEventListener("change", onScaleInputChange);
		recordOptionScaleInputW.addEventListener("change", onScaleInputWChange);
		recordOptionScaleInputH.addEventListener("change", onScaleInputHChange);

		// Audio enabled
		const recordOptionAudio = Object.assign(document.createElement("p"), {
			className: "mediaRecorderPopupOption",
		});
		const recordOptionAudioInput = Object.assign(document.createElement("input"), {
			type: "checkbox",
			defaultChecked: storedOptions.audioEnabled,
			id: "recordOptionAudioInput",
		});
		const recordOptionAudioLabel = Object.assign(document.createElement("label"), {
			htmlFor: "recordOptionAudioInput",
			textContent: msg("record-audio"),
			title: msg("record-audio-description"),
		});
		recordOptionAudio.appendChild(recordOptionAudioInput);
		recordOptionAudio.appendChild(recordOptionAudioLabel);
		content.appendChild(recordOptionAudio);

		// Mic enabled
		const recordOptionMic = Object.assign(document.createElement("p"), {
			className: "mediaRecorderPopupOption",
		});
		const recordOptionMicInput = Object.assign(document.createElement("input"), {
			type: "checkbox",
			defaultChecked: storedOptions.micEnabled,
			id: "recordOptionMicInput",
		});
		const recordOptionMicLabel = Object.assign(document.createElement("label"), {
			htmlFor: "recordOptionMicInput",
			textContent: msg("record-mic"),
		});
		recordOptionMic.appendChild(recordOptionMicInput);
		recordOptionMic.appendChild(recordOptionMicLabel);
		content.appendChild(recordOptionMic);

		let resolvePromise = null;
		const optionPromise = new Promise((resolve) => {
			resolvePromise = resolve;
		});
		let handleOptionClose = null;

		backdrop.addEventListener("click", () => handleOptionClose(null));
		closeButton.addEventListener("click", () => handleOptionClose(null));

		handleOptionClose = (value) => {
			resolvePromise(value);
			remove();
		};

		const buttonRow = Object.assign(document.createElement("div"), {
			className: addon.tab.scratchClass("prompt_button-row", { others: "mediaRecorderPopupButtons" }),
		});
		const cancelButton = Object.assign(document.createElement("button"), {
			textContent: msg("cancel"),
		});
		cancelButton.addEventListener("click", () => handleOptionClose(null), { once: true });
		buttonRow.appendChild(cancelButton);
		const startButton = Object.assign(document.createElement("button"), {
			textContent: msg("start"),
			className: addon.tab.scratchClass("prompt_ok-button"),
		});
		startButton.addEventListener(
			"click",
			() =>
				handleOptionClose({
					secs: Math.min(Number(recordOptionSecondsInput.value), MAX_RECORD_TIME),
					delay: Math.min(Number(recordOptionDelayInput.value), MAX_RECORD_TIME),
					audioEnabled: recordOptionAudioInput.checked,
					micEnabled: recordOptionMicInput.checked,
					waitUntilFlag: recordOptionFlagInput.checked,
					useStopSign: !recordOptionStopInput.disabled && recordOptionStopInput.checked,
					stageScale: Number(recordOptionScaleInputW.value) / stageWidth,
				}),
			{ once: true }
		);
		buttonRow.appendChild(startButton);
		content.appendChild(buttonRow);

		return optionPromise;
	};
	const disposeRecorder = () => {
		isRecording = false;
		forceRendererResize();
		recordElem.textContent = msg("record");
		recordElem.title = "";
		recorder = null;
		recordBuffer = [];
		clearTimeout(timeout);
		timeout = 0;
		if (stopSignFunc) {
			vm.runtime.off("PROJECT_STOP_ALL", stopSignFunc);
			stopSignFunc = null;
		}
	};
	const stopRecording = (force) => {
		if (isWaitingForFlag) {
			vm.runtime.off("PROJECT_START", waitingForFlagFunc);
			isWaitingForFlag = false;
			waitingForFlagFunc = null;
			abortController.abort();
			abortController = null;
			disposeRecorder();
			return;
		}
		if (!isRecording || !recorder || recorder.state === "inactive") return;
		if (force) {
			disposeRecorder();
		} else {
			recorder.onstop = () => {
				const blob = new Blob(recordBuffer, { type: mimeType });
				downloadBlob(`${addon.tab.redux.state?.preview?.projectInfo?.title || "video"}.${fileExtension}`, blob);
				disposeRecorder();
			};
			recorder.stop();
		}
	};
	const startRecording = async (opts) => {
		// Timer
		const secs = Math.min(MAX_RECORD_TIME, Math.max(1, opts.secs));

		// Initialize MediaRecorder
		recordBuffer = [];
		isRecording = true;
		stageScale = opts.stageScale;
		let micStream;
		if (opts.micEnabled) {
			// Show permission dialog before green flag is clicked
			try {
				micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
			} catch (e) {
				if (e.name !== "NotAllowedError" && e.name !== "NotFoundError") throw e;
				opts.micEnabled = false;
			}
		}

		// After we see if the user has/enables their mic, save settings to localStorage.
		localStorage.setItem(LOCALSTORAGE_ENTRY, JSON.stringify(opts));

		if (opts.waitUntilFlag) {
			isWaitingForFlag = true;
			Object.assign(recordElem, {
				textContent: msg("click-flag"),
				title: msg("click-flag-description"),
			});
			abortController = new AbortController();
			try {
				await Promise.race([
					new Promise((resolve) => {
						waitingForFlagFunc = () => resolve();
						vm.runtime.once("PROJECT_START", waitingForFlagFunc);
					}),
					new Promise((_, reject) => {
						abortController.signal.addEventListener("abort", () => reject("aborted"), { once: true });
					}),
				]);
			} catch (e) {
				if (e.message === "aborted") return;
				throw e;
			}
		}
		isWaitingForFlag = false;
		forceRendererResize();
		waitingForFlagFunc = abortController = null;
		const stream = new MediaStream();
		const videoStream = vm.runtime.renderer.canvas.captureStream();
		stream.addTrack(videoStream.getVideoTracks()[0]);

		const ctx = new AudioContext();
		const dest = ctx.createMediaStreamDestination();
		if (opts.audioEnabled) {
			const mediaStreamDestination = vm.runtime.audioEngine.audioContext.createMediaStreamDestination();
			vm.runtime.audioEngine.inputNode.connect(mediaStreamDestination);
			const audioSource = ctx.createMediaStreamSource(mediaStreamDestination.stream);
			audioSource.connect(dest);
		}
		if (opts.micEnabled) {
			const micSource = ctx.createMediaStreamSource(micStream);
			micSource.connect(dest);
		}
		if (opts.audioEnabled || opts.micEnabled) {
			stream.addTrack(dest.stream.getAudioTracks()[0]);
		}
		recorder = new MediaRecorder(stream, { mimeType });
		recorder.ondataavailable = (e) => {
			recordBuffer.push(e.data);
		};
		recorder.onerror = (e) => {
			console.warn("Recorder error:", e.error);
			stopRecording(true);
		};
		timeout = setTimeout(() => stopRecording(false), secs * 1000);
		if (opts.useStopSign) {
			stopSignFunc = () => stopRecording();
			vm.runtime.once("PROJECT_STOP_ALL", stopSignFunc);
		}

		// Delay
		const delay = opts.delay || 0;
		const roundedDelay = Math.floor(delay);
		for (let index = 0; index < roundedDelay; index++) {
			recordElem.textContent = msg("starting-in", { secs: roundedDelay - index });
			await new Promise((resolve) => setTimeout(resolve, 975));
		}
		setTimeout(
			() => {
				recordElem.textContent = msg("stop");

				recorder.start(1000);
			},
			(delay - roundedDelay) * 1000
		);
	};

	class HighResMediaRecorder {
		getInfo() {
			return {
				id: exId,
				name: "High Resolution Video Recorder",
				blocks: [
					{
						func: "record",
						blockType: Scratch.BlockType.BUTTON,
						text: recordText,
					}
				]
			}
		}

		async record() {
			if (isRecording) {
				stopRecording();
			} else {
				const opts = await getOptions();
				if (!opts) {
					console.log("Canceled");
					return;
				}
				startRecording(opts);
			}
		}
	}
	Scratch.extensions.register(new HighResMediaRecorder());
})(Scratch);