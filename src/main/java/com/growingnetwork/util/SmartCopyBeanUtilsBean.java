package com.growingnetwork.util;

import com.growingnetwork.model.MayAcceptNull;
import org.apache.commons.beanutils.BeanUtilsBean;

import java.lang.reflect.InvocationTargetException;

public class SmartCopyBeanUtilsBean extends BeanUtilsBean {
    
    @Override
    public void copyProperty(Object destinationObj, String name, Object value) throws IllegalAccessException, InvocationTargetException {
        boolean nullIsNotAcceptable;
        
        try {
            nullIsNotAcceptable = destinationObj.getClass().getDeclaredField(name).getAnnotation(MayAcceptNull.class) == null;
        } catch (NoSuchFieldException error) {
            throw new RuntimeException("Unable to find property in destination object");
        }
        
        if (value == null & nullIsNotAcceptable) {
            return;
        }
        
        super.copyProperty(destinationObj, name, value);
    }
    
}
