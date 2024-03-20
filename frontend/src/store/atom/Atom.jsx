
import { useEffect } from 'react'
import { atom } from 'recoil'



export const renderAtom = atom({
  key: "renderAtom",
  default: false
})

export const userDataAtom = atom({
  key: "userDataAtom",
  default: ''
})

export const userAtom = atom({
  key: "userAtom",
  default: [],
})