import jakub from './hra_jakub.js'
import * as martin from './hra_martin.js'

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

const kalendar = {};
const loadXML = (fileName) => {
    $.ajax({
        type: 'GET',
        url: fileName,
        dataType: 'xml',
        success: (xml) => {
            $(xml).find('zaznam').each((i, j) => {
                const den = $(j).find('den').text();
                const meniny = $(j).find('SK').text();

                kalendar[den] = meniny.split(', ')
            });

            // console.log(kalendar)
        },
        error: (...e) => {
            console.log(e)
        }
    })
};

const fillGamesMenu = () => {
    const $dropDown = $('.drop-down');

    const menuItems = [
        '<a href="#page_game_martin">Hra Martin</a>',
        '<a href="#page_game_jakub">Hra Jakub</a>',
        '<div class="drop-extend"><a>Tretí člen chýba ➤</a></div>'
    ];

    for(let item in menuItems) {
        $dropDown.append($.parseHTML(menuItems[item]));
    }

    const $dropExtend = $('.drop-extend');
    $dropExtend.append($.parseHTML('<div class="drop-down-level-2"></div>'));

    const menuItemsLevel2 = [
        '<div>3. úroveň menu..</div>',
        '<a class="disabled">Žiadne položky</a>'
    ];

    for(let item in menuItemsLevel2) {
        $('.drop-down-level-2').append($.parseHTML(menuItemsLevel2[item]));
    }
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

    loadXML('./meniny.xml');
    fillGamesMenu();
})();

const pages = {
    '#page_main': 'Úvod',
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

    let dateParsed = inputDate.split('-');
    let day = dateParsed[2];
    let month = dateParsed[1];
    let formatDate = kalendar[month + '' + day];

    // console.log(month + '' + day);
    // console.log(inputDate);
    // console.log(formatDate);

    if (!formatDate) {
        $("#current-name").text(' - ');
        $("#current-date").text(' - ');
        $("#current-operation").text('Musíš si vybrať dátum aby si našiel meno.');
    } else {
        $("#current-name").text(formatDate.join(', '));
        $("#current-date").text(day + '.' + month + '.');
        $("#current-operation").text('Hľadanie mena podľa dátumu.')
    }

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
        // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
        const itemNormal = kalendar[item].map(e => e.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
        const inputNormal = inputName.toLowerCase().replace(/[\u0300-\u036f]/g, "");
        if (itemNormal.includes(inputNormal)) return item;
        return false
    }).filter(e => e);

    // console.log(date);

    if (!date || date.length < 1) {
        $("#current-date").text(' - ');
        $("#current-operation").text('Dátum pre zadané meno nebol nájdený.')
    } else {
        $("#current-date").text(date[0].slice(2) + '.' + date[0].slice(0, 2) + '.');
        $("#current-operation").text('Hľadanie dátumu podľa mena.')
    }

    $("#current-name").text(kalendar[date] || ' - ');
};
