import mysql from 'mysql';
import path from 'path';
import * as config from './config';
const serverConfig = config.load(path.resolve(__dirname, '../../../var/server.config.json'));
const options = Object.assign(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mysql',
    connectionLimit: 10,
  },
  serverConfig['mysql']
);
console.log(options);

const pool = mysql.createPool(options);

class DB {
  tb: string;
  sqlObj: Record<string, any>;
  constructor() {
    this.tb = '';
    this.sqlObj = {};
  }
  table(table: string) {
    this.sqlObj = {};
    this.tb = table;
    return this;
  }
  // 搜索
  /**
   * where
   * @param data 数据
   */
  where(data: Record<string, any>) {
    if (data) {
      const arrWhere = pool.escape(data).split(',');
      const strWhere = arrWhere.join(' and ');
      if (this.sqlObj.where) {
        this.sqlObj.where += ` and ${strWhere}`;
      } else {
        this.sqlObj.where = strWhere;
      }
    }
    return this;
  }
  // or_where
  or_where(data: Record<string, any>) {
    if (data) {
      const arrWhere = pool.escape(data).split(',');
      const strWhere = arrWhere.join(' or ');
      if (this.sqlObj.where) {
        this.sqlObj.where += ` or ${strWhere}`;
      } else {
        this.sqlObj.where = strWhere;
      }
    }
    return this;
  }
  // where_in
  where_in(field: string, data: any[]) {
    this._where_in_common(field, data);
    return this;
  }
  // or_where_in
  or_where_in(field: string, data: any[]) {
    this._where_in_common(field, data, 'or');
    return this;
  }
  // where_not_in
  where_not_in(field: string, data: any[]) {
    this._where_in_common(field, data, 'and', 'not');
    return this;
  }
  // or_where_not_in
  or_where_not_in(field: string, data: any[]) {
    this._where_in_common(field, data, 'or', 'not');
    return this;
  }
  // 模糊搜索
  // like
  like(field: string | Record<string, any>, str?: string) {
    this._like_common(field, str);
    return this;
  }
  // or_like
  or_like(field: string | Record<string, any>, str?: string) {
    this._like_common(field, str, 'or');
    return this;
  }
  // not_like
  not_like(field: string | Record<string, any>, str?: string) {
    this._like_common(field, str, 'and', 'not');
    return this;
  }
  // or_not_like
  or_not_like(field: string | Record<string, any>, str?: string) {
    this._like_common(field, str, 'or', 'not');
    return this;
  }
  // group by
  group_by(data: string | string[]) {
    this.sqlObj.groupBy = pool.escape(data);
    return this;
  }
  // having
  having(data: string[]) {
    const strHaving = pool.escape(data).replace(',', 'and');
    if (this.sqlObj.strHaving) {
      this.sqlObj.strHaving += `and ${strHaving}`;
    } else {
      this.sqlObj.strHaving = strHaving;
    }
    return this;
  }
  // or_having
  or_having(data: string[]) {
    const strHaving = pool.escape(data).replace(',', 'or');
    if (this.sqlObj.strHaving) {
      this.sqlObj.strHaving += `or ${strHaving}`;
    } else {
      this.sqlObj.strHaving = strHaving;
    }
    return this;
  }
  /**
   * limit查询
   * @param num 条数
   * @param offset 便宜量
   */
  limit(num: number, offset?: number) {
    this.sqlObj.limit = offset ? ` limit ${offset},${num}` : ` limit ${num}`;
    return this;
  }
  page(pageNo: number, pageSize: number) {
    return this.limit(pageSize, (pageNo - 1) * pageSize);
  }
  /**
   * 查询记录总数
   * @param isClear 是否清楚缓存，默认true
   */
  async count_all_results(isClear: boolean = true) {
    const sql = this._addExtra(`select count(*) as total from ${this.tb}`);
    // 清除缓存
    isClear && this._clearSqlObj();
    const res = (await this.query(sql)) as Array<Record<string, any>>;
    return res[0]['total'];
  }
  /**
   * 排序
   * @param field 字段
   * @param order 排序方式
   */
  order_by(field: string, order: string) {
    if (this.sqlObj.orderBy) {
      this.sqlObj.orderBy += `, ${field} ${order}`;
    } else {
      this.sqlObj.orderBy = `order by ${field} ${order}`;
    }
    return this;
  }

