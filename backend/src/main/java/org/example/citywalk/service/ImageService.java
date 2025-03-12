package org.example.citywalk.service;

import org.example.citywalk.model.Image;
import org.example.citywalk.repository.ImageRepository;
import org.example.citywalk.utils.Debug;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

    private final ImageRepository imageRepository;
    private final Debug console = new Debug();

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Image> getAllImages() {
        /*DEBUG*/
        console.log("ImageService.getAllImages | DEBUG: start");
        List<Image> images = imageRepository.findAll();
        /*DEBUG*/
        if (images.isEmpty()) console.log("ImageService.getAllImages | ERROR: No images found");
        if (images.isEmpty()) return null;
        /*DEBUG*/
        console.loop(images, "ImageService.getAllImages | DEBUG: end | List of images:");
        return images;
    }

    public Image getImageById(Long id) {
        /*DEBUG*/
        console.log("ImageService.getImageById | DEBUG: start | id: " + id);
        Image image = imageRepository.findById(id).orElse(null);
        /*DEBUG*/
        if (image == null) console.log("ImageService.getImageById | ERROR: No image found");
        if (image == null) return null;
        /*DEBUG*/
        console.log("ImageService.getImageById | DEBUG: end | id: " + id + " | data: " + image);
        return image;
    }

    public Image createImage(Image image) {
        /*DEBUG*/
        console.log("ImageService.createImage | DEBUG: start | data: " + image.toString());
        Image createdImage = imageRepository.save(image);
        /*DEBUG*/
        if (createdImage.getId() == null) console.log("ImageService.createImage | ERROR: Failed to create new image");
        if (createdImage.getId() == null) return null;
        /*DEBUG*/
        console.log("ImageService.createImage | DEBUG: end | data: " + createdImage);
        return createdImage;
    }

    public Image updateImage(Long id, Image image) {
        /*DEBUG*/
        console.log("ImageService.updateImage | DEBUG: start | id: " + id + " | data: " + image.toString());
        Image updatedImage = imageRepository.findById(id).orElse(null);
        /*DEBUG*/
        if (updatedImage == null) console.log("ImageService.updateImage | ERROR: No image found");
        if (updatedImage == null) return null;
        /*DEBUG*/
        console.log("ImageService.updateImage | DEBUG: end - before updating | id: " + id + " | data: " + updatedImage);
        updatedImage.setName(image.getName());
        updatedImage.setUrl(image.getUrl());
        imageRepository.save(updatedImage);
        /*DEBUG*/
        console.log("ImageService.updateImage | DEBUG: end - after updating | id: " + id + " | data: " + updatedImage);
        return updatedImage;
    }

    public boolean deleteImage(Long id) {
        /*DEBUG*/
        console.log("ImageService.deleteImage | DEBUG: start | id: " + id);
        Image deletedImage = imageRepository.findById(id).orElse(null);
        /*DEBUG*/
        if (deletedImage == null) console.log("ImageService.deleteImage | ERROR: No image found");
        if (deletedImage == null) return false;
        /*DEBUG*/
        console.log("ImageService.deleteImage | DEBUG: end | id: " + id + " | data: " + deletedImage);
        imageRepository.delete(deletedImage);
        return true;
    }

    public List<Image> getImageByBuildingId(Long id) {
        /*DEBUG*/
        console.log("ImageService.getImageByBuildingId | DEBUG: start | id: " + id);
        List<Image> imagesInBuilding = imageRepository.findAllByBuildingId(id);
        /*DEBUG*/
        if (imagesInBuilding.isEmpty()) console.log("ImageService.getImageByBuildingId | ERROR: No image found");
        if (imagesInBuilding.isEmpty()) return null;
        /*DEBUG*/
        console.loop(imagesInBuilding, "ImageService.getImageByBuildingId | DEBUG: end | List of image in building:");
        return imagesInBuilding;
    }
}
