import { atom } from 'recoil'

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