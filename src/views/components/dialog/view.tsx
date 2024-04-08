import { Modal, ModalProps } from 'react-native';
import {
  ConfirmButton,
  DialogContainer,
  TitleAndButtonContainer,
  DialogTitle,
  DialogButtonsContainer,
  CancelButton,
  CancelButtonTitle,
  ConfirmButtonTitle,
  TranparentButton,
} from './styles';

export interface Props extends ModalProps {
  dialogVisible: boolean;
  dialogMessage: string;
  positiveButtonTitle?: string | null;
  negativeButtonTitle?: string;
  negativeFunction?: () => void;
  positiveFunction?: () => void;
}

export function Dialog({
  dialogVisible,
  dialogMessage,
  negativeButtonTitle,
  positiveButtonTitle,
  negativeFunction,
  positiveFunction,
  ...rest
}: Props) {
  return (
    <Modal visible={dialogVisible} transparent {...rest}>
      <DialogContainer testID='dialog-container'>
        <TranparentButton
          testID='header-transparent-button'
          onPress={negativeFunction}
        />
        <TitleAndButtonContainer>
          <DialogTitle>{dialogMessage}</DialogTitle>
          <DialogButtonsContainer>
            {negativeButtonTitle && (
              <CancelButton
                testID='dialog-negative-button'
                onPress={negativeFunction}
              >
                <CancelButtonTitle numberOfLines={1}>
                  {negativeButtonTitle}
                </CancelButtonTitle>
              </CancelButton>
            )}
            {positiveButtonTitle && (
              <ConfirmButton
                onPress={positiveFunction}
                testID='dialog-positive-button'
              >
                <ConfirmButtonTitle numberOfLines={1}>
                  {positiveButtonTitle}
                </ConfirmButtonTitle>
              </ConfirmButton>
            )}
          </DialogButtonsContainer>
        </TitleAndButtonContainer>
        <TranparentButton
          testID='footer-transparent-button'
          onPress={negativeFunction}
        />
      </DialogContainer>
    </Modal>
  );
}
