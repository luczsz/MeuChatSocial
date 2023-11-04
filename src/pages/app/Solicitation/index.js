import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { styles } from './style';
import { solicitações } from '../../../components/list';
import ListSolicitation  from '../../../components/ListSolicitation';

export default function Solicitation() {
 return (
   <View style={styles.container} >
        <View style={styles.content} >
            <FlatList
                data={solicitações}
                keyExtractor={ (item) => item.id}
                renderItem={({item}) => <ListSolicitation data={item} /> }
            />
        </View>
   </View>
  );
}
