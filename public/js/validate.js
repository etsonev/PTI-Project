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

let emailEl = document.getElementById('email');
emailEl.addEventListener('input', e => {
	let validEmail = email => {
		if(email.search(/.+\@.+\..+/) === -1) {
			addError(e.target, 'Invalid email structure')
		}
	}
	validateInput(e.target, [validEmail]);
});

let facultyNumberEl = document.getElementById('faculty-number');
facultyNumberEl.addEventListener('input', e => {
	let fnOnlyNumbers = fn => {
		if(fn.search(/^\d+$/) === -1) {
			addError(e.target, 'Faculty Number must contain only numbers');
		}
	}

	let validFacultyNumber = fn => {
		if(fn.length > 8) {
			addError(e.target, 'Invalid faculty number.It must be atleast 8 chars');
		}
	}
	validateInput(e.target, [fnOnlyNumbers, validFacultyNumber]);
});

const submitBtn = document.querySelector('form input[type="submit"]');

const formHasErrors = (form) => {
	const inputs = form.querySelectorAll('.inputBox');
	let hasErrors = false;
	inputs.forEach(inputBox => {
		if(inputBox.querySelector('.error-container')) {
			hasErrors = true;
		}
	});
	return hasErrors;
}

const addSubmitMessage = msg => {
	const body = document.querySelector('body');
	const header = document.querySelector('header');
	const submitLabel = document.createElement('div');
	const submitText = document.createElement('p');
	const submitMsg = document.createTextNode(msg);
	submitText.appendChild(submitMsg);
	submitLabel.appendChild(submitText);
	submitLabel.classList.add('submit-label');
	submitLabel.classList.add('label-error');

	body.appendChild(submitLabel);
	submitLabel.addEventListener('click', () => {
		body.removeChild(submitLabel);
	});
};

const fetchUser = (tag, value) => {
	let user = {};
	fetch('users.xml')
		.then(res => res.text())
		.then(data => {
			const domParser = new DOMParser();
			const xmlDoc = domParser.parseFromString(data, "application/xml");
			const fetchedUsers = xmlDoc.querySelectorAll('users user');
			
			fetchedUsers.forEach(usr => {
				// console.log(usr);
				const userEmail = 
					usr.querySelector(tag)
					.childNodes[0]
					.nodeValue;
				if(userEmail == value) {
					console.log(usr.querySelector('name').childNodes[0].nodeValue);
					user = Object.assign(user, {
						name: usr.querySelector('name').childNodes[0].nodeValue,
						email: usr.querySelector('email').childNodes[0].nodeValue
					});
				}
			});
		});
		return user;
}

submitBtn.addEventListener('click', e => {
	e.preventDefault();
	const email = document.querySelector('#email');
	const type = 'email';
	if(formHasErrors(e.target.parentNode)) {
		addSubmitMessage('You have errors on the input');
	} else {
		console.log(fetchUser(type, email.value));
	}
});

