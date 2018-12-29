import './hra_jakub.js'
import './hra_martin.js'

const hidePages = () => {
    $('.single_page').addClass('hidden')
};

const showPage = (id) => {
    hidePages();
    $(id).removeClass('hidden')
};

(()=>{
    hidePages();
    showPage('#page_main')
})();

window.onhashchange = function (e) {
    showPage('#' + e.newURL.split('#')[1])
};
