function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good;
    img.onerror = bad;
    img.src = imageSrc;
}


const header = document.getElementsByClassName("menu-title")[0];
const title = header.childNodes[0];

let depth = 0;
const logoPath = "images/gc.png";
const logo = document.createElement("img");
logo.setAttribute("class", "gc-logo");
logo.onerror = function () {
    depth++;
    if (depth > 3) {
        return;
    }

    logo.src = "../".repeat(depth) + logoPath;
}

logo.src = logoPath;

const div = document.createElement("div");
div.setAttribute("class", "title");
div.append(logo);
div.append(title);

header.append(div);