function forms () {
    // Forms
    
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg', //добавляем изображение вместо текста
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item);
    });

    // функия общения с сервером
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json(); //возвращаем промис
    };
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
        modalOpen();

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
            modalClose();
        }, 3000);
    }

}
module.exports = forms;