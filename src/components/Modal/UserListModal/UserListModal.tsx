import { Modal } from ".."
import { UserListModalProps } from "./types"
import { User } from "./User"
import { Wrapper } from "./UserListModal.styles"

export const UserListModal = ({ onClose, userList, heading }: UserListModalProps) => {

  return (
    <Modal
      heading={heading}
      onClose={onClose}
    >
      <Wrapper>
        {userList.length ?
          userList.map(userId => <User key={userId} userId={userId} onClose={onClose} />) :
          <span>Lista użytkowników jest pusta.</span>
        }
      </Wrapper>
    </Modal>
  )
}
