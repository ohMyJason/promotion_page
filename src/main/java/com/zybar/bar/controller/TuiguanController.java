package com.zybar.bar.controller;

import com.zybar.bar.model.Phone;
import com.zybar.bar.service.TuiguanService;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * @author 刘佳昇
 * @Date 2019/7/28 0:54
 */
@RestController
public class TuiguanController {

    @Autowired
    TuiguanService tuiguanService;


    public static final MediaType JSON=MediaType.get("application/json; charset=utf-8");
//    @GetMapping("/")
//    public String index(){
//        return "tuiguan";
//    }

    @GetMapping("/insertPhone")
    public void insertPhone(@RequestParam(name = "phone") String phone){
        Phone phone1 = new Phone();
        phone1.setPhone(phone);
        tuiguanService.insertPhone(phone1);
    }

    @GetMapping("/getStockData")
    @ResponseBody
    public String getStockData(@RequestParam(name = "gid") String gid){
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request =new Request.Builder()
                .url("http://web.juhe.cn:8080/finance/stock/hs?gid="+gid+"&key=2629106f715ab313f815ddf6cd448fb2")
                .build();

        try (Response response = okHttpClient.newCall(request).execute()) {
            return response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
            return "请求错误";
        }

    }
}
