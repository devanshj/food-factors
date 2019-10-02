/// <reference types="react-scripts" />

declare module "csstype" {
	interface Properties {
		[index: string]: any;
	}
}

declare const process: {
	env: { [key: string]: any }
}