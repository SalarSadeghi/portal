import { Modal } from "../../../ui/Modal";
import { modalStore } from "../../../../store/ModalStore";

const HygieneFindingResponsiblePersonModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();
  return (
    <Modal
      width="80%"
      maxHeight="85%"
      isOpen={isOpenModal}
      onToggle={() => {
        changeIsOpenModal(false);
      }}
      title={"مسئول واحد"}
    >
      hello
    </Modal>
  );
};

export default HygieneFindingResponsiblePersonModal;
