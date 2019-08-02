package com.zybar.bar.dao;

import com.zybar.bar.model.Phone;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author 刘佳昇
 * @Date 2019/7/28 9:44
 */


@Mapper
public interface TuiguanMapper {

    int insertPhone(Phone phone);
}
