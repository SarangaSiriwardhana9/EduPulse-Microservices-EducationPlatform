import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import StripeProviderWrapper from '../components/Payment/StripeProviderWrapper';
import AddPaymentData from '../components/Payment/AddPaymentData';
import ViewPaymentData from '../components/Payment/ViewPaymentData';
import UpdatePaymentData from '../components/Payment/UpdatePaymentData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserProfile() {
  const { user } = useContext(UserContext); // Access user data from UserContext
  const {
    isOpen: isAddPaymentOpen,
    onOpen: onAddPaymentOpen,
    onClose: onAddPaymentClose,
  } = useDisclosure();
  const {
    isOpen: isViewPaymentOpen,
    onOpen: onViewPaymentOpen,
    onClose: onViewPaymentClose,
  } = useDisclosure();
  const {
    isOpen: isUpdatePaymentOpen,
    onOpen: onUpdatePaymentOpen,
    onClose: onUpdatePaymentClose,
  } = useDisclosure();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const email = user?.email;
  const role = user?.role;

  return (
    <div className="min-h-screen mb-20">
      <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex mt-10">
          <div className="md:flex-shrink-0">
            {/* Display user avatar */}
            <img className="h-48 w-full object-cover md:w-48" src="/user1.png" alt="User Avatar" />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User Profile</div>
            {/* Display user data */}
            <div className="mt-4">
              <div className="text-lg font-semibold">
                {firstName} {lastName}
              </div>
              <div className="text-gray-500">{email}</div>
              {/* Display role */}
              {role === 'user' && <div className="text-gray-500">Student</div>}
              {role === 'creator' && <div className="text-gray-500">Creator</div>}
              {role === 'admin' && <div className="text-gray-500">Admin</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 space-x-4">
        <Button onClick={onAddPaymentOpen} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Payment Data
        </Button>
        <Button onClick={onViewPaymentOpen} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Payment Data
        </Button>
        <Button onClick={onUpdatePaymentOpen} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Payment Data
        </Button>
      </div>

      <Modal isOpen={isAddPaymentOpen} onClose={onAddPaymentClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Payment Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StripeProviderWrapper>
              <AddPaymentData userId={user?.id} authToken={localStorage.getItem('token')} onClose={onAddPaymentClose} />
            </StripeProviderWrapper>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onAddPaymentClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isViewPaymentOpen} onClose={onViewPaymentClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Payment Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ViewPaymentData userId={user?.id} authToken={localStorage.getItem('token')} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onViewPaymentClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUpdatePaymentOpen} onClose={onUpdatePaymentClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Payment Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StripeProviderWrapper>
              <UpdatePaymentData userId={user?.id} authToken={localStorage.getItem('token')} onClose={onUpdatePaymentClose} />
            </StripeProviderWrapper>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onUpdatePaymentClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </div>
  );
}
