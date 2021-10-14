import React from 'react';
import {
  Animated, StyleSheet, Text, TextInput, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  textInput: {
    padding: 0,
    paddingLeft: 7,
    fontSize: 16,
    flex: 1,
  },
  button: {
    borderBottomWidth: 1,
    margin: 1,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    color: '#747272',
    fontSize: 27,
    marginHorizontal: 2,
  },
  labelText: {
    fontSize: 15,
    lineHeight: 30,
    color: '#000',
  },
  textError: {
    color: '#ed2f2f',
    fontSize: 11,
    marginLeft: 3,
  },
});

class TextBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      showPassword: false,
      topAnim: new Animated.Value(3),
      opacAnim: new Animated.Value(0.9),
    };
  }

  componentDidMount() {
    const { field: { value }, getRef } = this.props;

    if (value) {
      this.floatUp(-22);
      this.setState({ isFocused: true });
    }
    if (getRef) {
      getRef(this.inputRef);
    }
  }

  floatBack(toValue) {
    const { topAnim, opacAnim } = this.state;
    const equalsValues = { duration: 150, useNativeDriver: false };
    Animated.timing(topAnim, { toValue, ...equalsValues }).start();
    Animated.timing(opacAnim, { toValue: 0.9, ...equalsValues }).start();
  }

  floatUp(toValue) {
    const { topAnim, opacAnim } = this.state;
    const equalsValues = { duration: 150, useNativeDriver: false };
    Animated.timing(topAnim, { toValue, ...equalsValues }).start();
    Animated.timing(opacAnim, { toValue: 0.6, ...equalsValues }).start();
  }

  renderLabel(label) {
    const { field: { value } } = this.props;
    const { isFocused } = this.state;
    if (isFocused || value) {
      this.floatUp(-22);
    } else {
      this.floatBack(3);
    }
    return label;
  }

  render() {
    const {
      field: {
        name, value, onBlur, onChange,
      },
      form: { touched, errors, setFieldValue },
      label,
      secureTextEntry,
      clearButton,
      editable,
      ...props
    } = this.props;
    const { topAnim, opacAnim, showPassword } = this.state;

    const hasError = touched[name] && Boolean(errors[name]);
    const borderColor = hasError ? '#ed2f2f' : '#D9D5DC';
    const iconName = showPassword ? 'eye' : 'eye-off';

    return (
      <>
        <TouchableOpacity style={[styles.button, { borderBottomColor: borderColor }]}>
          <Animated.View style={{ position: 'absolute', top: topAnim, opacity: opacAnim }}>
            <Text style={styles.labelText}>{this.renderLabel(label)}</Text>
          </Animated.View>
          <TextInput
            name={name}
            ref={(ref) => {
              this.inputRef = ref;
            }}
            value={value}
            onFocus={() => this.setState({ isFocused: true })}
            style={styles.textInput}
            onBlur={(event) => {
              if (value) {
                this.setState({ isFocused: true });
              } else {
                this.setState({ isFocused: false });
              }
              onBlur(name)(event);
            }}
            onChangeText={(event) => onChange(name)(event)}
            autoCorrect={false}
            secureTextEntry={secureTextEntry && !showPassword}
            autoCompleteType="off"
            autoCapitalize="none"
            returnKeyType="next"
            editable={editable}
            {...props}
          />
          {secureTextEntry && (
          <Icon
            name={iconName}
            style={styles.icons}
            onPress={() => this.setState({ showPassword: !showPassword })}
          />
          )}
          {Boolean(value) && editable && clearButton && (
          <Icon
            name="close-circle"
            style={[styles.icons, { color: '#D1D1D1' }]}
            onPress={() => setFieldValue(name, '')}
          />
          )}
        </TouchableOpacity>
        {hasError && <Text style={styles.textError}>{errors[name]}</Text>}
      </>
    );
  }
}

TextBase.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  getRef: PropTypes.func,
  clearButton: PropTypes.bool,
  editable: PropTypes.bool,
};

TextBase.defaultProps = {
  secureTextEntry: false,
  getRef: null,
  clearButton: true,
  editable: true,
};

export default TextBase;
