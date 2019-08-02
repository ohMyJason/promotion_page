package com.zybar.bar.service;

import com.zybar.bar.dao.TuiguanMapper;
import com.zybar.bar.model.Phone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 刘佳昇
 * @Date 2019/7/28 9:42
 */

@Service
public class TuiguanService {

    @Autowired
    TuiguanMapper tuiguanMapper;


    public int insertPhone(Phone phone) {
        int col = tuiguanMapper.insertPhone(phone);
        return col;
    }


}
