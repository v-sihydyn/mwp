import { StyleSheet, Text, View } from 'react-native';
import BasicExample from '../../components/SortableList/Example';
import DraggableBasicExample from '../../components/Draggable/DraggableBasicExample';

export const StatisticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StatisticsScreen</Text>

      <BasicExample />

      {/*<DraggableBasicExample />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
