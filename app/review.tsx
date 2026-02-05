import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import useReviewUpload from "../hooks/useReviewUpload";

export default function ReviewScreen() {
  const {
    image,
    review,
    uploading,
    progress,
    setReview,
    pickImage,
    uploadReview,
  } = useReviewUpload();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Write a Review</Text>

          <TextInput
            placeholder="Write your review..."
            value={review}
            onChangeText={setReview}
            multiline
            style={styles.input}
          />

          {image && (
            <Image source={{ uri: image.uri }} style={styles.preview} />
          )}

          <Pressable style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </Pressable>

          <Pressable
            style={[styles.button, uploading && styles.disabled]}
            onPress={() => {
              Keyboard.dismiss();
              uploadReview();
            }}
            disabled={uploading}
          >
            {uploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Upload Review</Text>
            )}
          </Pressable>

          {uploading && (
            <Text style={styles.progressText}>Uploading: {progress}%</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
  },
});
