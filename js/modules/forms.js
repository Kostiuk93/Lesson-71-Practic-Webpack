import {modalClose, modalOpen} from './modal';
import {postData} from  '../services/services';

function forms (formSelector, modalTimerId) {
    // Forms
    
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg', //добавляем изображение вместо текста
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item);
    });

   
    //_____________________________________________


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // statusMessage окно загрузки обработки запроса
            const statusMessage = document.createElement('img'); // изменяем div на img
            statusMessage.src = message.loading; //меняем путь 
            //задаем стиль изображению
            statusMessage.style.cssText = `  
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); // изображение будет появлятся после формы

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDilog = document.querySelector('.modal__dialog');

        prevModalDilog.classList.add('hide');
        modalOpen('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        
        //Добавление нового модального окна
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDilog.classList.add('show');
            prevModalDilog.classList.remove('hide');
            modalClose('.modal');
        }, 3000);
    }

}
export default forms;