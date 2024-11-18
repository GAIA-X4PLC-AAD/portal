import { delay } from '../../src/utils/timers';

jest.useFakeTimers()

describe('delay', () => {
  it('delays the execution of a method', async () => {
    let result = ''
    delay(3000).then(() => result = 'has been executed');
    jest.advanceTimersByTime(1000);
    expect(result).toBe('');
    await jest.advanceTimersByTimeAsync(2000);
    expect(result).toBe('has been executed');
  })

  it('returns the arrow function value', async () => {
    const result = delay(100).then(async () => 'arrow function value');
    jest.advanceTimersToNextTimerAsync()
    expect(await result).toBe('arrow function value');
  })

  it('returns the arrow function value', async () => {
    const result = delay(100, async () => 'arrow function value')
    jest.advanceTimersToNextTimerAsync()
    expect(await result).toBe('arrow function value');
  })

  it('throws arrow functions exception', async () => {
    delay(100)
      .then(() => Promise.reject('some error'))
      .catch((error) => expect(error).toEqual('some error'))
    await jest.advanceTimersToNextTimerAsync()
  })

  it('throws arrow functions exception', async () => {
    delay(100, () => Promise.reject('some error'))
      .catch((error) => expect(error).toEqual('some error'))
    await jest.advanceTimersToNextTimerAsync()
  })

  it('no methods passed in', async () => {
    delay(100,)
    await jest.advanceTimersToNextTimerAsync()
  })
})
