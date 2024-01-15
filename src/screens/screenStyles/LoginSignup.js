import { StyleSheet } from 'react-native'
import COLORS from '../../../constants/colors'
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  containerWrapper: {
    flex: 1,
    marginHorizontal: 22,
    justifyContent: 'center',
  },

  inputFieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },

  textField: {
    fontSize: 16,
    color: COLORS.black,
  },
  loginHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  inputField: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  inputFieldWrapper: {
    marginBottom: 12,
  },

  createAccount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
    color: COLORS.primary,
  },
})
