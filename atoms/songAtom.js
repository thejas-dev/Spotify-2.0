import { atom } from 'recoil'


export const currentTrackIdState = atom({
	key:"currentTrackIdState",//unique Id
	default:null,	//null to tell that no tracks are playing
})

export const isPlayingState = atom({
	key:"isPlayingState",//unique Id
	default: false
})