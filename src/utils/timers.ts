/**
 * Delays the execution of a given function with a given timeout.
 *
 * @param asyncFunction the function to be executed.
 * @param timeout how many milliseconds to wait until the execution.
 * @returns the promise returned by the asyncFunction passed in as parameter.
 * @throws the error thrown by the asyncFunction passed in as parameter.
 */
export const delay = <T>(asyncFunction: () => Promise<T>, timeout: number): Promise<T> => {
  return new Promise<T>((resolve, reject) => setTimeout(() => {
    asyncFunction()
      .then(result => resolve(result))
      .catch(error => reject(error))
  }, timeout))
}
