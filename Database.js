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
   * @param {Boolean} isSingleton True if this query should return one datapoint
   * @return {Promise} The promise
   */
  query(sql, args, isSingleton) {
    return new Promise((resolve, reject) => {
      const request = new Request(sql, (err, rowCount, rows) => {
        if (err) {
          reject(err);
        } else {
          const objs = this.mapRowsToObj(rows);
          if (typeof(isSingleton) != 'undefined' && isSingleton !== null
            && isSingleton) {
            resolve(objs[0]);
          } else {
            resolve(objs);
          }
        }
      });
      this.db.execSql(request);
    });
  }

  /**
   * Queries the database and returns a promise for one row.
   * @param {String} sql The SQL statement.
   * @param {Object} args The arguments to pass into the statement.
   * @return {Promise}
   */
  queryOne(sql, args) {
    return this.query(sql, args, true);
  }

  /**
   * Queries the database and returns a promise for many rows.
   * @param {String} sql The SQL statement.
   * @param {Object} args The arguments to pass into the statement.
   * @return {Promise}
   */
  queryMany(sql, args) {
    return this.query(sql, args, false);
  }

  /**
   * Converts returned database rows into an object that can be parsed.
   * @param {Array} rows The database rows.
   * @return {Array} An object containing all database rows.
   */
  mapRowsToObj(rows) {
    const objs = [];
    rows.forEach((row) => {
      const obj = {};
      row.forEach((dataRow) => {
        obj[dataRow.metadata.colName] = dataRow.value;
      });
      objs.push(obj);
    });
    return objs;
  }
}

module.exports = Database;
