import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';
import { useBlogContext } from '../context/BlogContext';

const styles = StyleSheet.create({
  title: { marginVertical: 20, textAlign: 'center', fontSize: 24 },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  postTitle: {
    fontSize: 18,
  },
  icon: {
    fontSize: 20,
  },
  createIcon: {
    fontSize: 20,
    paddingRight: 10,
  },
  list: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});
const IndexScreen = ({ navigation }) => {
  const { posts, removePost } = useBlogContext();

  return (
    <View>
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={posts}
        style={styles.list}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
            <View style={styles.row}>
              <Text style={styles.postTitle}>
                {item.title} - id: {item.id}
              </Text>
              <TouchableOpacity onPress={() => removePost(item.id)}>
                <Feather name="trash" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Create')}>
      <Feather name="plus" style={styles.createIcon} />
    </TouchableOpacity>
  ),
});

export default IndexScreen;
