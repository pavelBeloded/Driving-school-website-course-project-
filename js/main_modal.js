const modal = $.modal({
    title: "Закажи звонок",
    subtitle: "Мы перезвоним вам в ближайшее время",
    inputs: [{
        data: "name",
        type: "text",
        placeholder: "Имя",
        name: "name"
    },
    {
        data: "phone",
        type: "tel",
        placeholder: "Номер телефона",
        name: "phone"
    }],
    buttonText: "Заказать звонок"
})

document.addEventListener('click',(event)=>{
    if (event.target.dataset.btn == "open_modal") {
        modal.open();
    }
})