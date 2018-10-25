const {Request} = require('tedious');

/**
 * Database
 */
class Database {
  /**
   * Creates a new instance of Database.
   * @param {*} database The database connection object.
   */
  constructor(database) {
    this.db = database;
  }

  /**
   * Queries the database for information.
   * @param {String} sql The SQL query to run.
   * @param {*} args Any arguments to be passed into the query.
   * @return {Promise} The promise
   */
  query(sql, args) {
    return new Promise((resolve, reject) => {
      const request = new Request(sql, (err, rowCount, rows) => {
        rows.forEach((row) => {
          console.log(row);
        });

        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
      this.db.execSql(request);
    });
  }
}

module.exports = Database;
