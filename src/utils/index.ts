export const use =
	<A extends any[]>(...stuff: A) => ({
		as: <R>(f:(...stuff: A) => R) => f(...stuff)
	})

export const isDev =
	() => process.env.NODE_ENV === "development";

export const fromKeyValues = <A extends any[]>(keys: string[], values: A) =>
	keys.reduce((object, key, i) => {
		object[key] = values[i]
		return object;
	}, {} as Record<string, A[number]>);

export const isNotNull = <T>(x: T): x is Exclude<T, null> => x !== null