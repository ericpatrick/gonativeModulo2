export default class Helpers {
  static appName = 'desafioModulo2';

  static getStorageKey(key) {
    return `@${Helpers.appName}:${key}`;
  }
}
