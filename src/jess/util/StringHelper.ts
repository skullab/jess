export class StringHelper {
    public static camelize(str: string): string {
        if (!str) return this.emptyString();
        /*return str.replace(/^([A-Z])|[\s-_](\w)/g, function(letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');*/

        return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
            if (p2) return p2.toUpperCase();
            return p1.toLowerCase();
        });
    }
	public static uncamelize(str: string, separator: string = '_'): string {
		str = str.replace(/[A-Z]/g, function(letter) {
			return separator + letter.toLowerCase();
		});
		return str.replace(new RegExp("^" + separator), '');
	}
    public static capitalize(str: string): string {
        if (!str) return this.emptyString();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    public static uncapitalize(str: string): string {
        if (!str) return this.emptyString();
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
    public static emptyString(): string {
        return '';
    }
}