export class AppHelper {
  static checkArrString = (errMess: any) => {
    if (
      Array.isArray(errMess) &&
      errMess.every((err) => typeof err === 'string')
    ) {
      return true;
    }
    return false;
  };
  static messageErrPasser = (errMess: string[]) => {
    const result = [];
    errMess.forEach((err) => {
      const splitedErr = err.split(' ');
      result.push({
        fieldName: splitedErr[0],
        message: (splitedErr.slice(1, splitedErr.length) || []).join(' '),
      });
    });
    return result
  };
}
