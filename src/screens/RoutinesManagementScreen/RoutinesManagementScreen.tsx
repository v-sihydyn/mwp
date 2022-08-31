import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../styles/colors';
import BasicExample from '../../components/SortableList/Example';
import ForkedExample from '../../components/SortableList/ForkedExample';


interface RoutinesManagementScreenProps {}

export const RoutinesManagementScreen: React.FC<RoutinesManagementScreenProps> = () => {
  return (
    <View style={styles.container}>
      <BasicExample />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.page,
    // flex: 1,
    // paddingTop: 20,
    // flexDirection: 'column',
    // position: 'relative',

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
