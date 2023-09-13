/**
 * 返回窗口宽高
 */
export const getWindow = () => {
	let width = document.documentElement.clientWidth || document.body.clientWidth;
	let height = document.documentElement.clientHeight || document.body.clientHeight;
	return { width, height };
};
/**
 * 下载文件流
 * @param blob 二进制流
 * @param filename 文件名(默认系统时间戳)
 */
export const download = (blob: Blob, filename?: string): void => {
	const blobURL = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = blobURL;
	a.download = filename || +new Date() + '';
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.URL.revokeObjectURL(blobURL);
};
/**
 * 统计字数
 * @param string textContent
 */
export const countWord = (data: string) => {
	const m = data.match(
		/[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff\u0400-\u04ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g
	);
	let count = 0;
	if (!m) {
		return 0;
	}
	for (let i = 0; i < m.length; i += 1) {
		if (m[i].charCodeAt(0) >= 0x4e00) {
			count += m[i].length;
		} else {
			count += 1;
		}
	}
	return count;
};
/**
 * 格式化日期
 * @param date Date | string
 * @param d any
 * @param fmt string
 */
export function formatDate(d: any, fmt = 'yyyy-MM-dd hh:mm:ss') {
	if (!(d instanceof Date)) {
		d = new Date(d);
	}
	const o: any = {
		'M+': d.getMonth() + 1, // 月份
		'd+': d.getDate(), // 日
		'h+': d.getHours(), // 小时
		'm+': d.getMinutes(), // 分
		's+': d.getSeconds(), // 秒
		'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
		S: d.getMilliseconds(), // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, `${d.getFullYear()}`.substr(4 - RegExp.$1.length));
	}
	// eslint-disable-next-line no-restricted-syntax
	for (const k in o) {
		if (new RegExp(`(${k})`).test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
			);
	}
	return fmt;
}
/**
 * 获取时间，超过一周则返回 `yyyy-MM-dd`
 * @param date Date | string
 */
export const formatShowDate = (date: Date | string) => {
	const source = date ? +new Date(date) : +new Date();
	const now = +new Date();
	const diff = now - source;
	const oneSeconds = 1000;
	const oneMinute = oneSeconds * 60;
	const oneHour = oneMinute * 60;
	const oneDay = oneHour * 24;
	const oneWeek = oneDay * 7;
	if (diff < oneMinute) {
		return `${Math.floor(diff / oneSeconds)}秒前`;
	}
	if (diff < oneHour) {
		return `${Math.floor(diff / oneMinute)}分钟前`;
	}
	if (diff < oneDay) {
		return `${Math.floor(diff / oneHour)}小时前`;
	}
	if (diff < oneWeek) {
		return `${Math.floor(diff / oneDay)}天前`;
	}
	return formatDate(date, 'yyyy-MM-dd');
};
export * from './storage';
