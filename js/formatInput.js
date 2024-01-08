import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

// Инпуты
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');

const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');


// cleave опции форматирования 
const cleavePriceSetting = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
}

// Запускаем форматирование cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownpayment = new Cleave(inputDownPayment, cleavePriceSetting);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);

// Сумма кредита
calcMortgage();

// Отображение и рассчет суммы кредита
form.addEventListener('input', function () {
    // Сумма кредита
    calcMortgage();
})

function calcMortgage() {
    // Общая сумма кредита
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownpayment.getRawValue();
    totalCost.innerText = priceFormatter.format(totalAmount);

    // Ставка по кредиту
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const monthRate = (creditRate * 100) / 12;

    // Срок ипотеки
    const years = +cleaveTerm.getRawValue();
    const months = years * 12;

    // Расчет ежемесячного платежа
    const monthPayment = (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - months));

    // Отображение ежемесячного платежа
    totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment);
}

// Slider Cost
const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    // tooltips: true,
    step: 100000,
    range: {
        'min': 0,
        '50%':[10000000, 1000000],
        'max': 100000000
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    })
});

sliderCost.noUiSlider.on('update', function(){
    const sliderValue =  parseInt(sliderCost.noUiSlider.get(true));
    cleaveCost.setRawValue(sliderValue);
    calcMortgage();
});

// Slider DownPayment
const sliderDownPayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownPayment, {
    start: 6000000,
    connect: 'lower',
    // tooltips: true,
    step: 100000,
    range: {
        'min': 0,
        '50%':[10000000, 1000000],
        'max': 100000000
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    })
});

sliderDownPayment.noUiSlider.on('update', function(){
    const sliderValue =  parseInt(sliderDownPayment.noUiSlider.get(true));
    cleaveDownpayment.setRawValue(sliderValue);
    calcMortgage();
});

// Slider sliderTerm
const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    // tooltips: true,
    step: 1,
    range: {
        'min': 1,
        'max': 30
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    })
});

sliderTerm.noUiSlider.on('update', function(){
    const sliderValue =  parseInt(sliderTerm.noUiSlider.get(true));
    cleaveTerm.setRawValue(sliderValue);
    calcMortgage();
});