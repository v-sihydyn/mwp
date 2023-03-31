import React, { memo, useEffect, useState } from 'react';
import { Modal, IModalProps } from 'native-base';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import KeyboardSpacer from './KeyboardSpacer/KeyboardSpacer';
import { colors } from '../../styles/colors';

const windowHeight = Dimensions.get('window').height;
const halfWindowHeight = windowHeight / 2;

type KeyboardAvoidingModalProps = IModalProps & {
  additionalTopSpacing?: number;
  children: React.ReactNode;
};

export const KeyboardAvoidingModal = memo(
  ({
    additionalTopSpacing = 0,
    children,
    ...rest
  }: KeyboardAvoidingModalProps) => {
    const [topSpacing, setTopSpacing] = useState(10);
    const [modalContentHeight, setModalContentHeight] = useState(0);

    const onLayout = (e: LayoutChangeEvent) => {
      const {
        nativeEvent: {
          layout: { height },
        },
      } = e;

      if (!modalContentHeight && modalContentHeight !== height) {
        setModalContentHeight(height);
      }
    };

    useEffect(() => {
      const newTopSpacing =
        -halfWindowHeight + modalContentHeight + additionalTopSpacing;
      setTopSpacing(newTopSpacing);
    }, [modalContentHeight, additionalTopSpacing]);

    return (
      <Modal {...rest}>
        <Modal.Content backgroundColor={colors.page} onLayout={onLayout}>
          {children}
        </Modal.Content>
        <KeyboardSpacer topSpacing={topSpacing} />
      </Modal>
    );
  },
);
