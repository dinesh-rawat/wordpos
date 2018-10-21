/**
 * browser/baseFile.js
 *
 * Copyright (c) 2012-2019 mooster@42at.com
 * https://github.com/moos/wordpos
 *
 * Released under MIT license
 */

class BaseFile {

  /**
   * file contents - in browser it's just a string & not a file!
   * @type {Object}
   */
  file = {};

  constructor(type, dictPath, posName) {
    this.type = type;
    this.filePath = `${dictPath}/${type}.${posName}.js`;
    this.loadError = null;
  }

  load() {
    if (this.loadError) return Promise.reject(this.loadError);
    return import(this.filePath)
      .then(exports => this.file = exports.default)
      .catch(err => {
        console.error(`Error loading "${this.type}" file ${this.filePath}.`, err);
        this.loadError = err;
        throw err;
      });
  }

  ready(fn, args) {
    return this.load().then(() => fn.apply(this, args));
  }
}

export default BaseFile;