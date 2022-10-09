const logText = <HTMLInputElement>document.getElementById('log');

export function log(s: string) {
    const msg = `${new Date().toLocaleString()}  ${s}\n`;
    if (logText != null)
        logText.value = msg + logText.value;
    console.log(msg);
}