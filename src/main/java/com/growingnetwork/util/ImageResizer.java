package com.growingnetwork.util;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;

/**
 * Class for resizing images. Not used now. Instead – "imgscalr-lib" library {@see pom.xml}
 */
public class ImageResizer {
    
    public static BufferedImage resize(BufferedImage imageToResize, int width, int height) {
        float dx = ((float) width) / imageToResize.getWidth();
        float dy = ((float) height) / imageToResize.getHeight();
        
        int genX, genY;
        int startX, startY;
        
        if (imageToResize.getWidth() <= width && imageToResize.getHeight() <= height) {
            genX = imageToResize.getWidth();
            genY = imageToResize.getHeight();
        } else {
            if (dx <= dy) {
                genX = width;
                genY = (int) (dx * imageToResize.getHeight());
            } else {
                genX = (int) (dy * imageToResize.getWidth());
                genY = height;
            }
        }
        
        startX = (width - genX) / 2;
        startY = (height - genY) / 2;
        
        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D graphics2D = null;
        
        try {
            graphics2D = bufferedImage.createGraphics();
            graphics2D.fillRect(0, 0, width, height);
            graphics2D.drawImage(imageToResize.getScaledInstance(genX, genY, Image.SCALE_DEFAULT), startX, startY, null);
        } finally {
            if (graphics2D != null) {
                graphics2D.dispose();
            }
        }
        
        return bufferedImage;
    }
}
