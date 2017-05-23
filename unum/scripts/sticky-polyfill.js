import $ from "jquery";

// set jQuery to be available on window so stickyfill will work
window.$ = window.jQuery = $;

require("./lib/stickyfill");

$(".willow-secondary-nav").Stickyfill();