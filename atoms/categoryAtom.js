import { atom } from 'recoil'

export const categoryState = atom({
	key:'categoryState',
	default:false,
})

export const songState = atom({
	key:'songState',
	default:[]
})
export const songState2 = atom({
	key:'songState2',
	default:[]
})

export const typeState = atom({
	key:'typeState',
	default:'loading'
})

export const categoryImageState = atom({
	key:'categoryImageState',
	default:false
})