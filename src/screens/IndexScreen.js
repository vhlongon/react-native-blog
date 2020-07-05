import React, { useEffect } from 'react';
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
    color: 'darkgray',
  },
  createIcon: {
    fontSize: 20,
    paddingRight: 10,
    color: 'darkgray',
  },
  list: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  error: {
    color: 'red',
  },
});
const IndexScreen = ({ navigation }) => {
  // this is an approach in the course but if you dont ommit the parameter in the deps it will
  // end up in an infinite loop since getPosts is recreated on every rerender
  // a much easier approach is to use (here in hooks/useFetch):
  // const { data, pending, error } = useFetch('http://localhost:3000/blogposts');
  // and just check for things there

  const { posts, loading, error, removePost, getPosts } = useBlogContext();

  useEffect(() => {
    getPosts();

    const listener = navigation.addListener('didFocus', () => {
      getPosts();
    });

    return () => {
      listener.remove();
    };
  }, [navigation]);

  return (
    <View>
      <Text style={styles.title}>Posts</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>Something went wrong: {error}</Text>}
      {posts && (
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
      )}
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
