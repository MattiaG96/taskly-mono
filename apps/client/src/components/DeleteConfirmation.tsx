import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { FC } from 'react';

interface DeleteConfirmationProps {
  alertTitle: string;
  handleClick: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
  alertTitle,
  handleClick,
  isOpen,
  onClose,
}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {alertTitle}
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action.
          </AlertDialogBody>

          <AlertDialogFooter gap="4">
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" onClick={handleClick}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
