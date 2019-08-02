package com.zybar.bar.controller;

import com.zybar.bar.BarApplication;
import com.zybar.bar.model.Phone;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author 刘佳昇
 * @Date 2019/7/28 10:16
 */

@RunWith(SpringRunner.class)
@SpringBootTest(classes = BarApplication.class)
public class TuiguanControllerTest {

    @Autowired
    TuiguanController tuiguanController;

//    @Test
//    public void test() {
//        Phone phone = new Phone();
//        phone.setPhone("213123123");
//        tuiguanController.insertPhone(phone);
//    }
}
