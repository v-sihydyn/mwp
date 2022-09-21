import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Animated, LayoutRectangle, TouchableOpacity, LayoutAnimation } from 'react-native';
import { colors } from '../../../../styles/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import Portal from '../../../../components/Portal/Portal';
import { ActionItem } from './ActionItem/ActionItem';
import { useNavigation } from '@react-navigation/native';

type RoutineToolbarProps = {
  onRenameRoutine: () => void;
  onDeleteRoutine: () => void;
};

const BUTTON_BORDER_TOP_RADIUS_CLOSED = 18;
const BUTTON_BORDER_TOP_RADIUS_OPEN = 0;
const BUTTON_BORDER_BOTTOM_RADIUS_CLOSED = 18;
const BUTTON_BORDER_BOTTOM_RADIUS_OPEN = 12;

export const RoutineToolbar: React.FC<RoutineToolbarProps> = ({ onRenameRoutine, onDeleteRoutine }) => {
  const [buttonLayout, setButtonLayout] = useState<LayoutRectangle | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const buttonBorderTopRadius = useRef(new Animated.Value(BUTTON_BORDER_TOP_RADIUS_CLOSED)).current;
  const buttonBorderBottomRadius = useRef(new Animated.Value(BUTTON_BORDER_TOP_RADIUS_CLOSED)).current;

  const navigation = useNavigation();

  // const dropdownRef = useRef();

  const handleToggleDropdown = () => {
    const nextIsVisible = !isDropdownVisible;

    if (nextIsVisible) {
      Animated.parallel([
        Animated.timing(buttonBorderTopRadius, {
          toValue: BUTTON_BORDER_TOP_RADIUS_OPEN,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(buttonBorderBottomRadius, {
          toValue: BUTTON_BORDER_BOTTOM_RADIUS_OPEN,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(buttonBorderTopRadius, {
          toValue: BUTTON_BORDER_TOP_RADIUS_CLOSED,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(buttonBorderBottomRadius, {
          toValue: BUTTON_BORDER_BOTTOM_RADIUS_CLOSED,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDropdownVisible((visible) => !visible);
  };

  const handleRenameRoutine = () => {
    onRenameRoutine();

    setTimeout(() => {
      handleToggleDropdown();
    });
  };

  const handleDeleteRoutine = () => {
    onDeleteRoutine();

    setTimeout(() => {
      handleToggleDropdown();
    });
  };

  const handleInitiateAddExercise = () => {
    navigation.navigate('AddExerciseToRoutine');
  };

  return (
    <>
      <Animated.View
        style={[
          styles.root,
          {
            borderTopLeftRadius: buttonBorderTopRadius,
            borderTopRightRadius: buttonBorderTopRadius,
            borderBottomLeftRadius: buttonBorderBottomRadius,
            borderBottomRightRadius: buttonBorderBottomRadius,
          },
        ]}
        onLayout={(e) => {
          setButtonLayout(e.nativeEvent.layout);
        }}>
        <TouchableOpacity style={styles.iconWrapper} onPress={handleInitiateAddExercise}>
          <FontAwesome5 name="plus-circle" color={colors.text} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconWrapper}>
          <FontAwesome5 name="play" color={colors.text} size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={handleToggleDropdown}>
          <FontAwesome5 name="ellipsis-h" color={colors.text} size={18} />
        </TouchableOpacity>
      </Animated.View>
      <Portal>
        {isDropdownVisible && (
          <Animated.View
            style={[
              styles.dropdown,
              { position: 'absolute', top: buttonLayout ? buttonLayout?.y - 160 - 3 : 0, left: buttonLayout?.x },
            ]}>
            <ActionItem name="Edit Superset" icon="link" onPress={() => {}} />
            <ActionItem name="Reorder Exercises" icon="list" onPress={() => {}} />
            <ActionItem name="Rename Routine" icon="pencil-alt" onPress={handleRenameRoutine} />
            <ActionItem name="Delete Routine" icon="trash" onPress={handleDeleteRoutine} />
          </Animated.View>
        )}
      </Portal>
    </>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_WIDTH = 280;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.green,
    width: BUTTON_WIDTH,
    height: 40,
    position: 'absolute',
    bottom: 20,
    left: SCREEN_WIDTH / 2 - BUTTON_WIDTH / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    borderRadius: 18,
  },
  dropdown: {
    backgroundColor: colors.green,
    height: 160,
    width: BUTTON_WIDTH,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
