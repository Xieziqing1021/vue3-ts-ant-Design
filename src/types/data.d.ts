//接口返回数据基础结构
export interface ApiRes<T> {
  code: string;
  msg: string;
  result: T;
}

export interface Result {
  id: string;
  name: string;
  picture: string;
  children: Child[];
  goods: Good[];
}

export interface Good {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum?: any;
}

export interface Child {
  id: string;
  name: string;
  picture: string;
  children?: any;
  goods?: any;
}

export interface IRuleGroupCreateForm {
  link: {
    name: string
    value: string
  }[]
}

//新鲜好物
export interface newResult {
  highlys?: any;
  newProduct: NewProduct[];
  preSales: any[];
}

export interface NewProduct {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}
//商品详情

export interface IgoodDetail {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: number;
  inventory: number;
  brand: Brand;
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: any[];
  videoScale: number;
  mainPictures: string[];
  specs: Spec[];
  skus: Skus[];
  categories: Category[];
  details: Details;
  isPreSale: boolean;
  isCollect?: any;
  recommends?: any;
  userAddresses?: any;
  similarProducts: SimilarProduct[];
  hotByDay: SimilarProduct[];
  evaluationInfo?: any;
}

export interface SimilarProduct {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}

export interface Details {
  pictures: string[];
  properties: Property[];
}

export interface Property {
  name: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  layer: number;
  parent?: Parent;
}

export interface Parent {
  id: string;
  name: string;
  layer: number;
  parent?: any;
}

export interface Skus {
  id: string;
  skuCode: string;
  price: string;
  oldPrice: string;
  inventory: number;
  specs: Spec2[];
}

export interface Spec2 {
  name: string;
  valueName: string;
}

export interface Spec {
  name: string;
  id: string;
  values: Value[];
}

export interface Value {
  name: string;
  picture: string;
  desc: string;
}

export interface Brand {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type?: any;
  desc?: any;
  place?: any;
}