export interface Iterator {
    /**
     * Moves the internal cursor forward one.
     */
    next(): void;
    /**
     * Moves the internal cursor back one.
     */
    prev():void;
    /**
     * Checks if the internal array has the next element
     * @return {boolean} : true or false
     */
    hasNext():boolean;
    /**
     * Checks if the internal array has a valid element in the current position of the cursor.
     * @return {boolean} : true or false
     */
    valid():boolean;
    /**
     * Returns the current cursor value.
     * @return {number} : The current cursor value.
     */
    key():number;
    /**
     * Sets the internal cursor value to zero.
     */
    rewind():void;
}