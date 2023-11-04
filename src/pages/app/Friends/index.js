import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { styles } from './style';
import { amigos } from '../../../components/list';
import ListFriends from '../../../components/ListFriends';

export default function Friends() {
 return (
   <View style={styles.container} >
        <View style={styles.content} >
            <FlatList
                data={amigos}
                keyExtractor={ (item) => item.id}
                renderItem={({item}) => <ListFriends data={item} /> }
            />
        </View>
   </View>
  );
}
