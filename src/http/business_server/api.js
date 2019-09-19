import extendsApi from './extendsApi'

class AllServiceApi extends extendsApi {
  constructor() {
    super()
  }
  //添加商会
  addBusiness(params) {
    return this.sendPost('/Api/City/addBusiness', params);
  }
  
}

export default new AllServiceApi()