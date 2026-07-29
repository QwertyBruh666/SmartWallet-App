export function createCookie(cookieKey: string, cookieVal: string, options?: {expires?: string, path?: string}): void {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    let settings = `path=/;expires=${date.toUTCString()}`
    if(options)
        settings = `path=${ !options.path ? "/" : options.path};expires=${!options.expires ? date.toUTCString() : options.expires}`
    document.cookie = `${cookieKey}=${cookieVal};${settings}`
}

export function getCookie(name: string): string {
    const cookies = document.cookie.replace(/;\s*/g, '&');
    const searchParams = new URLSearchParams(cookies);
    const value = searchParams.get(name);
    return value ? decodeURIComponent(value) : null;
}