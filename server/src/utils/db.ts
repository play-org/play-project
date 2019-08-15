import mysql from 'mysql';
let conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'play_project',
});
conn.connect();

export default class DB {
  // function
}
export function query(str: string) {
  return new Promise(function(resolve, reject) {
    conn.query(str, function(err, res, rows) {
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
