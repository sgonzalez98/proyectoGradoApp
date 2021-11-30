import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, TextInput, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 5,
  },
  iconPassword: {
    color: '#747272',
    fontSize: 27,
    paddingHorizontal: 5,
  },
  textError: {
    color: '#ed2f2f',
    fontSize: 12,
    marginLeft: 5,
  },
});

function TextBase({ getRef, ...props }) {
  const ref = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setFocused] = useState(false);

  useEffect(() => {
    if (getRef) {
      getRef(ref);
    }
  });

  const {
    field: {
      name, value, onChange, onBlur,
    },
    form: { touched, errors },
    label,
    secureTextEntry,
    style,
    ...otheProps
  } = props;
  const hasError = touched[name] && Boolean(errors[name]);
  const borderColorError = hasError ? 'red' : 'black';
  const borderColor = isFocused ? '#1a59b5' : borderColorError;
  const containerHeight = otheProps.multiline ? 70 : 40;
  return (
    <View style={style}>
      <Text>{label}</Text>
      <TouchableOpacity style={[styles.container, { borderColor, height: containerHeight }]}>
        <TextInput
          name={name}
          onFocus={() => setFocused(true)}
          ref={ref}
          style={styles.input}
          onBlur={(event) => {
            setFocused(false);
            onBlur(name)(event);
          }}
          onChangeText={(event) => onChange(name)(event)}
          autoCorrect={false}
          secureTextEntry={secureTextEntry && !showPassword}
          autoCompleteType="off"
          autoCapitalize="none"
          value={`${value}`}
          {...otheProps}
        />
        {secureTextEntry && (
          <Icon onPress={() => setShowPassword(!showPassword)} name={showPassword ? 'eye' : 'eye-off'} style={styles.iconPassword} size={20} />
        )}
      </TouchableOpacity>
      {hasError && <Text style={styles.textError}>{errors[name]}</Text>}
    </View>
  );
}

TextBase.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  getRef: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object]),
};

TextBase.defaultProps = {
  secureTextEntry: false,
  getRef: null,
  style: {},
};

export default TextBase;
