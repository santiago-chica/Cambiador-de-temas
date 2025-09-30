const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const root = document.documentElement;
const counterElement = $('#counter_integer');
let currentCount = 0;

class Theme {
    constructor(mainColor, secondaryColor, textColor) {
        this.mainColor = mainColor;
        this.secondaryColor = secondaryColor;
        this.textColor = textColor;
    }
}

function setButtonTheme(button, theme) {
    button.addEventListener("click", e => {
        if (root.style.getPropertyValue('--main-color') == theme.mainColor) {
            return;
        }
        setTheme(theme);
        counterElement.textContent = ++currentCount;
        localStorage.setItem("theme", JSON.stringify(theme));
    });
}

function setTheme(theme) {
    root.style.setProperty('--main-color', theme.mainColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--text-color', theme.textColor);
    
}

const lightTheme = new Theme('#E6FAFC', "#9CFC97", "#353D2F");
const darkTheme = new Theme('#353D2F', "#3e663cff", "#E6FAFC");
const angryTheme = new Theme("#0B0A07", "#D5573B", "#DDD1C7")

let previousTheme = localStorage.getItem("theme");

if (previousTheme) {
    try {
        const parsed = JSON.parse(previousTheme);
        previousTheme = new Theme(parsed.mainColor, parsed.secondaryColor, parsed.textColor);
    } catch {
        previousTheme = lightTheme;
    }
} else {
    previousTheme = lightTheme;
}


setTheme(previousTheme);

setTimeout(() => {$('body').style.transition = 'all 1s ease-out';}, 1)


setButtonTheme($('.light_theme'), lightTheme);
setButtonTheme($('.dark_theme'), darkTheme);
setButtonTheme($('.contrast_theme'), angryTheme);

const imageButton = $('#image_button');
const imageText = $('#image_input');
const imageContainer = $('#image_cont');

imageButton.addEventListener("click", e => {
    const inputText = imageText.value || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB-pnymSMoeRL78OoQQbXG_TnJPLycg5MeGA&s';
    imageContainer.setAttribute('src', inputText);
});
