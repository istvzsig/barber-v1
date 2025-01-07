function setButtonState(button, state) {
    button.dataset["state"] = state;
}
function onPointerDown(e) {
    setButtonState(e.target, "clicked");
}
function onPointerUp(e) {
    if (e.target.dataset["state"] = "clicked") {
        e.target.addEventListener("animationend", _ => {
            setButtonState(e.target, "")
        });
    }
}

export {
    setButtonState,
    onPointerDown,
    onPointerUp
}