import { BtnComponent } from './BtnComonent';
import { SubHeadingComponent } from './SubHeadingComponent';
import Modal from 'react-modal';

export const ReusableModal = ({ isOpen, onRequestClose, contentLabel, modalTitle, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}>
            <div>
                <BtnComponent className="mx-6 bg-gray-800 m-1 hover:bg-gray-600 text-white" onClick={onRequestClose} label="Close Modal" />
                <div className='text-center lg:px-16'>
                    <SubHeadingComponent text={modalTitle} />
                    {children}
                </div>
            </div>
        </Modal>
    );
};


