import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SectionList, Modal, TextInput, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-toast-message';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import messaging from '@react-native-firebase/messaging'; 
import AppFooter from './AppFooter';
import GalleryModal from './GalleryModal';
import Icon from 'react-native-vector-icons/FontAwesome'; // импортируем иконки



// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5YK-N_mLfCiYIRDegW_fDp0noFrKiNDg",
  authDomain: "studensinformation.firebaseapp.com",
  projectId: "studensinformation",
  storageBucket: "studensinformation.firebasestorage.app",
  messagingSenderId: "447500246249",
  appId: "1:447500246249:web:a7633ee25f44d8cbffa478",
  measurementId: "G-G2R9ZCLCD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const students = [
  {
    title: 'Computer Science',
    data: [
      {
        id: '1',
        lastName: 'Ali',
        firstName: 'Bey',
        patronymic: 'Asanovich',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s',
        description: 'Ali Bey Asanovich is a student at the Faculty of Computer Science. He is passionate about programming and web design, known for his active lifestyle and participation in various student projects.',
        achievements:'-Participated in 3 hackathon\n-Published 2 research papers\n -Active member of the AI Club'

      },
      {
        id: '3',
        lastName: 'Zhanarbek',
        firstName: 'Nurlan',
        patronymic: 'Orynbasarov',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s',
        description: 'Zhanarbek Nurlan Orynbasarov is known for his exceptional skills in artificial intelligence and machine learning. He actively participates in hackathons and coding competitions.',
        achievements:'-Participated in 3 hackathon\n-Published 2 research papers\n -Active member of the AI Club'

      },
    ],
  },
  {
    title: 'Humanities',
    data: [
      {
        id: '2',
        lastName: 'Rukuia',
        firstName: 'Kaarbek',
        patronymic: 'Kaarbekovna',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s',
        achievements:'-Participated in 3 hackathon\n-Published 2 research papers\n -Active member of the AI Club',
        description: 'Rukuia Kaarbek Kaarbekovna is a student at the Humanities Faculty. She has an interest in literature and psychology, regularly participates in scientific conferences, and publishes articles.',
      },
      {
        id: '4',
        lastName: 'Sultan',
        firstName: 'Aigul',
        patronymic: 'Serikova',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s',
        description: 'Sultan Aigul Serikova specializes in history and sociology, contributing to various research projects and community service initiatives.',
        achievements:'-Participated in 3 hackathon\n-Published 2 research papers\n -Active member of the AI Club'

      },
    ],
  },
  {
    title: 'Engineering',
    data: [
      {
        id: '5',
        lastName: 'Dauren',
        firstName: 'Azamat',
        patronymic: 'Akylbekovich',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s',
        description: 'Dauren Azamat Akylbekovich is a mechanical engineering student with a passion for robotics. He has participated in several engineering competitions and workshops.',
        achievements:'-Participated in 3 hackathon\n-Published 2 research papers\n -Active member of the AI Club'

      },
      {
        id: '6',
        lastName: 'Arman',
        firstName: 'Aiman',
        patronymic: 'Serikova',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s',
        description: 'Arman Aiman Serikova is an electrical engineering student focusing on renewable energy solutions. He has interned at several innovative startups in the field.',
        achievements:'-Participated in 3 hackathon\n-Published 2 research papers\n -Active member of the AI Club'

      },
    ],
  },
  {
    title: 'Business',
    data: [
      {
        id: '7',
        lastName: 'Askar',
        firstName: 'Elina',
        patronymic: 'Kairatovna',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s',
        description: 'Askar Elina Kairatovna is a business administration student interested in entrepreneurship and marketing. She has launched a successful online store during her studies.',
        achievements:'-Participated in 3 hackathon\n-Published 2 research papers\n -Active member of the AI Club'

      },
      {
        id: '8',
        lastName: 'Zarina',
        firstName: 'Maxim',
        patronymic: 'Kenzhebekovich',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s',
        achievements:'-Participated in 3 hackathon\n-Published 2 research papers\n -Active member of the AI Club',
        description: 'Zarina Maxim is a business administration student interested in entrepreneurship and marketing. She has launched a successful online store during her studies.',

      },
    ],
  },
];

const StudentItem = ({ student, onShowMore }) => (
  <View style={styles.studentContainer}>
    <Image source={{ uri: student.photo }} style={styles.photo} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>
        {student.lastName} {student.firstName} {student.patronymic}
      </Text>
      <Button title="More" onPress={() => onShowMore(student)} />
    </View>
  </View>
);


