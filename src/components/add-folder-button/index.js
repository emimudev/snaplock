import services from '@/services'
import { FOLDERS_API_URL } from '@/services/foldersAPI'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RiFolderAddFill } from 'react-icons/ri'
import useSWRMutation from 'swr/mutation'
import Button from '../button'
import Input from '../input'
import Modal from '../modal'

const fetcher = (url, { arg: folder }) => services.folders.createFolder(folder)

export default function AddFolderButton({ children, ...props }) {
  const { trigger, isMutating, error } = useSWRMutation(
    FOLDERS_API_URL,
    fetcher
  )
  const [value, setValue] = useState('')
  const router = useRouter()
  const { folderId } = router.query
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleChange = (e) => setValue(e.target.value)
  const handleEnter = (e) => {
    if (e.key === 'Enter') createFolder()
  }
  const createFolder = () => {
    if (value === '') return
    const folderToAdd = {
      name: value,
      parentFolder: folderId || null
    }
    trigger(folderToAdd)
      .then(() => {
        setValue('')
        handleClose()
      })
      .catch(() => 'error')
  }
  return (
    <>
      <Button onClick={handleOpen} ghost onlyIcon rounded size="sm" {...props}>
        {children || <RiFolderAddFill className="h-5 w-5" />}
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Title>New folder</Modal.Title>
        <Modal.Body>
          <Input
            onKeyPress={handleEnter}
            value={value}
            onChange={handleChange}
            placeholder="Untitled folder"
          />
          {error && (
            <div className="mt-2 text-xs text-red-500">
              {error?.response?.data?.message || 'Something went wrong'}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-1 justify-end gap-2">
            <Button ghost onClick={handleClose} size="sm">
              Cancel
            </Button>
            <Button size="sm" onClick={createFolder} isLoading={isMutating}>
              Create
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
