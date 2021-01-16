export const getCookie = (name: string) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (cookie:  string) => {
    const cookie_date = new Date();
    cookie_date.setTime(cookie_date.getTime() - 1);
    document.cookie = cookie += "=; expires=" + cookie_date.toUTCString();
};
