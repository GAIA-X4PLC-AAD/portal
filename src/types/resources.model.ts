export type Resource = {
    items: Array<{
        'properties(n)': { [key: string]: string | number | string[] };
    }>;
}
