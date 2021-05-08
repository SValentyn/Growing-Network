package com.growingnetwork.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.growingnetwork.exception.FileSizeException;
import com.growingnetwork.exception.IncorrectContentTypeException;
import com.growingnetwork.model.Image;
import com.growingnetwork.repository.ImageRepository;
import com.growingnetwork.util.SmartCopyBeanUtilsBean;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Configuration
@Slf4j
public class AmazonService extends AbstractCrudService<Image, Long, ImageRepository> {
    
    private final static long MAX_FILE_SIZE = 20971520L; // 20 MB 
    private final static int STANDARD_IMAGE_WIDTH_PX = 632;
    private final static int STANDARD_IMAGE_HEIGHT_PX = 400;
    private final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList("image/jpeg", "image/png", "image/svg+xml", "image/webp", "image/x-icon", "image/gif", "image/bmp", "image/tiff");
    private final List<String> ALLOWED_CONTENT_TYPES_FOR_RESIZING = Arrays.asList("image/jpeg", "image/png", "image/bmp");
    private final AmazonS3Client s3client;
    
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    
    @Autowired
    public AmazonService(ImageRepository jpaRepository, SmartCopyBeanUtilsBean beanUtilBean, AmazonS3Client s3client) {
        super(jpaRepository, beanUtilBean);
        this.s3client = s3client;
    }
    
    @Override
    public Image create(Image entity) {
        throw new UnsupportedOperationException("Images entities must be created only by uploading files.");
    }
    
    @Override
    public Image update(Image existingEntity, Image incomingEntity) {
        throw new UnsupportedOperationException("Images entities mustn't be updated.");
    }
    
    public Image uploadFile(MultipartFile multipartFile) {
        try {
            if (isAllowedFileExtension(multipartFile)) {
                if (isAllowedFileSize(multipartFile)) {
                    String fileName = generateFileName(multipartFile);
                    System.out.format("Uploading '%s' to S3 bucket '%s'...\n", fileName, bucketName);
                    uploadFileToS3bucket(fileName, multipartFile);
                    Image image = new Image();
                    image.setKey(fileName);
                    image.setSrc(s3client.getResourceUrl(bucketName, fileName));
                    return jpaRepository.save(image);
                } else {
                    throw new FileSizeException("Attempting to upload too large a file. Maximum 20 MB.");
                }
            } else {
                throw new IncorrectContentTypeException("Attempting to upload the wrong type of content. Only image types are available.");
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e.getMessage());
        }
    }
    
    private boolean isAllowedFileExtension(MultipartFile multipartFile) {
        return ALLOWED_CONTENT_TYPES.contains(multipartFile.getContentType());
    }
    
    private boolean isAllowedFileSize(MultipartFile multipartFile) {
        return multipartFile.getSize() < MAX_FILE_SIZE;
    }
    
    private String generateFileName(MultipartFile multipartFile) {
        return new Date()
                .getTime()
                + "-"
                + UUID.randomUUID().toString().substring(0, 4)
                + "." + multipartFile.getContentType();
    }
    
    private void uploadFileToS3bucket(String fileName, MultipartFile file) throws IOException {
        file = resizeImage(file);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getBytes().length);
        
        s3client.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.PublicReadWrite)
        );
    }
    
    private MultipartFile resizeImage(MultipartFile file) throws IOException {
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (ALLOWED_CONTENT_TYPES_FOR_RESIZING.contains(extension)) {
            BufferedImage image = ImageIO.read(file.getInputStream());
            image = getResizedImage(image);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ImageIO.write(image, extension, byteArrayOutputStream);
            byteArrayOutputStream.flush();
            return new MockMultipartFile(file.getName(), byteArrayOutputStream.toByteArray());
        }
        return file;
    }
    
    private BufferedImage getResizedImage(BufferedImage image) {
        if (image.getWidth() > STANDARD_IMAGE_WIDTH_PX * 2 & image.getHeight() > STANDARD_IMAGE_HEIGHT_PX * 2) {
            image = Scalr.resize(image, Scalr.Method.ULTRA_QUALITY, STANDARD_IMAGE_WIDTH_PX * 2, STANDARD_IMAGE_HEIGHT_PX * 2);
        } else if (image.getWidth() <= STANDARD_IMAGE_WIDTH_PX * 2 & image.getHeight() > STANDARD_IMAGE_HEIGHT_PX * 2) {
            image = Scalr.resize(image, Scalr.Method.ULTRA_QUALITY, image.getWidth(), (int) (STANDARD_IMAGE_HEIGHT_PX * 1.5));
        } else if (image.getWidth() > STANDARD_IMAGE_WIDTH_PX * 2 & image.getHeight() <= STANDARD_IMAGE_HEIGHT_PX * 2) {
            image = Scalr.resize(image, Scalr.Method.ULTRA_QUALITY, (int) (STANDARD_IMAGE_WIDTH_PX * 1.5), image.getHeight());
        }
        return image;
    }
    
    public Boolean deleteFileFromS3Bucket(String fileName) {
        s3client.deleteObject(bucketName, fileName);
        return !s3client.doesObjectExist(bucketName, fileName);
    }
    
}
