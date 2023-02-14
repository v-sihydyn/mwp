import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.page,
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  textButton: {
    color: colors.green,
    margin: 10,
    marginTop: 30,
  },
  textButtonDanger: {
    color: colors.red,
    fontSize: 16,
    fontWeight: '600',
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    width: 75,
    color: colors.text2,
  },
  input: {
    borderColor: colors.green,
    borderBottomWidth: 1,
    minHeight: 50,
    color: colors.text,
  },
});
