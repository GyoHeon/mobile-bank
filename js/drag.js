const dragged = document.querySelector(".contents__drag");
const contents = document.querySelector(".contents");

dragged.addEventListener("touchmove", handleMove, false);
dragged.addEventListener("touchend", handleEnd, false);

function handleMove(e) {
  e.preventDefault();
  contents.style.marginTop = `${e.touches[0].clientY - 337}px`;
  console.log(`${e.touches[0].pageY}px`);
}

function handleEnd(e) {
  e.preventDefault();
  if (e.changedTouches[0].clientY < 200) {
    contents.style.marginTop = `-233px`;
  } else {
    contents.style.marginTop = `21px`;
  }
}
