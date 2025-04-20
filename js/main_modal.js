const modal = $.modal({
    title: "Закажи звонок",
    subtitle: "Мы перезвоним вам в ближайшее время",
    inputs: [{
        data: "name",
        type: "text",
        placeholder: "Имя"
    },
    {
        data: "phone",
        type: "tel",
        placeholder: "Номер телефона"
    }],
    buttonText: "Заказать звонок"
})

document.addEventListener('click',(event)=>{
    // event.preventDefault();
    if (event.target.dataset.btn == "open_modal") {
        modal.open();
    }
})