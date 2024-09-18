import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },
  extraPaddingContainer: {
    gap: 10,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  albumContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  albumsInnerContainer: {
    gap: 5,
  },
  photosContainer: {
    flex: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  photosInnerContainer: {
    gap: 5,
  },
  photoImage: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'blue',
    backgroundColor: 'lightblue',
  },
  itemAlbum: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'blue',
    backgroundColor: 'lightblue',
  },
});

export default styles;
