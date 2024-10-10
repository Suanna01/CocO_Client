package com.coco_client

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactPackage
import com.kakao.sdk.common.KakaoSdk

class GlobalApplication : Application(), ReactApplication {

    // ReactNativeHost 인스턴스 생성
    private val reactNativeHostInstance = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getJSMainModuleName(): String {
            return "index" // 주 모듈 이름을 설정하세요
        }

        override fun getPackages(): List<ReactPackage> {
            // 필요한 패키지를 여기에 추가하세요
            return listOf()
        }
    }

    // ReactApplication 인터페이스의 추상 속성을 오버라이드
    override val reactNativeHost: ReactNativeHost
        get() = reactNativeHostInstance

    override fun onCreate() {
        super.onCreate()
        KakaoSdk.init(this, "{1f042989918edb1388d78c0095d05910}") // 여기에 실제 네이티브 앱 키를 입력하세요
    }
}
