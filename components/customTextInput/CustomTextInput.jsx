import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import COLORS from '../../constants/colors'
import styles from './customtextinputjs'

export default CustomTextInput = ({ placeholder, value, onChangeText}) => {

    return (
      <View style={styles.inputField}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.black}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          style={{
            width: '100%',
          }}
        />
     
      </View>
    );
}

