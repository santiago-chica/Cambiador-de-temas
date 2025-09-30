## La mejor página del mundo
¡Contiene tres suculentos botones para cambiar el tema!

Es muy fácil agregar un nuevo tema

```javascript
// Se instancia una clase
const miNuevoTema = new Theme('#E6FAFC', "#9CFC97", "#353D2F");
// Se obtiene un botón
const boton = document.getElementById('boton');
// Se coloca como tema
setButtonTheme(boton, lightTheme);
```
# Temas por defecto

| Tema Claro | Tema Oscuro | Tema Angry Bird |
| ---------- | ----------- | --------------- |
![Modo claro](sample_images/light.PNG)| ![Modo oscuro](sample_images/dark.PNG)|![Modo angry bird](sample_images/angry.PNG)

## Funcionamiento código
La clase tema es un contenedor para los colores de cada tema. El enfoque es modular.
```javascript
class Theme {
    constructor(mainColor, secondaryColor, textColor) {
        this.mainColor = mainColor;
        this.secondaryColor = secondaryColor;
        this.textColor = textColor;
    }
}
```
Se utiliza la siguiente función para asignar un tema a un botón. También se tiene un contador que usa el operador `++` para elegantemente contar cada vez que se coloque el elemento. También existe un condicional que funciona para verificar que no estemos cambiando al mismo tema que ya existe antes.
```javascript
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
```

Creamos unos temas con nuestro sistema actual, y utilizamos localStorage, colocando un objeto y parseándolo siempre que lo ocupemos. Si no hay un tema previo, se utiliza el modo claro como predeterminado.
```javascript

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
```

Al final, colocamos el tema cargado en el local storage y ponemos una transición en el body. Este se coloca con un timeout de 1 para evitar que se vea la transición apenas se cargue predeterminadamente. Al final hay una funcionalidad para poder poner una imagen adicional en el contenedor.
```javascript
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
```
¡Muchas gracias!

Presenta: Santiago Garzón Chica