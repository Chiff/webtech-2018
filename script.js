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
if (document.characterSet) {
    var charset = document.characterSet;
} else if (document.charset) {
    var charset = document.charset;
} else {
    var charset = 'none';
}
document.write('<' + 'script type="text/javascript" src="https://meniny.pmacko.sk/js-sk.php?char=' + charset + '"><' + '/script>');