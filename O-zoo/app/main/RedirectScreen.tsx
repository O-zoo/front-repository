import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ozoo://main?login=success로 진입시 수행
const RedirectScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const {login, token} = params;
    if (login === "success" && typeof token === "string") {
      // 로그인 성공
      AsyncStorage.setItem("kakao_access_token", token);
      console.log(`logged in, set token to ${token}`)
      router.replace({pathname: "/main", params: {token},});
    } else {
      // 실패 등 처리 (예: 로그인 페이지로 이동)
      router.replace("/login");
    }
  }, [params]);

  return null;
};

export default RedirectScreen;
