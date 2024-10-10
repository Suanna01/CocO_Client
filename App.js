// App.js

import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import KakaoLogins from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import axios from 'axios';

// 네이버 로그인 설정
const naverConfig = {
  kConsumerKey: 'YOUR_NAVER_CLIENT_ID', // 네이버 개발자 센터에서 발급받은 Client ID
  kConsumerSecret: 'YOUR_NAVER_CLIENT_SECRET', // 네이버 개발자 센터에서 발급받은 Client Secret
  kServiceAppName: 'YOUR_NAVER_CLIENT_NAME', // 애플리케이션 이름
  kServiceAppUrlScheme: 'YOUR_NAVER_REDIRECT_SCHEME', // AndroidManifest.xml에 설정한 Redirect Scheme
};

const App = () => {
  useEffect(() => {
    // 구글 로그인 구성
    GoogleSignin.configure({
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Google API 콘솔에서 발급받은 Web 클라이언트 ID
      offlineAccess: true,
    });
  }, []);

  // 구글 로그인 처리 함수
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;

      // 백엔드에 토큰 전송
      const response = await axios.post('https://your-backend.com/api/auth/google', {
        token: idToken,
      });

      // 응답 처리 (예: 사용자 정보 저장, 토큰 저장 등)
      Alert.alert('구글 로그인 성공', `환영합니다, ${response.data.name}!`);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('로그인 취소', '구글 로그인이 취소되었습니다.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('로그인 중', '구글 로그인이 진행 중입니다.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('서비스 불가', 'Google Play Services가 사용 불가능합니다.');
      } else {
        Alert.alert('로그인 오류', '구글 로그인 중 오류가 발생했습니다.');
      }
      console.error(error);
    }
  };

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = async () => {
    try {
      const result = await KakaoLogins.login();

      if (result.accessToken) {
        // 백엔드에 토큰 전송
        const response = await axios.post('https://your-backend.com/api/auth/kakao', {
          token: result.accessToken,
        });

        // 응답 처리
        Alert.alert('카카오 로그인 성공', `환영합니다, ${response.data.name}!`);
      }
    } catch (error) {
      Alert.alert('로그인 오류', '카카오 로그인 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  // 네이버 로그인 처리 함수
  const handleNaverLogin = async () => {
    try {
      const result = await NaverLogin.login(naverConfig);

      if (result.accessToken) {
        // 백엔드에 토큰 전송
        const response = await axios.post('https://your-backend.com/api/auth/naver', {
          token: result.accessToken,
        });

        // 응답 처리
        Alert.alert('네이버 로그인 성공', `환영합니다, ${response.data.name}!`);
      }
    } catch (error) {
      Alert.alert('로그인 오류', '네이버 로그인 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>

      <View>
        <Button
          title="구글 로그인"
          onPress={handleGoogleLogin}
          color="#DB4437" // 구글의 색상
        />
        <View style={styles.spacer} />
        <Button
          title="카카오 로그인"
          onPress={handleKakaoLogin}
          color="#FEE500" // 카카오의 색상
        />
        <View style={styles.spacer} />
        <Button
          title="네이버 로그인"
          onPress={handleNaverLogin}
          color="#03C75A" // 네이버의 색상
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  spacer: {
    height: 20,
  },
});

export default App;
