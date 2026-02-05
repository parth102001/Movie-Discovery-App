import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

/* build-ref:delta */

export default function useReviewUpload() {
  const [image, setImage] = useState<any>(null);
  const [review, setReview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadReview = async () => {
    if (!review.trim()) {
      Alert.alert("Validation", "Please write a review");
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("review", review);

    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: "review.jpg",
        type: "image/jpeg",
      } as any);
    }

    try {
      await axios.post("https://httpbin.org/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });

      Alert.alert("Success", "Review uploaded successfully!");
      setReview("");
      setImage(null);
    } catch {
      Alert.alert("Error", "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return {
    image,
    review,
    uploading,
    progress,
    setReview,
    pickImage,
    uploadReview,
  };
}
