const host = window.location.host;
let baseUrl = "https://test.newcoc.cn";
if (/ct.newcoc.cn/g.test(host)) {
  baseUrl = "https://www.newcoc.cn";
}
export default {
  baseUrl,
}