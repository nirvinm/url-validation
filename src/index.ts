import { debounce } from "./lib/debounce";
import { validateURLFormat } from "./lib/url";
import { withRetry } from "./lib/async-helper";
import { getURLInfo } from "./services/url-info-service";
import { config } from "./config";
import './index.css';

const bindURLValidation = () => {
    const validationLabel = document.getElementById('url-validation-msg');
    const urlInput = document.getElementById('url') as HTMLInputElement;

    let controller: AbortController;
    const debouncedGetURLInfo = debounce(async (url: string) => {
        controller?.abort(); // let's cancel any ongoing retries (if any) triggered for the previous inputs
        controller = new AbortController();
        try {
            const getURLInfoWithRetry = withRetry(getURLInfo, config.API_FETCH_RETRY_ATTEMPTS, controller.signal);
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
    }, config.API_FETCH_DEBOUNCE_INTERVAL);

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



// following code is for binding configuration inputs

const retriesInput = document.getElementById('retries') as HTMLInputElement;
retriesInput.value = config.API_FETCH_RETRY_ATTEMPTS.toString();
retriesInput.addEventListener('input', e => {
    const value = (e.target as HTMLInputElement).value;
    config.API_FETCH_RETRY_ATTEMPTS = parseInt(value);
});

const minFetchTimeInput = document.getElementById('minFetchTime') as HTMLInputElement;
minFetchTimeInput.value = config.API_FETCH_MIN_TIME_MILLISECONDS.toString();
minFetchTimeInput.addEventListener('input', e => {
    const value = (e.target as HTMLInputElement).value;
    config.API_FETCH_MIN_TIME_MILLISECONDS = parseInt(value);
});


const maxFetchTimeInput = document.getElementById('maxFetchTime') as HTMLInputElement;
maxFetchTimeInput.value = config.API_FETCH_MAX_TIME_MILLISECONDS.toString();
maxFetchTimeInput.addEventListener('input', e => {
    const value = (e.target as HTMLInputElement).value;
    config.API_FETCH_MAX_TIME_MILLISECONDS = parseInt(value);
});


