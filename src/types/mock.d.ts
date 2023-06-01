// export interface RootObject {
//   capacity: Capacity;
//   core: Core;
//   dbalert: Core;
//   degradation: Core;
//   fd: Core;
//   middleware: Core;
//   monitor: Core;
//   network: Core;
//   prd_line: string;
//   依赖异常: Core;
// }

// export interface Core {
//   done: number;
//   donging: number;
//   not_start: number;
//   overdue: number;
//   total: number;
//   type: string;
// }

// export interface Capacity {
//   done: number;
//   donging: number;
//   not_start: number;
//   overdue: number;
//   total: number;
//   type: Type;
// }

// export interface Type {
//   capacity: string[];
// }


//=====dataTwo类型

export interface riskObject {
  data: riskDatum[];
}

export interface riskDatum {
  capacity: {
    done: Done;
    donging: Done;
    not_start: Done;
    overdue: Done;
    total: number;
    type: {
      capacity: string[];
    };
  };//容量风险
  core: Core;//coredump风险
  dbalert: Core;//数据库风险
  degradation: Core;//性能退化风险
  fd: Core;//文件描述符风险
  middleware: Core;//中间件风险
  monitor: Core;//监控缺失风险
  network: Core;//网络连接数风险
  prd_line: string;//业务
  依赖异常: Core;
}

export interface Core {
  done: Done;//已完成
  donging: Done;//进行中
  not_start: Done;//未开始
  overdue: Done;//逾期
  total: number;//总数
  type: string;//类型
}

export interface Done {
  height: number;//高
  middle: number;//中
  low: number;//低
  total: number;//总数
}

//饼图--
export interface pieDataType {
  value:number,
  name:string 
}

