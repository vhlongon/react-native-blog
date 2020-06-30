import React, { useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Context } from '../context/BlogContext';

const IndexScreen = () => {
  const { posts, addPost, removePost } = useContext(Context);

  return (
    <View>
      <Text>Posts:</Text>
      <FlatList
        data={posts}
        keyExtractor={({ title }) => title}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
      <Button onPress={addPost} title="Add post" />
      <Button onPress={removePost} title="Remove post" />
    </View>
  );
};

export default IndexScreen;
