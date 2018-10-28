const {Connection, Request, TYPES} = require('tedious');

/**
 * Database
 */
class Database {
  /**
   * Creates a new instance of Database.
   * @param {Object} config The database connection object.
   */
  constructor(config) {

    this.db = new Connection(config);
    this.queue = [];
    this.processing = false;

  }

  /**
   * Process the next request in the queue.
   */
  processQueue() {

    if (!this.processing && this.queue.length > 0) {

      this.processing = true;
      this.db.execSql(this.queue.shift());

    }

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

      // construct the request
      const request = new Request(sql, (err, _, rows) => {

        if (err) {

          reject(err);

        } else {

          // map the raw rows into an object that graphql can understand
          const objs = this.mapRowsToObj(rows);
          console.log(objs);
          if (request.isSingleton) {

            resolve(objs[0]);

          } else {

            resolve(objs);

          }

        }

      });

      this.queue.push(request);
      request.isSingleton = isSingleton;

      // apply arguments to the request
      if (args) {

        for (const key in args) {

          if (args.hasOwnProperty(key)) {

            const value = args[key];
            let type = null;

            switch (typeof(value)) {

              case 'number':
                type = TYPES.Int;
                break;

              case 'boolean':
                type = TYPES.Boolean;
                break;

              case 'string':
                type = TYPES.VarChar;
                break;

            }

            if (!type) {

              console.warn(`WARNING: cannot determine type of argument '${key}'`
              + ` with value ${value}, while processing '${sql}', skipping`);
              continue;

            }

            request.addParameter(key, type, value);

          }

        }

      }

      request.on('requestCompleted', () => {

        this.processing = false;
        this.processQueue();

      });


      // execute the request
      this.queue.push(request);
      this.processQueue();

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

  /**
   * Takes a callback that is executed when the database is ready to receive
   * commands.
   * @param {Function} callback The function to be called when the database is
   * ready.
   * @return {Database} Returns this instance for chaining.
   */
  ready(callback) {

    this.db.on('connect', callback);
    return this;

  }

  /**
   * Closes the database connection.
   */
  close() {

    this.db.close();

  }

}

module.exports = Database;
