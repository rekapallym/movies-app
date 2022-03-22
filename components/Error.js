import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Error extends React.PureComponent {
  render() {
    const {errText1, errText2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errText1}</Text>
        <Text style={styles.text}>{errText2}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  //   container: {justifyContent: 'center', alignItems: 'center', flex: 1},
  text: {fontWeight: 'bold', color: 'red'},
});
export default Error;
