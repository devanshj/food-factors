export const use =
	<A extends any[]>(...stuff: A) => ({
		as: <R>(f:(...stuff: A) => R) => f(...stuff)
	})

export const isDev =
	() => process.env.NODE_ENV === "development";

export const isNotNull = <T>(x: T): x is Exclude<T, null> => x !== null