const App = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    
    return unsubscribe; // Cleanup on unmount
  }, []);

  // Function to request permission for push notifications
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    return enabled;
  };

  useEffect(() => {
    const handleNotifications = async () => {
      const permissionGranted = await requestUserPermission();
      if (permissionGranted) {
        // Return FCM token for the device
        messaging().getToken().then(token => {
          console.log('FCM Token:', token);
        });
      } else {
        console.log('Failed to get permission or token');
      }

      // Check for initial notification when the app is opened from a quit state
      messaging().getInitialNotification().then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
      });

      // Handle when the app is in the background and the user taps the notification
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log('Notification caused app to open from background state:', remoteMessage.notification);
      });

      // Register background message handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
      });

      // Handle foreground messages
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        if (remoteMessage) {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        }
      });

      return unsubscribe;
    };

    handleNotifications();
  }, []);


  const handleShowMore = (student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedStudent(null);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Email and Password are required',
      });
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Toast.show({
          type: 'success',
          text1: 'Welcome',
          text2: `Hello ${user.email}!`,
        });
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Toast.show({
          type: 'info',
          text1: 'Goodbye',
          text2: 'You have been logged out.',
        });
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      });
  };

  const handleSignUp = () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Email and Password are required',
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Toast.show({
          type: 'success',
          text1: 'Account Created',
          text2: `Welcome ${user.email}!`,
        });
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      });
  };

  const filteredStudents = students.map(section => ({
    ...section,
    data: section.data.filter(student =>
      student.lastName.toLowerCase().includes(searchText.toLowerCase())
    ),
  })).filter(section => section.data.length > 0);

  return (
    <View style={styles.container}>
      <Text style={styles.nameLarge}>Students' Blog</Text>
  
      {user ? (
        <>
          <View style={styles.buttonContainer}>
        {/* Кнопка выхода */}
        <TouchableOpacity onPress={handleSignOut} style={styles.iconButton}>
          <Icon name="sign-out" size={30} color="#000" />
        </TouchableOpacity>

        {/* Кнопка адреса */}
        <TouchableOpacity onPress={() => setAddressVisible(!addressVisible)} style={styles.iconButton}>
          <Icon name="map-marker" size={30} color="#000" />
        </TouchableOpacity>

        {/* Показ карты, если addressVisible */}
        {addressVisible && <AppFooter />}


        {/* Кнопка галереи */}
        <TouchableOpacity onPress={() => setGalleryVisible(true)} style={styles.iconButton}>
          <Icon name="image" size={30} color="#000" />
        </TouchableOpacity>

        {/* Модальное окно галереи */}
        <GalleryModal visible={galleryVisible} onClose={() => setGalleryVisible(false)} />
      </View>


          <SectionList
            sections={filteredStudents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <StudentItem student={item} onShowMore={handleShowMore} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
        

          {selectedStudent && (
            <Modal visible={modalVisible} animationType="slide" onRequestClose={handleCloseModal}>
              <View style={styles.modalContainer}>
                <Swiper style={styles.wrapper} showsButtons loop={false}>
                  <View style={styles.slide}>
                    <Image source={{ uri: selectedStudent.photo }} style={styles.photoLarge} />
                    <Text style={styles.nameLarge}>
                      {selectedStudent.lastName} {selectedStudent.firstName} {selectedStudent.patronymic}
                    </Text>
                    <Text style={styles.description}>{selectedStudent.description}</Text>
                  </View>
                  <View style={styles.slide}>
                    <Text style={styles.nameLarge}>Achievements</Text>
                    <Text style={styles.description}>
                      {selectedStudent.achievements}
                    </Text>
                  </View>
                </Swiper>
                <Button title="Close" onPress={handleCloseModal} />
              </View>
            </Modal>
          )}
        </>
      ) : (
        <View style={styles.authContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
      <Toast />
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  map: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  authContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10, // Margin between buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: "row", // Размещение кнопок в строку
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  iconButton: {
    marginHorizontal: 10, // Отступы между иконками
    padding: 10,
  },
  signInButton: {
    backgroundColor: '#4CAF50', // Green for Sign In
  },
  signUpButton: {
    backgroundColor: '#2196F3', // Blue for Sign Up
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    padding: 5,
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  photoLarge: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  nameLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default App;  