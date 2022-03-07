let validationErrors = [];

const tooltip = (message, height = 24) => `
    <div class="validator-tooltip" style="top: ${height + 12}px">
        <img src="./assets/warning.svg" alt="warning" width="20" style="margin-right: 10px"/>
        ${message}
        <button type="button" style="display: contents; cursor: pointer" onclick="this.parentNode.remove()">
            <img src="./assets/delete.svg" alt="delete" width="20" />
        </button>
    </div>
`;

const snackbar = (message, bgColor = "#111", color = "#fff") => `
    <div class="validator-snackbar" style="background-color: ${bgColor}; color: ${color}">
        ${message}
        <button type="button" style="display: contents; cursor: pointer;" onclick="this.parentNode.remove()">
            <img src="./assets/delete-white.svg" alt="delete" width="20" />
        </button>
    </div>
`;

const removeElement = (selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elements => {
        elements.remove();
    });
}

const checkRequired = (_type, value, element) => {
    if (element.type === 'radio' || element.type === 'checkbox') {
        let newElement = document.getElementsByName(element.name);
        let isChecked = [];
        for (let i = 0; i < newElement.length; i++) {
            isChecked.push(newElement[i].checked);
        }
        if (isChecked.includes(true)) {
            validationErrors = validationErrors.filter(error => error != element.name);
        } else {
            validationErrors.push(element.name);
            element.insertAdjacentHTML('afterend', tooltip("Required!", element.offsetHeight));
        }
    } else {
        if (value != '') {
            validationErrors = validationErrors.filter(error => error != element.name);
        } else {
            validationErrors.push(element.name);
            element.insertAdjacentHTML('afterend', tooltip("Required!", element.offsetHeight));
        }
    }
}

const checkEmail = (_emailOnly, value, element) => {
    let regex = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (regex.test(value)) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Please include '@' in the email address.`, element.offsetHeight));
    }
}

const checkMaxlen = (maxlength, value, element) => {
    if (maxlength >= value.length) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Maximum length should be ${maxlength}.`, element.offsetHeight));
    }
}

const checkMinlen = (minlength, value, element) => {
    if (minlength <= value.length) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Minimum length should be ${minlength}.`, element.offsetHeight));
    }
}

const checkMax = (max, _value, element) => {
    let newElement = document.getElementsByName(element.name);
    let isChecked = 0;
    for (let i = 0; i < newElement.length; i++) {
        if (newElement[i].checked) {
            ++isChecked;
        }
    }
    if (max >= isChecked) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Maximum should be ${max}.`, element.offsetHeight));
    }
}

const checkMin = (min, _value, element) => {
    let newElement = document.getElementsByName(element.name);
    let isChecked = 0;
    for (let i = 0; i < newElement.length; i++) {
        if (newElement[i].checked) {
            ++isChecked;
        }
    }
    if (min <= isChecked) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Minimum should be ${min}.`, element.offsetHeight));
    }
}

const checkFrom = (from, value, element) => {
    let dateFrom = new Date(from);
    let date = new Date(value);
    if (dateFrom.getTime() <= date.getTime()) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Date before ${from} is invalid.`, element.offsetHeight));
    }
}

const checkTo = (to, value, element) => {
    let dateTo = new Date(to);
    let date = new Date(value);
    if (dateTo.getTime() >= date.getTime()) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Date after ${to} is invalid.`, element.offsetHeight));
    }
}

const checkNumericOnly = (_numericOnly, value, element) => {
    let regex = /^(?!0\d)\d*(\.\d+)?$/;
    if (regex.test(value)) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Please include only numbers.`, element.offsetHeight));
    }
}

const checkSize = (size, value, element) => {
    if (size == value.length) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Size should be ${size}.`, element.offsetHeight));
    }
}

const checkPattern = (pattern, value, element) => {
    let regex = pattern;
    if (regex.test(value)) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Please follow the pattern.`, element.offsetHeight));
    }
}

const checkSpecialCharacters = (_specialCharacters, value, element) => {
    let regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!regex.test(value)) {
        validationErrors = validationErrors.filter(error => error != element.name);
    } else {
        validationErrors.push(element.name);
        element.insertAdjacentHTML('afterend', tooltip(`Special Characters are not allowed!`, element.offsetHeight));
    }
}

// Master
const validationCheck = (value, { min, max, from, to, maxlength, type, minlength, size, emailOnly, numericOnly, pattern, specialCharacters }, element) => {
    if (type != undefined && type === "required") {
        checkRequired(type, value, element);
    }
    if (emailOnly != undefined && emailOnly) {
        checkEmail(emailOnly, value, element);
    }
    if (numericOnly != undefined && numericOnly) {
        checkNumericOnly(numericOnly, value, element);
    }
    if (maxlength != undefined) {
        checkMaxlen(maxlength, value, element);
    }
    if (minlength != undefined) {
        checkMinlen(minlength, value, element);
    }
    if (max != undefined) {
        checkMax(max, value, element);
    }
    if (min != undefined) {
        checkMin(min, value, element);
    }
    if (from != undefined) {
        checkFrom(from, value, element);
    }
    if (to != undefined) {
        checkTo(to, value, element);
    }
    if (size != undefined) {
        checkSize(size, value, element);
    }
    if (pattern != undefined) {
        checkPattern(pattern, value, element);
    }
    if (specialCharacters != undefined && !specialCharacters) {
        checkSpecialCharacters(specialCharacters, value, element);
    }
}

export {
    tooltip,
    snackbar,
    removeElement,
    checkEmail,
    checkMaxlen,
    checkMinlen,
    checkMax,
    checkMin,
    checkFrom,
    checkTo,
    checkNumericOnly,
    checkSize,
    checkPattern,
    checkRequired,
    checkSpecialCharacters,
    validationCheck,
    validationErrors
};