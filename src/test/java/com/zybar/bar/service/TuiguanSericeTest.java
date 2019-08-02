package com.zybar.bar.service;

import com.zybar.bar.BarApplication;
import com.zybar.bar.dao.TuiguanMapper;
import com.zybar.bar.model.Phone;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author 刘佳昇
 * @Date 2019/7/28 9:58
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BarApplication.class)
public class TuiguanSericeTest {
    @Autowired
    TuiguanMapper tuiguanMapper;

//    @Test
//    public void test(){
//        Phone phone = new Phone();
//        phone.setPhone("1123415235");
//        tuiguanMapper.insertPhone(phone);
//    }

}
