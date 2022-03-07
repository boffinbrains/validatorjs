import { validationErrors, validationCheck, snackbar, removeElement } from './validatingFunctions.js';

const PostData = async (url, data, button) => {
    let buttonText = button.innerText;
    button.innerText = 'Please Wait...';
    button.disabled = true;
    await fetch(url, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            button.innerText = buttonText;
            button.disabled = false;
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(json => {
            button.innerText = buttonText;
            button.disabled = false;
            removeElement('.validator-snackbar');
            document.body.insertAdjacentHTML('afterbegin', snackbar("Form Submitted Successfully!"));
            setTimeout(() => {
                removeElement('.validator-snackbar');
            }, 5000);
            console.log(json)
        })
        .catch(err => {
            button.innerText = buttonText;
            button.disabled = false;
            alert(err)
        })
}

let data = {};
const button = document.getElementById("formBtn"); // Button

const validator = () => {
    const tooltips = document.querySelectorAll('.validator-tooltip');
    tooltips.forEach(tooltip => {
        tooltip.remove(); // Remove Tooltip
    });
    for (const [_key, params] of Object.entries(validationRules)) {
        delete window[params.name]; // Delete Global Variable
        const elements = document.getElementsByName(params.name);
        for (let i = 0; i < elements.length; i++) {
            elements[i].parentElement.style.position = 'relative';
            let type = ["text", "email", "number", "tel", "password", "url", "search", "textarea"];
            if (elements[i].type === "radio" || elements[i].type === "checkbox") {
                elements[i].addEventListener('click', validator); // Trigger Validator on click
            }
            if (type.includes(elements[i].type)) {
                elements[i].addEventListener('keyup', validator); // Trigger Validator on Keyup
            }
            if (elements[i].type === "date") {
                elements[i].addEventListener('change', validator); // Trigger Validator on change
            }
            if (elements.length > 1) {
                if (typeof window[params.name] === "undefined") {
                    window[params.name] = [];
                    window[params.name].push(elements[i].value);
                } else {
                    window[params.name].push(elements[i].value);
                }
            } else {
                window[params.name] = elements[i].value;
            }
        }
        if (typeof window[params.name] === "object") {
            window[params.name].map((value, index) => {
                validationCheck(value, params, elements[index]);
            })
        } else {
            validationCheck(window[params.name], params, elements[0]);
        }
        // Creating Data object
        if (elements[0].type === "checkbox" || elements[0].type === "radio") {
            let checkedValue = [];
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].checked) {
                    checkedValue.push(elements[i].value);
                }
            }
            Object.assign(
                data,
                {
                    [params.name]: checkedValue
                }
            );
        } else {
            Object.assign(
                data,
                {
                    [params.name]: window[params.name]
                }
            );
        }
    }
    if (validationErrors.length === 0) {
        button.disabled = false;
        console.log("Success!", validationErrors);
    } else {
        button.disabled = true;
        console.log("Error!", validationErrors);
    }
}
validator();

button.addEventListener("click", () => PostData("http://localhost/validatorjs/server.php", data, button)); // Trigger Fetch API