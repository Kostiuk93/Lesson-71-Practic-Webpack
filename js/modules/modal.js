function modalOpen(modalSelector, modalTimerId) {
    const modWin = document.querySelector(modalSelector);
    
    // modWin.style.display = 'flex';       // 1 способ смены стилей Css

        modWin.classList.add('show');       // 2 способ смены стилей
        modWin.classList.remove('hide');    // 2 способ смены стилей

        // modWin.classList.toggle('show');       // 3 способ смены стилей
        document.body.style.overflow = 'hidden'; //отключение прокрутки экрана при вызове модального окна

        console.log(modalTimerId);
        if (modalTimerId) {
            clearInterval(modalTimerId);
        }
    }
    function modalClose(modalSelector) {
        const modWin = document.querySelector(modalSelector);
        
        // modWin.style.display = 'none';    // 1 способ смены стилей Css

        modWin.classList.add('hide');        // 2 способ смены стилей
        modWin.classList.remove('show');     // 2 способ смены стилей

        // modWin.classList.toggle('show');       // 3 способ смены стилей
        document.body.style.overflow = '';    //возврат прокрутки экрана 
    }

function modal (triggerSelector, modalSelector, modalTimerId){
    //Create Modal Window

    const   modWin = document.querySelector(modalSelector),
            modBtn = document.querySelectorAll(triggerSelector);

    

    // Открыть модальные окна
    modBtn.forEach(btn => {
        btn.addEventListener('click', () => modalOpen(modalSelector, modalTimerId));
    });
    
    // Закрытие модального окна кликом на пустое пространство вокруг модального окна и при нажатии на крестик
    modWin.addEventListener('click', (e) => {
        if (e.target === modWin || e.target.classList.contains('modal__close')) {
            modalClose(modalSelector);
        }
    });

    // Закрыть модальное окно при нажатии клавиши на клавиатуре 
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modWin.classList.contains('show')) {
            modalClose();
        } if (e.code === "KeyM" ) {
            modalOpen();
        }
    });
   

    // Появление модального окна при скроле до конца страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // удаляет обработчик событий addEventListener, для того чтобы модальное окно поялвялось только 1 раз, а не каждый раз, когда мы скролим страницу до конца.
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}
export default modal;
export {modalClose};
export {modalOpen};