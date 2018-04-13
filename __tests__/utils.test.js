const { resolvePath } = require('../dist/utils')

describe('Utils', () => {

	test('resolvePath', () => {
		
		const obj = {
			str_check: "hello",
			arr_check: [
				0, 1, 2, 3, {
					obj_arr: "hi!"
				}
			],
			nest_check: {
				str_check: "nested hello",
				str_check2: "nested hello 2",
				arr_check: [
					"a", "b", "c", {
						obj_arr: "hi!",
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
					expect(
						resolvePath(obj, path)
					).toEqual(objToTest)
				}

			} else if ( typeof objToTest === "object" ) {

				Object.keys(objToTest).forEach(k => {
					const newpath = path ? path + "." + k : k
					testObj( objToTest[k], newpath )
				})

				// Is not the first call
				if ( path !== "" ) {
					expect(
						resolvePath(obj, path)
					).toEqual(objToTest)
				}

			} else {

				expect(
					resolvePath(obj, path)
				).toBe(objToTest)
			
			}
		
		}

		testObj(obj)

	})

})