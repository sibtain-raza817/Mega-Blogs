import config from "../config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create Post
    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
    }) {
        try {
            const safeSlug = slug
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^\w\-]+/g, "");

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                safeSlug,
                {
                    title,
                    slug: safeSlug,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    // Update Post
    async updatePost(
        slug,
        { title, content, featuredImage, status }
    ) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    // Delete Post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Get Single Post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Get All Active Posts
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // Upload File
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    // Delete File
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // File Preview
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;






// import config from '../config.js'
// import { Client, ID, Databases, Storage, Query } from 'appwrite'

// export class Service {
//     client = new Client();
//     databases;
//     bucket;

//     constructor() {
//         this.client
//             .setEndpoint(config.appwriteUrl)
//             .setProject(config.appwriteProjectId);
//         this.databases = new Databases(this.client)
//         this.bucket = new Storage(this.client)
//     }
//     async createPost({
//         title,
//         slug,
//         content,
//         featuredImage,
//         status,
//         userId,
//     }) {
//         const safeSlug = slug
//             .toLowerCase()
//             .trim()
//             .replace(/\s+/g, "-");

//         return await this.databases.createDocument(
//             config.appwriteDatabaseId,
//             config.appwriteCollectionId,
//             safeSlug, //  document id
//             {
//                 title,
//                 slug: safeSlug,
//                 content,
//                 featuredImage,
//                 status,
//                 userId,
//             }
//         );
//     } catch(error) {
//         console.log("Appwrite service :: createPost :: error", error);
//         throw error;
//     }
//     async updatePost(slug, {
//         title,
//         content,
//         featuredImage,
//         status,
//         userId,
//     }) {
//         try {
//             return await this.databases.updateDocument(
//                 config.appwriteDatabaseId,
//                 config.appwriteCollectionId,
//                 slug,

//                 {
//                     title,
//                     content,
//                     featuredImage,
//                     status
//                 }
//             )
//         } catch (error) {
//             console.log("Appwrite service :: updatePost :: error", error);

//         }
//     }
//     async deletePost(slug) {
//         try {
//             await this.databases.deleteDocument(
//                 config.appwriteDatabaseId,
//                 config.appwriteCollectionId,
//                 slug,
//             )
//             return true;
//         } catch (error) {
//             console.log("Appwrite service :: deletePost :: error", error);
//             return false;
//         }
//     }
//     async getPost(slug) {
//         try {
//             return await this.databases.getDocument(
//                 config.appwriteDatabaseId,
//                 config.appwriteCollectionId,
//                 slug,
//             )
//         } catch (error) {
//             console.log("Appwrite service :: getPost :: error", error);
//             return false;

//         }
//     }
//     async getPosts(queries = [Query.equal("status", "active")]) {
//         try {
//             return await this.databases.listDocuments(
//                 config.appwriteCollectionId,
//                 config.appwriteDatabaseId,
//                 queries,
//             )
//         } catch (error) {
//             console.log("Appwrite service :: getPost ::error", error);

//         }
//     }

//     //File upload file

//     async uploadFile(file) {
//         try {
//             return await this.bucket.createFile(
//                 conf.appwriteBucketId,
//                 ID.unique(),
//                 file
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: uploadFile :: error", error);
//             return false
//         }
//     }

//     async deleteFile(fileId) {
//         try {
//             await this.bucket.deleteFile(
//                 conf.appwriteBucketId,
//                 fileId
//             )
//             return true
//         } catch (error) {
//             console.log("Appwrite serive :: deleteFile :: error", error);
//             return false
//         }
//     }

//     getFilePreview(fileId) {
//         return this.bucket.getFilePreview(
//             conf.appwriteBucketId,
//             fileId
//         )
//     }
// }


// const service = new Service();
// export default service;