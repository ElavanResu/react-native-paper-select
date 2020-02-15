import React from 'react'
import {
  Picker,
  StyleSheet
} from 'react-native'
import { TextInput } from 'react-native-paper'

class ReactNativePaperSelect extends React.PureComponent {
  constructor(props) {
    super(props)
    const { selectedValue, items } = this.initialise(props)
    this.state = {
      items,
      selectedValue
    }
  }

  getPlaceholderData () {
    return {
      label: 'Select an item...',
      value: null,
      color: '#9EA0A4'
    }
  }

  initialise (props) {
    if (props.items.length !== 0) {
      const items = [this.getPlaceholderData()].concat(props.items)
      return { selectedValue: items[0].value, items }
    }
  }

  render () {
    const {
      onValueChange,
      theme,
      mode,
      showError,
      label,
      textInputStyle,
      textInputValue
    }  = this.props
    const { selectedValue, items } = this.state
    return (
      <TextInput
        thene={theme}
        mode={mode}
        error={showError}
        label={label}
        value={textInputValue}
        style={textInputStyle}
        render={props => <Picker
            selectedValue={selectedValue}
            style={[
              styles.inputBox,
              selectedValue !== null ? styles.textColor : styles.transparentText
            ]}
            testID='androidNativePicker'
            onValueChange={(itemValue, itemIndex) => {
              onValueChange(itemValue, itemIndex)
              this.setState({ selectedValue: itemValue })
            }}
          >
            {
              items.map((item, index) => <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={`itemValue${index}`}
                  color={item.color}
                />
              )
            }
          </Picker>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 3,
    marginLeft: 5,
    marginRight: 5
  },
  textColor: {
    color: '#000000'
  },
  transparentText: {
    color: 'transparent'
  }
})

export default ReactNativePaperSelect
