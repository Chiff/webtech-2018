import jakub from './hra_jakub.js'
import * as martin from './hra_martin.js'
import kalendar from './meniny.js'

const hidePages = () => {
    $('.single_page').addClass('hidden');

    martin.restart();
};

const showPage = (id) => {
    console.warn('Showing page: ', id);

    hidePages();
    $(id).removeClass('hidden');

    // if (id.includes('martin')) martin.restart();
    if (id.includes('jakub')) jakub()
};

const history = [];

(() => {
    hidePages();

    if (window.location.href.includes("#")) {
        showPage('#' + window.location.href.split('#')[1]);
        history.push('#' + window.location.href.split('#')[1]);
    } else {
        showPage("#page_main");
        history.push("#page_main");
    }

})();

const pages = {
    '#page_main': 'Uvod',
    '#page_game_martin': 'Hra Martin',
    '#page_game_jakub': 'Hra Jakub',
    '#page_kontakt': 'Kontakt'
};

const editHistory = (lastNElements) => {
    const $nodeHistory = $('#history');
    $nodeHistory.removeClass('hidden');
    $('.pages').removeClass('no-history');
    $nodeHistory.empty();

    for (let i = 0; i < lastNElements.length; i++) {
        $nodeHistory.append($.parseHTML(`<span><span class="mat-col-secondary-light"> > </span>${pages[lastNElements[i]]}</span>`))
    }

};

window.onhashchange = function (e) {
    history.push('#' + e.newURL.split('#')[1]);
    showPage('#' + e.newURL.split('#')[1]);

    e.preventDefault();

    const lastNElements = history.slice(Math.max(history.length - 5, 0));
    editHistory(lastNElements);
};

/* kalendar */
// window.a=kalendar
window.getNameByDate = () => {
    const inputDate = $('#calendar-date').val();
    console.log(inputDate);

    // osetri nespravny input (empty)

    // premen nazvypremennych
    let dparsed = inputDate.split('-');
    let den = dparsed[2];
    let mesiac = dparsed[1];
    let dd = kalendar[den + '.' + mesiac + '.'];
    console.log(dd);

    // vypln chybove/uspesne hlasky
    if (!dd) $("#current-name").text(' - ');
    else
        $("#current-name").text(dd.join(', '))


    $("#current-date").text(inputDate)
    $("#current-operation").text('Najdenie menin podla datumu')

};
window.getDateByName = () => {
    const inputName = $('#calendar-name').val();

    if (!inputName) {
        $("#current-name").text(' - ');
        $("#current-date").text(' - ');
        $("#current-operation").text('Musite zadat meno');
        return;
    }

    const date = Object.keys(kalendar).map((item) => {
        const itemLower = kalendar[item].map(e => e.toLowerCase());

        if (itemLower.includes(inputName.toLowerCase())) return item;
        return false
    }).filter(e => e);

    console.log(date)

    if (!date || date.length < 1) {
        $("#current-date").text(' - ');
        $("#current-operation").text('Datum pre zadane meno nebol najdeny')
    }
    else {
        $("#current-date").text(date.join(', '));
        $("#current-operation").text('Najdenie datumu podla menin')
    }

    $("#current-name").text(inputName);

};
