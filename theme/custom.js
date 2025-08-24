const header = document.getElementsByClassName("menu-title")[0];
const title = header.childNodes[0];

const logo = document.createElement("img");
logo.setAttribute("src", "images/gc.png");
logo.setAttribute("class", "gc-logo");

const div = document.createElement("div");
div.setAttribute("class", "title")
div.append(logo);
div.append(title);

header.append(div);