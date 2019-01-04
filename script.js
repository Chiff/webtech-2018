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
window.getNameByDate = () => {
    const inputDate = $('#calendar-date').val();
    console.log(inputDate);

    let dateParsed = inputDate.split('-');
    let day = dateParsed[2];
    let month = dateParsed[1];
    let formatDate = kalendar[day + '.' + month + '.'];
    console.log(formatDate);


    if (!formatDate) {
        $("#current-name").text(' - ');
        $("#current-date").text(' - ');
        $("#current-operation").text('Musíš si vybrať dátum aby si našiel meno.');
        return;
    }
    else
        $("#current-name").text(formatDate.join(', '))
        $("#current-date").text(inputDate)
        $("#current-operation").text('Hľadanie mena podľa dátumu.')

};

window.getDateByName = () => {
    const inputName = $('#calendar-name').val();

    if (!inputName) {
        $("#current-name").text(' - ');
        $("#current-date").text(' - ');
        $("#current-operation").text('Musíš zadať meno aby si zistil dátum menín.');
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
        $("#current-operation").text('Dátum pre zadané meno nebol nájdený.')
    }
    else {
        $("#current-date").text(date.join(', '));
        $("#current-operation").text('Hľadanie dátumu podľa mena.')
    }

    $("#current-name").text(inputName);

};
