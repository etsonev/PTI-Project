let validateInput = (input, validators) => {
	let errorContainer = input.parentNode.querySelector('.error-container');
	if(errorContainer) {
		input.parentNode.removeChild(errorContainer);
	}
	validators.forEach((validator) => {
		validator(input.value);
	});
};

let addError = (input, message) => {
	let errorContainer = 
		input.parentNode.querySelector('.error-container') ||
		document.createElement('div');
	errorContainer.classList.add('error-container');
	errorContainer.innerHTML += `<p>${message}</p>`;
	input.parentNode.appendChild(errorContainer);
}

let nameEl = document.getElementById('name');
nameEl.addEventListener('input', e => {
	let emptyNameValidator = (name) => {
		if(name.length === 0) {
			addError(e.target, 'Empty Name');
		}
	};
	validateInput(e.target, [emptyNameValidator]);
});

let passwordEl = document.getElementById('password');
passwordEl.addEventListener('input', e => {
	let atleast8CharsPass = (pass) => {
		if(pass.length < 8) {
			addError(e.target, 'Password must be atleast 8 characters');
		}
	};

	let atleastOneDigit = (pass) => {
		if(pass.search(/[0-9]+/) === -1) {
			addError(e.target, 'Password must contain atleast one digit');
		}
	};
	validateInput(e.target, [atleast8CharsPass, atleastOneDigit]);
});