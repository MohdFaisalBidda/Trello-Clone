import { ID, storage } from "@/appwrite"

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile("6536b8d2e71d6e41f1f9", ID.unique(), file)

    return fileUploaded;

}

export default uploadImage
