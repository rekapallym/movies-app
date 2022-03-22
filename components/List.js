import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Card from './Card';

class List extends React.PureComponent {
  render() {
    const {title, content, navigation} = this.props;

    return (
      <View>
        <View style={styles.list}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card item={item} navigation={navigation} />
            )}></FlatList>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {fontSize: 20, fontWeight: 'bold', paddingBottom: 20},
  list: {marginTop: 25},
});

export default List;
