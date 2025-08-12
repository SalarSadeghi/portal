import { Modal } from "../../../ui/Modal";
import { modalStore } from "../../../../store/ModalStore";

const HygieneFindingRegionModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();

  return (
    <Modal
      width="80%"
      maxHeight="85%"
      isOpen={isOpenModal}
      onToggle={() => {
        changeIsOpenModal(false);
      }}
      title={"نام ناحیه / نام واحد"}
    >
      hello
    </Modal>
  );
};

export default HygieneFindingRegionModal;
