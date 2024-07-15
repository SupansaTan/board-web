export function getEnumEntries<T extends object>(enumObj: T): [key: string, value: number][] {
  return Object.entries(enumObj)
    .filter(([key, value]) => typeof value === 'number') as [string, number][];
}