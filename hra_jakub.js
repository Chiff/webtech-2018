import Stopwatch from "./stop_watch.js"
export default function () {
    console.log('hra jakub')
}

window.allowDrop = function (ev) {
    ev.preventDefault();
}

window.drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

window.drop=function (ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}


window.stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results')
);

