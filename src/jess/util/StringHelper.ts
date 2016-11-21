export class StringHelper {
    public static camelize(str: string): string {
        if (!str) return this.emptyString();
        return str.replace(/^([A-Z])|[\s-_](\w)/g, function(letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }
    public static capitalize(str: string): string {
        if (!str) return this.emptyString();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    public static emptyString(): string {
        return '';
    }
}