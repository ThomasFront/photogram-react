import { Modal } from ".."
import { UserListModalProps } from "./types"
import { User } from "./User"

export const UserListModal = ({ onClose, userList, heading }: UserListModalProps) => {

  return (
    <Modal
      heading={heading}
      onClose={onClose}
    >
      {userList.length ?
        userList.map(userId => <User key={userId} userId={userId} onClose={onClose} />) :
        <span>Lista użytkowników jest pusta.</span>
      }
    </Modal>
  )
}
