import Stopwatch from "./stop_watch.js"

export function start() {
    $.ajax({ type: "GET",
        url: document.URL,
        success : function(text)
        {
            $("#page_game_jakub").empty();
            $("#page_game_jakub").append(
                $(text).find('#page_game_jakub').removeClass('hidden'))


            window.stopwatch = new Stopwatch(
                document.querySelector('.stopwatch'),
                document.querySelector('.results')
            );
        }
    });
}

window.allowDrop = function (ev) {
    ev.preventDefault();
};

let counter = 0;

window.drag = function (ev) {
    ev.dataTransfer.setData("text", ev.target.id);
};

window.drop = function (ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    counter++;
    console.log(ev);
    console.log(counter);


    if(counter === 9) {
        window.stopwatch.stop();
        $('.eng-game').removeClass('hidden')
    }
};


