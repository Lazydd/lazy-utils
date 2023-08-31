/**
 * 获取cookie
 * @param key 键
 */
export const getCookie = (key: string) => {
	const data = document.cookie;
	let startIndex = data.indexOf(key + '=');
	if (startIndex > -1) {
		startIndex = startIndex + key.length + 1;
		let endIndex = data.indexOf(';', startIndex);
		endIndex = endIndex < 0 ? data.length : endIndex;
		return decodeURIComponent(data.substring(startIndex, endIndex));
	} else {
		return '';
	}
};
/**
 * 设置cookie
 * @param key 键
 * @param value 值
 * @param time 有效时间
 */
export const setCookie = (key: string, value: any, time?: any) => {
	const times = time;
	const cur = new Date();
	cur.setTime(cur.getTime() + times * 24 * 3600 * 1000);
	document.cookie =
		key +
		'=' +
		encodeURIComponent(value) +
		';expires=' +
		(times === undefined ? '' : cur.toUTCString());
};
/**
 * 删除cookie
 * @param key 键
 */
export const delCookie = (key: string) => {
	const data = getCookie(key);
	if ((data as any) !== false) {
		setCookie(key, data, -1);
	}
};
/**
 * 获取localStorag
 * @param key 键
 */
export const getStorage = (key: string) => {
	return localStorage.getItem(key);
};
/**
 * 设置localStorage
 * @param key 键
 * @param value 值
 */
export const setStorage = (key: string, value: any) => {
	return localStorage.setItem(key, value);
};
/**
 * 删除localStorage
 * @param key 键
 */
export const delStorage = (key: string) => {
	localStorage.removeItem(key);
};
