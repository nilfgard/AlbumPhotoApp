import {
  AppState,
  AppStateStatus,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { onlineManager, QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import styles from './App.styles';

// TODO: move to better location
const API = {
  albums: 'https://jsonplaceholder.typicode.com/albums',
  photos: (id: number) => `${API.albums}/${id}/photos`,
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

// TODO: add proper types for albums and photos
function Main() {
  const [selectedAlbum, setSelectedAlbum] = useState(1);

  // TODO: handle loading and errors
  const { data: albumsData } = useQuery({
    queryKey: ['albums'],
    queryFn: () => fetch(API.albums).then((response) => response.json()),
  });
  const { data: photosData } = useQuery({
    queryKey: ['photos', selectedAlbum],
    queryFn: () => fetch(API.photos(selectedAlbum)).then((response) => response.json()),
  });

  onlineManager.setEventListener(() => {
    return NetInfo.addEventListener((state) => {
      console.log('netInfo state', state);
      // TODO: give info for a user that the app is offline
    });
  });

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  const onAppStateChange = (nextAppState: AppStateStatus) => {
    console.log('nextAppState', nextAppState);
    // TODO: block fetching while is in background and refetch when is active again
  };

  const handleAlbumPress = useCallback(
    (id: number) => {
      setSelectedAlbum(id);
    },
    [setSelectedAlbum],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.extraPaddingContainer}>
        <View style={styles.albumContainer}>
          <Text>Albums</Text>
          <FlatList
            data={albumsData}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.albumsInnerContainer}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleAlbumPress(item.id)} style={styles.itemAlbum}>
                {/* I think we should use title instead of ID */}
                <Text>{item.id}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.photosContainer}>
          <Text>Photos</Text>
          <FlatList
            data={photosData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            contentContainerStyle={styles.photosInnerContainer}
            columnWrapperStyle={styles.photosInnerContainer}
            renderItem={({ item }) => (
              <>
                {/* TODO: images needs to have calculated size */}
                <Image source={{ uri: `${item.url}.png` }} style={styles.photoImage} />
              </>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
