import jakub from './hra_jakub.js'
import * as martin from './hra_martin.js'

const pages = {
    '#page_main': 'Uvod',
    '#page_game_martin': 'Hra Martin',
    '#page_game_jakub': 'Hra Jakub',
    '#page_kontakt': 'Kontakt'
};

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
        history.push('#' + window.location.href.split('#')[1])
    } else {
        showPage("#page_main");
        history.push("#page_main")
    }

})();

const editHistory = lastNElements => {
    const nodeHistory = document.getElementById('history');
    nodeHistory.classList.remove('hidden');
    nodeHistory.innerHTML = '';

    for (let i = 0; i < lastNElements.length; i++) {
        const lastLink = document.createElement('span');
        lastLink.innerText = pages[lastNElements[i]];
        const separator = document.createElement('span');
        separator.innerText = ' > ';
        separator.classList.add('mat-col-secondary-light');

        const holder = document.createElement('span');
        holder.appendChild(separator);
        holder.appendChild(lastLink);
        nodeHistory.appendChild(holder)
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

