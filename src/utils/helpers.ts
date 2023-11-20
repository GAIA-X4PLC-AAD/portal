export const isEmpty = (value: string | undefined) => {
  return (value == null || (value.trim().length === 0));
}
