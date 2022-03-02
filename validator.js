import { tooltip, validationCheck } from './validatingFunctions.js';

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
            elements[i].addEventListener('keyup', validator); // Trigger Validator on Keyup
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
        }else{
            validationCheck(window[params.name], params, elements[0]);
        }
    }
}
validator();