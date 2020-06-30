import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useBlogContext } from '../context/BlogContext';

const IndexScreen = () => {
  const { posts, addPost } = useBlogContext();

  return (
    <View>
      <Text>Posts:</Text>
      <FlatList
        data={posts}
        keyExtractor={({ title }) => title}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
      <Button onPress={addPost} title="Add post" />
    </View>
  );
};

export default IndexScreen;
