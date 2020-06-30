import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { useBlogContext } from '../context/BlogContext';

const styles = StyleSheet.create({
  container: { margin: 10 },
  title: { marginVertical: 20, textAlign: 'center', fontSize: 24 },
  content: { marginVertical: 10, fontSize: 18 },
  icon: { fontSize: 24, marginRight: 10, color: 'darkgray' },
});
const ShowScreen = ({ navigation }) => {
  const { posts } = useBlogContext();
  const post = posts.find(({ id }) => id === navigation.getParam('id'));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') })}
    >
      <Ionicons name="ios-create" style={styles.icon} />
    </TouchableOpacity>
  ),
});

export default ShowScreen;
