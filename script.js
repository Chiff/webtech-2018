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

(() => {
    hidePages();

    if (window.location.href.includes("#"))
        showPage('#' + window.location.href.split('#')[1]);
    else
        showPage("#page_main")
})();

window.onhashchange = function (e) {
    showPage('#' + e.newURL.split('#')[1])
};


/* kalendar */

