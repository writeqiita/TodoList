package com.example.todo.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        // バックエンド側の全てのURLに対して、CORS（クロスオリジンリクエスト）設定を適用する
        registry.addMapping("/**")
            // フロントエンドのURL
            .allowedOrigins("http://localhost:3000")
            //　使用するHTTPメソッド
            .allowedMethods("GET","POST","PUT","DELETE","PATCH") 
    }
}
