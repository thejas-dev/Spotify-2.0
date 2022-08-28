import { atom } from 'recoil'

export const playlistsState = atom({
	key:'playlistsState',
	default: []
})
export const playlistIdState = atom ({
	key:'playlistIdState',
	default: null
})

export const playlistUri = atom ({
	key:'playlistUri',
	default: null,
})

export const playlistState = atom({
	key:'playlistState',
	default: null,
})

export const categoriesState = atom ({
	key:'categoriesState',
	default:'null',
})

export const saveState = atom({
	key:'saveState',
	default: 'null'
})