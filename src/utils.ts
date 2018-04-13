export const isUndefined = x => typeof x === "undefined"
export const isNull 	 = x => x === null
export const isInvalid 	 = x => isNull(x) || isUndefined(x)

export const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop) 

export function resolvePath(obj, path) {

	if ( path === "" ) {
		return obj
	}

	if ( arguments.length !== 2 ) {
		throw new Error("resolvePath accepts only 2 arguments ( obj:{}|[], path:string )")
	}

	if ( typeof path !== "string" ) {
		throw new Error("resolvePath: path argument should be a string")
	}

    if ( isInvalid(path) || isInvalid(obj) ) {
        return undefined
    }

    // Transforming array syntax in dot notation
    // array[3] -> array.$3
    const clean = path.replace(/\[/g, ".$").replace(/\]/g, "")

    return clean.split(".").reduce((sum, curr) => {

        if ( isInvalid(sum) || isInvalid(curr) ) {
            return sum
        }
    
        if ( curr[0] === "$" && Array.isArray(sum) ) {
        
            const index = parseInt(curr.substr(1))

            if ( ! isInvalid(sum[index]) )
            	return sum[index]
            else
            	return sum[curr] 
        
        } else {

            return sum[curr]

        }
    
    }, obj)
}