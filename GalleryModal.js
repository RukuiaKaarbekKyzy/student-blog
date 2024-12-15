import React, { useState } from 'react';
import { Modal, View, Image, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const GalleryModal = ({ visible, onClose }) => {
  const [photos, setPhotos] = useState([
    require('./assets/IMG_20240602_021442.jpg'),
    require('./assets/photo_2024-10-09_02-02-33.jpg'),
    require('./assets/WhatsApp Image 2024-04-13 at 17.33.25 (1).jpeg'),

  ]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [addPhotoVisible, setAddPhotoVisible] = useState(false);

  const openPhoto = (photo) => setSelectedPhoto(photo);
  const closePhoto = () => setSelectedPhoto(null);

  const sharePhoto = async () => {
    try {
      let selectedPhotoUri = 'https://example.com/photo.jpg'; // replace with your selected photo URI
      if (selectedPhotoUri.startsWith('http')) {
        const fileName = selectedPhotoUri.split('/').pop();
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

        const { uri } = await FileSystem.downloadAsync(selectedPhotoUri, fileUri);

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          console.log('Sharing not available.');
        }
      } else {
        console.error('The selected photo must be a valid remote URL.');
      }
    } catch (error) {
      console.error('Error sharing the photo:', error);
    }
  };

  const addPhoto = (result) => {
    if (!result.canceled) {
      const newPhoto = { uri: result.assets[0].uri };
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
      setAddPhotoVisible(false);
    } else {
      console.log('User canceled image selection');
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    addPhoto(result);
  };

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      alert('Permission to access photo gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    addPhoto(result);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.modalTitle}>Gallery</Text>

        <FlatList
          style={styles.photosList}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          data={photos}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openPhoto(item)}>
              <Image source={item} style={styles.photoThumbnail} />
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          onPress={() => setAddPhotoVisible(true)}
          style={[styles.actionButton, { backgroundColor: 'green' }]}
        >
          <Text style={styles.actionText}>Add photo</Text>
        </TouchableOpacity>

        {addPhotoVisible && (
          <Modal visible={true} transparent={true} animationType="slide">
            <View style={styles.addPhotoModal}>
              <Text style={styles.modalTitle}>Add Photo</Text>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: 'blue' }]}
                onPress={openCamera}
              >
                <Text style={styles.actionText}>From Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: 'orange' }]}
                onPress={openGallery}
              >
                <Text style={styles.actionText}>From Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: 'red' }]}
                onPress={() => setAddPhotoVisible(false)}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}

        {/* Close button for the Gallery Modal */}
        <TouchableOpacity onPress={onClose} style={[styles.actionButton, { backgroundColor: 'red' }]}>
          <Text style={styles.actionText}>Close Gallery</Text>
        </TouchableOpacity>

        {selectedPhoto && (
          <Modal visible={true} transparent={true} animationType="fade">
            <View style={styles.fullPhotoContainer}>
              <Image source={selectedPhoto} style={styles.fullPhoto} />
              <View style={styles.fullPhotoActions}>
                <TouchableOpacity onPress={closePhoto} style={styles.closeButtonPhoto}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sharePhoto} style={styles.shareButton}>
                  <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photosList: {
    flex: 1,
    width: '100%',
  },
  photoThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  addPhotoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  fullPhotoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  fullPhoto: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  fullPhotoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '80%',
  },
  closeButtonPhoto: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  shareButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  shareText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GalleryModal;
