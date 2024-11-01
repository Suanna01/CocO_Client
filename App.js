// App.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// 백엔드 API 요청을 처리하는 함수 예시 (fetch 또는 axios 사용)
const sendLoginRequest = async (provider) => {
  try {
    const response = await fetch(`https://your-backend-url.com/auth/${provider}`, {
      method: 'GET', // 실제로는 POST일 수 있음. 필요에 따라 변경
      headers: {
        'Content-Type': 'application/json',
      },
      // 필요에 따라 body에 데이터를 추가할 수도 있습니다.
    });

    const data = await response.json();

    if (response.ok) {
      // 로그인 성공
      console.log(`${provider} 로그인 성공:`, data);
      Alert.alert(`${provider} 로그인 성공`);
    } else {
      // 로그인 실패 처리
      console.log(`${provider} 로그인 실패:`, data);
      Alert.alert(`${provider} 로그인 실패`, data.message);
    }
  } catch (error) {
    console.error(`${provider} 로그인 요청 중 오류 발생:`, error);
    Alert.alert(`${provider} 로그인 요청 중 오류 발생`, error.message);
  }
};

const App = () => {
  const handleGoogleLogin = () => {
    sendLoginRequest('google'); // Google 로그인 요청
  };

  const handleKakaoLogin = () => {
    sendLoginRequest('kakao'); // Kakao 로그인 요청
  };

  const handleNaverLogin = () => {
    sendLoginRequest('naver'); // Naver 로그인 요청
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profee</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <Text style={styles.buttonText}>Continue with Kakao</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.naverButton} onPress={handleNaverLogin}>
        <Text style={styles.buttonText}>Continue with Naver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // 수직 가운데 정렬
    alignItems: 'center',       // 수평 가운데 정렬
    backgroundColor: '#f5f5f5', // 배경색
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,           // 텍스트 아래 여백
  },
  googleButton: {
    backgroundColor: '#4285F4', // 구글 버튼 색상
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,           // 버튼 간 간격
  },
  kakaoButton: {
    backgroundColor: '#FEE500', // 카카오 버튼 색상 (노란색)
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  naverButton: {
    backgroundColor: '#03C75A', // 네이버 버튼 색상 (초록색)
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',              // 텍스트 색상 (흰색)
    fontSize: 16,
  },
  kakaoButtonText: {
    color: '#3c1e1e',           // 카카오 텍스트 색상 (어두운 갈색)
    fontSize: 16,
  },
});

export default App;
