export const getWindow = () => {
	// 返回窗口宽高
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

export * from './storage';
