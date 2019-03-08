import $ from "jquery";

const circles = $(".table--typography .circle");

$(() => {
    circles.on("mouseenter", () => {
        circles.blur();
    });
})