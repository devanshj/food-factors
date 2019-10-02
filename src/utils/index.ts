export const use =
	<A extends any[], R>(...stuff: A) => ({
		as: (f: (...stuff: A) => R) => f(...stuff)
	})

export const isDev =
	() => process.env.NODE_ENV === "development";