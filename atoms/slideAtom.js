import { atom } from 'recoil'

export const slideBar = atom ({
	key:'slideBar',
	default: false
})

export const settingsState = atom ({
	key: 'settingsState',
	default:false
})
export const micState = atom ({
	key: 'micState',
	default: false
})