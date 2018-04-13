const { resolvePath } = require('../dist/utils')

describe('Utils', () => {

	describe('resolvePath', () => {
		
		const obj = {
			str_check: "hello",
			arr_check: [
				0, 1, 2, 3, {
					obj_inside_arr: "hi!"
				}
			],
			array_inside_array: [
				[ 0, 1, 2, 3, 4, 5, 6 ]
			],
			nest_check: {
				str_check: "nested hello",
				str_check2: "nested hello 2",
				arr_check: [
					"a", "b", "c", {
						obj_inside_arr: "hi!",
						another_array: [
							20, 30, "ciao"
						]
					}
				],
			}
		}

		/**
		 * Testing recursively all the possible paths inside the object
		 * @param objectToTest: object|array
		 * @param path: string -> accumulator
		 * testObj(obj)
		 */

		function testObj(objToTest, path = "") {

			//console.log('testing:', path || "__initial__" )

			if ( Array.isArray(objToTest) ) {

				objToTest.forEach((v,i) => {
					const newpath = path ? path + "[" + i + "]" : "[" + i + "]"
					testObj(v, newpath)
				})

				// Is not the first call
				if ( path !== "" ) {
					it(path, () => {
						expect(
							resolvePath(obj, path)
						).toEqual(objToTest)
					})
				}

			} else if ( typeof objToTest === "object" ) {

				Object.keys(objToTest).forEach(k => {
					const newpath = path ? path + "." + k : k
					testObj( objToTest[k], newpath )
				})

				// Is not the first call
				if ( path !== "" ) {
					it(path, () => {
						expect(
							resolvePath(obj, path)
						).toEqual(objToTest)
					})
				}

			} else {
				it(path, () => {
					expect(
						resolvePath(obj, path)
					).toEqual(objToTest)
				})
			}
		
		}

		testObj(obj)

	})

})