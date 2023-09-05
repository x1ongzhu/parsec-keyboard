function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch (event.type) {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(
        type,
        true,
        true,
        window,
        1,
        first.screenX,
        first.screenY,
        first.clientX,
        first.clientY,
        false,
        false,
        false,
        false,
        0 /*left*/,
        null
    );

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

(function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
})();

let dragging = false;
$(".virtual-keyboard-window").draggable({
    containment: "parent",
    handle: ".window-top",
    drag: function (event, ui) {
        localStorage.setItem("keyboard-position", JSON.stringify(ui.position));
    },
    start: function (event, ui) {
        dragging = true;
    },
    stop: function (event, ui) {
        setTimeout(() => {
            dragging = false;
        }, 300);
    },
});
$(".keyboard-toggle").draggable({
    containment: "parent",
    drag: function (event, ui) {
        localStorage.setItem(
            "keyboard-toggle-position",
            JSON.stringify(ui.position)
        );
    },
    start: function (event, ui) {
        dragging = true;
    },
    stop: function (event, ui) {
        setTimeout(() => {
            dragging = false;
        }, 300);
    },
});
function showKeyboard() {
    if (dragging) return;
    $(".virtual-keyboard-window").show();
    $(".keyboard-toggle").hide();
    localStorage.setItem("virtual-keyboard-visible", "true");
}
function hideKeyboard() {
    if (dragging) return;
    $(".virtual-keyboard-window").hide();
    $(".keyboard-toggle").show();
    localStorage.setItem("virtual-keyboard-visible", "false");
}
$(".btn-close").click(hideKeyboard);
$(".keyboard-toggle").click(showKeyboard);
if (
    localStorage.getItem("virtual-keyboard-visible") === "true" ||
    localStorage.getItem("virtual-keyboard-visible") === null
) {
    showKeyboard();
} else {
    hideKeyboard();
}
let keyboardPosition = {
    left: (window.innerWidth - 800) / 2,
    top: window.innerHeight - 300,
};
if (localStorage.getItem("keyboard-position")) {
    keyboardPosition = JSON.parse(localStorage.getItem("keyboard-position"));
    keyboardPosition.left = Math.min(
        keyboardPosition.left,
        window.innerWidth - 800
    );
    keyboardPosition.top = Math.min(
        keyboardPosition.top,
        window.innerHeight - 300
    );
}
$(".virtual-keyboard-window").css("left", keyboardPosition.left);
$(".virtual-keyboard-window").css("top", keyboardPosition.top);
let togglePosition = {
    left: window.innerWidth - 100,
    top: window.innerHeight - 100,
};
if (localStorage.getItem("keyboard-toggle-position")) {
    togglePosition = JSON.parse(
        localStorage.getItem("keyboard-toggle-position")
    );
    togglePosition.left = Math.min(togglePosition.left, window.innerWidth - 50);
    togglePosition.top = Math.min(togglePosition.top, window.innerHeight - 50);
}
$(".keyboard-toggle").css("left", togglePosition.left);
$(".keyboard-toggle").css("top", togglePosition.top);

const Keyboard = window.SimpleKeyboard.default;
const keyboard = new Keyboard({
    onChange: (input) => onChange(input),
    onKeyPress: (button) => onKeyPress(button),
});

function onChange(input) {
    // document.querySelector(".input").value = input;
    console.log("Input changed", input);
}

function onKeyPress(button) {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") {
        handleShift();
        return;
    }
    keyboard.clearInput();
    let key = button;
    if (key === ".com") {
        for (let char of ".com".split("")) {
            sendKey(char);
        }
        return;
    }
    switch (key) {
        case "{bksp}":
            key = "Backspace";
            break;
        case "{enter}":
            key = "Enter";
            break;
        case "{space}":
            key = " ";
            break;
        case "{tab}":
            key = "Tab";
            break;
        case "{esc}":
            key = "Escape";
            break;
        case "{lock}":
            key = "CapsLock";
            break;
        case "{shift}":
            key = "Shift";
            break;
        case "{alt}":
            key = "Alt";
            break;
        case "{ctrl}":
            key = "Control";
            break;
    }
    sendKey(key);
}

function sendKey(key) {
    let ev = new KeyboardEvent("keydown", {
        key,
        code: keyCode[key],
    });
    window.dispatchEvent(ev);
}

function handleShift() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    keyboard.setOptions({
        layoutName: shiftToggle,
    });
}

$(".virtual-keyboard-window,.keyboard-toggle").bind(
    "touchstart mousedown",
    function (event) {
        event.stopPropagation();
    }
);
