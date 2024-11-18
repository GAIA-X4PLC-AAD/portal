export const unique = <T>(array: Array<T>, getUniqueKey: (item: T) => string) =>
  Array.from(
    new Map(
      array.map(item => [getUniqueKey(item), item] as [string, T])
    ).values()
  )
