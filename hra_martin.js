export default function () {
    restart();
}

let puzzleDoneCounter = 0;

const restart = () => {
    $('.puzzle-holder').empty();
    $('#outer-dropzone').empty();
    $('.restart').addClass('hidden');

    createDropZones();
    createPuzzle();

    puzzleDoneCounter = 0;

    $(".counter").text("0 / 16");
    $(".timer").text("0s");
};

const createPuzzle = () => {
    interact('.puzzle-piece.allowed').draggable({
        inertia: true,
        restrict: {
            restriction: "#page_game_martin",
            endOnly: true,
            elementRect: {top: 0, left: 0, bottom: 1, right: 1}
        },
        autoScroll: true,
        onmove: dragMoveListener
    });

    Array.from(Array(16).keys()).sort(() => (Math.random() < .5) ? -1 : 1).map((item) => {
        const div = document.createElement('div');

        $(div)
            .addClass('puzzle-piece allowed')
            .addClass(`piece-${item + 1}`)
            .css('background-image', `url(img/puzzle_mato/${item + 1}.png)`)
            .attr('id', `piece-${item + 1}`);

        $('.puzzle-holder').append(div);
    });
};

const createDropZones = () => {
    Array.from(Array(16).keys()).map((item) => {
        const div = document.createElement('div');

        $(div)
            .addClass('dropzone')
            .addClass(`zone-${item + 1}`)
            .attr('id', `zone-${item + 1}`);

        $('#outer-dropzone').append(div);

        const itemClass = '.zone-' + (item + 1);

        interact(itemClass).dropzone({
            // only accept elements matching this CSS selector
            accept: `#piece-${item + 1}`,
            overlap: 0.25,

            // listen for drop related events:
            ondropactivate: function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active');
            },
            ondragenter: function (event) {
                let dropzoneElement = event.target;
                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
            },
            ondrop: function (event) {
                event.relatedTarget.classList.remove('allowed');

                $(event.relatedTarget)
                    .appendTo(event.target)
                    .attr('style', '')
                    .addClass('dropped')
                    .css('background-image', `url(img/puzzle_mato/${event.relatedTarget.id.split('piece-')[1]}.png)`);

                if(puzzleDoneCounter === 0) startTimer();

                puzzleDoneCounter++;
                $(".counter").text(`${puzzleDoneCounter} / 16`);

                if(puzzleDoneCounter === 16) endTimer();
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            }
        })
    });
};

const dragMoveListener = (event) => {
    const target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
};

let timer = null;
let time = null;
const startTimer = () => {
    time = 0;

    timer = setInterval(() => {
        time += 100;
        $('.timer').text((time/1000) + 's');
    }, 100);
};

const endTimer = () => {
    clearInterval(timer);
    $('.restart').removeClass('hidden').on('click', restart);

};