  /**
   * 查询字段
   * @param fields 字段
   */
  select(fields?: string[]) {
    const keys = fields || ['*'];

    const sql = this._addExtra(`select ${keys.join(',')} from ${this.tb}`);
    console.log(sql);
    // 清除缓存
    this._clearSqlObj();
    return this.query(sql);
  }
  /**
   * 插入
   * @param data 数据
   */
  insert(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = pool.escape([Object.values(data)]);

    const sql = `insert into ${this.tb} (${keys.join(',')}) values ${values}`;
    this._clearSqlObj();
    return this.query(sql);
  }
  /**
   * 批量插入
   * @param data 数据
   */
  insert_batch(data: Array<Record<string, any>>) {
    const keys = Object.keys(data[0]);
    const values = data
      .map(item => {
        return pool.escape([Object.values(item)]);
      })
      .join(',');

    const sql = `insert into ${this.tb} (${keys.join(',')}) values ${values}`;
    this._clearSqlObj();
    return this.query(sql);
  }
  /**
   * 更新
   * @param data 数据
   */
  update(data: Record<string, any>) {
    const strUpdate = pool.escape(data);
    const sql = this._addExtra(`update ${this.tb} set ${strUpdate}`);
    this._clearSqlObj();
    return this.query(sql);
  }
  /**
   * 删除操作
   */
  delete() {
    const sql = this._addExtra(`delete from ${this.tb}`);

    this._clearSqlObj();
    return this.query(sql);
  }
  /**
   * 查询方法
   * @param sql string
   */
  query(sql: string): Promise<any[]> {
    return new Promise(function(resolve, reject) {
      pool.query(sql, function(err, res, rows) {
        if (err) {
          // 异步处理
          reject(err);
        } else {
          // 查询成功，处理数据
          resolve(res);
        }
      });
    });
  }
  /**
   * 拼接sql其他子句
   * @param str string
   */
  private _addExtra(str: string) {
    const sqlObj = this.sqlObj;
    if (sqlObj.where) {
      str += ` where ${sqlObj.where}`;
    }
    if (sqlObj.orderBy) {
      str += ` ${sqlObj.orderBy}`;
    }
    if (sqlObj.groupBy) {
      str += ` group by ${sqlObj.groupBy}`;
    }
    if (sqlObj.having) {
      str += sqlObj.having;
    }
    if (sqlObj.limit) {
      str += sqlObj.limit;
    }
    return str;
  }
  // 清除sqlObj缓存
  private _clearSqlObj() {
    this.sqlObj = {};
  }
  // like common
  private _like_common(
    field: string | Record<string, any>,
    str?: string,
    logical: 'and' | 'or' = 'and',
    whether: '' | 'not' = ''
  ) {
    let strWhere;
    if (typeof field === 'string' && str) {
      strWhere = `${field} ${whether} like ${pool.escape(str)}`;
    } else {
      const data = field;
      const arrWhere = pool
        .escape(data)
        .split(',')
        .map(item => {
          return item.replace('=', 'like');
        });
      strWhere = arrWhere.join(` ${logical} `);
    }
    if (this.sqlObj.where) {
      this.sqlObj.where += ` ${logical} ${strWhere}`;
    } else {
      this.sqlObj.where = strWhere;
    }
  }
  private _where_in_common(
    field: string,
    data: any[],
    logical: 'and' | 'or' = 'and',
    whether: '' | 'not' = ''
  ) {
    if (data) {
      const strWhere = `${field} ${whether} in ${pool.escape([data])}`;
      if (this.sqlObj.where) {
        this.sqlObj.where += ` ${logical} ${strWhere}`;
      } else {
        this.sqlObj.where = strWhere;
      }
    }
  }
}
export default new DB();
