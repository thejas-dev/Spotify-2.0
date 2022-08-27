import { atom } from 'recoil'

export const searchState = atom({
	key:'searchState',
	default:null
})

export const searchResultState = atom({
	key:'searchResultState',
	default:null
})