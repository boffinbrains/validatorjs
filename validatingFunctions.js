const tooltip = (message, height = 24) => `
    <div class="validator-tooltip" style="top: ${height + 12}px">
        <img src="./assets/warning.svg" alt="warning" width="20" style="margin-right: 10px"/>
        ${message}
        <button type="button" style="display: contents; cursor: pointer" onclick="this.parentNode.remove()">
            <img src="./assets/delete.svg" alt="delete" width="20" />
        </button>
    </div>
`;

const checkRequired = (_type, value, element) => {
    if (value != '') {
        return true;
    } else {
        element.insertAdjacentHTML('afterend', tooltip("Required!", element.offsetHeight));
    }
}

const checkEmail = (_emailOnly, value, element) => {
    let regex = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (regex.test(value)) {
        return true;
    } else {
        element.insertAdjacentHTML('afterend', tooltip(`Please include '@' in the email address.`, element.offsetHeight));
    }
}

const checkMaxlen = (max, value, element) => {
    if (max >= value.length) {
        return true;
    } else {
        element.insertAdjacentHTML('afterend', tooltip(`Maximum length should be ${max}.`, element.offsetHeight));
    }
}

const checkMinlen = (min, value, element) => {
    if (min <= value.length) {
        return true;
    } else {
        element.insertAdjacentHTML('afterend', tooltip(`Minimum length should be ${min}.`, element.offsetHeight));
    }
}

const checkNumericOnly = (_numericOnly, value, element) => {
    let regex = /^[0-9]+$/;
    if (regex.test(value)) {
        return true;
    } else {
        element.insertAdjacentHTML('afterend', tooltip(`Please include only numbers.`, element.offsetHeight));
    }
}

const checkSize = (size, value, element) => {
    if (size == value.length) {
        return true;
    } else {
        element.insertAdjacentHTML('afterend', tooltip(`Size should be ${size}.`, element.offsetHeight));
    }
}

const checkPattern = (pattern, value, element) => {
    let regex = pattern;
    if (!regex.test(value)) {
        return true;
    } else {
        element.insertAdjacentHTML('afterend', tooltip(`Please follow the pattern.`, element.offsetHeight));
    }
}

const checkSpecialCharacters = (_specialCharacters, value, element) => {
    let regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!regex.test(value)) {
        return true;
    } else {
        element.insertAdjacentHTML('afterend', tooltip(`Special Characters are not allowed!`, element.offsetHeight));
    }
}

// Master
const validationCheck = (value, { max, type, min, size, emailOnly, numericOnly, pattern, specialCharacters }, element) => {
    if (type != undefined && type === "required") {
        checkRequired(type, value, element);
    }
    if (emailOnly != undefined && emailOnly) {
        checkEmail(emailOnly, value, element);
    }
    if (numericOnly != undefined && numericOnly) {
        checkNumericOnly(numericOnly, value, element);
    }
    if (max != undefined) {
        checkMaxlen(max, value, element);
    }
    if (min != undefined) {
        checkMinlen(min, value, element);
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
    checkEmail,
    checkMaxlen,
    checkMinlen,
    checkNumericOnly,
    checkSize,
    checkPattern,
    checkRequired,
    checkSpecialCharacters,
    validationCheck
};