import { atom } from 'recoil'


export const userDataAtom = atom({
  key: "userDataAtom",
  default: ''
})

export const userAtom = atom({
  key: "userAtom",
  default: [],
})