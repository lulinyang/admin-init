const host = window.location.host;
let ueBaseUrl = 'http://ueditor.up.com/';
let baseUrl = '';
if (/127.0.0.1/g.test(host) || /localhost/g.test(host) || /www.zupu.com/g.test(host)) {
  baseUrl = 'http://api.com';
  ueBaseUrl = 'http://ueditor.up.com/';
} else {
  baseUrl = 'http://api.lyang.top';
  ueBaseUrl = 'http://admin.lyang.top/';
}

export default {
    baseUrl,
    ueBaseUrl
}