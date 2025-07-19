import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

// ozoo://main?login=success로 진입시 수행
const RedirectScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.login === "success") {
      // 로그인 성공이면 main 화면으로 이동
      router.replace("/main");
    } else {
      // 실패 등 처리 (예: 로그인 페이지로 이동)
      router.replace("/login");
    }
  }, [params]);

  return null;
};

export default RedirectScreen;
