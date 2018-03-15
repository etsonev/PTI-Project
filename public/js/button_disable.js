let inputs = document.querySelectorAll('input');
let button = document.querySelector('input[type=submit]');
button.disabled = true

for (i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input',() => {
    let values = []
    inputs.forEach(v => values.push(v.value));
    button.disabled = values.includes('') && values.classList.contains('error-contaier');
  })
}