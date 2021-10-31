import { atom, useRecoilState } from 'recoil'

const editTaskState = atom({
  key: 'editTaskState',
  default: { id: 0, title: '' },
})
export const useEditedTask = () => {
  const [editedTask, setEditedTask] = useRecoilState(editTaskState)
  return { editedTask, setEditedTask }
}
