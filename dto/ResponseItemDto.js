module.exports = class ResponseItemDto {
  constructor(url, threshold = 0, alerted = false) {
    this.url = url;
    this.threshold = threshold;
    this.alerted = alerted;
  }
};
