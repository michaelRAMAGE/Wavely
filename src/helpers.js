/**
 * @description Test an object for top-level nulls 
 * @param {Object} obj 
 * @param {Array} should_be_excluded - exclude a key from test
 * @returns {Boolean} 
 */
export const objHasNullValue = (obj, should_be_excluded) => {
    return Object.keys(obj)
                .some(key => 
                    ((obj[key]===null && !should_be_excluded.includes(key)) 
                    || 
                    obj[key]?.length===0)); 
}

/**
 * @description Calls Data.prototype.DATETIME (user-defined) method
 */
export function DATETIME() {
    return new Date().DATETIME();
}

/**
 * @description Overridden Date object
 * @returns {DATETIME} 
 */
Date.prototype.DATETIME = function() { 
    return (
        this.getFullYear() +
        '/' + ((this.getMonth()+1)<10?'0':'') + (this.getMonth()+1)  +
        '/' + ((this.getDate())<10?'0':'') + (this.getMonth()) +
        ' ' + ((this.getHours())<10?'0':'') + (this.getHours()) +
        ':' + ((this.getMinutes())<10?'0':'') + (this.getMinutes()) +
        ':' + ((this.getSeconds())<10?'0':'')+(this.getSeconds())
    );
};
