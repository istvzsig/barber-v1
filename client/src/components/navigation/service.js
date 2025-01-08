function setButtonState(button, state) {
    button.dataset["state"] = state;
}
function handlePointerDown(e) {
    setButtonState(e.target, "clicked");
}
function handlePointerUp(e) {
    if (e.target.dataset["state"] = "clicked") {
        e.target.addEventListener("animationend", _ => {
            setButtonState(e.target, "")
        });
    }
}
export {
    setButtonState,
    handlePointerDown,
    handlePointerUp
}