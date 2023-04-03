import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const modalStyles = StyleSheet.create({
  modal: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: colors.surface2,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 18,

    width: '100%',
  },
  modalSubtitle: {
    color: colors.text,
    fontSize: 16,
    width: '100%',
  },
  modalInput: {
    width: '100%',
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.green,
    fontSize: 16,
  },
  modalActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {},
  modalButtonText: {
    color: colors.green,
    fontSize: 16,
  },
});
