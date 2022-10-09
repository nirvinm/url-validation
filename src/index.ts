import { debounce } from "./lib/debounce";
import { validateURLFormat } from "./lib/url";
import { withRetry } from "./lib/async-helpers";
import { getURLInfo } from "./services/url-info-service";
import './index.css';

const bindURLValidation = () => {
    const validationLabel = document.getElementById('url-validation-msg');
    const urlInput = document.getElementById('url') as HTMLInputElement;

    const API_FETCH_DEBOUNCE_INTERVAL = 500; // milliseconds
    const API_FETCH_RETRY_ATTEMPTS = 2;

    let controller: AbortController;
    const debouncedGetURLInfo = debounce(async (url: string) => {
        controller?.abort(); // let's cancel any ongoing retries (if any) triggered for the previous inputs
        controller = new AbortController();
        try {
            const getURLInfoWithRetry = withRetry(getURLInfo, API_FETCH_RETRY_ATTEMPTS, controller.signal);
            const getURLInfoResponse = await getURLInfoWithRetry(urlInput.value);
            // user could have changed the url, but the fetch might be delayed due to async nature of the call.
            // so let's check if the current value is still same as what was in the input box when this fetch was made.
            if (url == urlInput.value) {
                validationLabel.innerHTML =
                    getURLInfoResponse.data != null
                        ? `API call success. Server response is <pre>${JSON.stringify(getURLInfoResponse)}</pre>`
                        : `<strong><small>${url}</small></strong> does not exist. Server response is <pre>${JSON.stringify(getURLInfoResponse)}</pre>`;
            }
        } catch (err) {
            if (err.message !== 'AbortError') {
                validationLabel.innerHTML = `Could not connect to connect to server to get information about <strong><small>${url}</small><strong> <pre>${err}</pre>`;
            }
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