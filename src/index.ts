import { debounce } from "./lib/debounce";
import { validateURLFormat } from "./lib/url";
import { getURLInfo } from "./services/url-info-service";

const bindURLValidation = () => {
    const validationLabel = document.getElementById('url-validation-msg');
    const urlInput = document.getElementById('url') as HTMLInputElement;

    const API_FETCH_DEBOUNCE_INTERVAL = 500; // milliseconds

    const debouncedGetURLInfo = debounce(async (url: string) => {
        try {
            const getURLInfoResponse = await getURLInfo(urlInput.value);
            // user could have changed the url, but the fetch might be delayed due to async nature of the call.
            // so let's check if the current value is still same as what was in the input box when this fetch was made.
            if (url == urlInput.value)
                validationLabel.innerText = `API call success. Response ${JSON.stringify(getURLInfoResponse)}`;
        } catch (err) {
            validationLabel.innerText = `API call failed.`;
        }
    }, API_FETCH_DEBOUNCE_INTERVAL);

    // validates URL format locally first and then invokes GetURL API if OK
    const onURLInput = () => {
        const result = validateURLFormat(urlInput.value);
        if (result) {
            validationLabel.innerText = 'Loading...';
            debouncedGetURLInfo(urlInput.value);
        } else {
            validationLabel.innerText = 'Incorrect URL format';
        }
    };

    urlInput.addEventListener('input', onURLInput);
}

document.addEventListener('DOMContentLoaded', bindURLValidation);