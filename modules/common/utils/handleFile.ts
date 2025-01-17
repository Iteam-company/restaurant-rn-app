import * as ImagePicker from "expo-image-picker";

const pickImageFromGallery = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const { uri, type = "image", fileName } = result.assets[0];
    return { uri, type, name: fileName || "image.jpg" };
  }
};

const handleFile = async () => {
  const file = await pickImageFromGallery();
  if (!file) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as unknown as Blob);

  return formData;
};

export { pickImageFromGallery, handleFile };
