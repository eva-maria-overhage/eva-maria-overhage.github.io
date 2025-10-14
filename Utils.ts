export const applyMultipleClasses = (...classes: string[]): string => {
    return classes.filter((name) => name.length !== 0).join(" ");
}