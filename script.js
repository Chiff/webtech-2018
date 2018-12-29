import jakub from './hra_jakub.js'
import martin from './hra_martin.js'

const hidePages = () => {
    $('.single_page').addClass('hidden')
};

const showPage = (id) => {
    console.warn('Page: ', id);

    hidePages();
    $(id).removeClass('hidden');

    if (id.includes('martin')) martin();
    if (id.includes('jakub')) jakub()
};

(() => {
    hidePages();

    if (window.location.href.includes("#"))
        showPage('#' + window.location.href.split('#')[1])
    else
        showPage("#page_main")
})();

window.onhashchange = function (e) {
    showPage('#' + e.newURL.split('#')[1])
};
