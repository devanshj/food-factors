import { useEffect } from "react";

export const use =
	<A extends any[]>(...stuff: A) => ({
		as: <R>(f:(...stuff: A) => R) => f(...stuff)
	})

export const isDev =
	() => process.env.NODE_ENV === "development";

export const useWindowEvent = <E extends keyof WindowEventMap>(
	event: E,
	listener: (event: WindowEventMap[E]) => void,
	deps?: any[]
) => {
	useEffect(() => {
		window.addEventListener(event, listener);
		return () => window.removeEventListener(event, listener);
	}, deps);
}

export const isNotNull = <T>(x: T): x is Exclude<T, null> => x !== null