import config from '../config.js'
import { Client, ID, Databases, Storage } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
    }){
         const safeSlug = slug
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-");

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                safeSlug, //  document id
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
        async updatePost(slug,{
        title,
        content,
        featuredImage,
        status,
        userId,
        }){
            try {
                return await this.databases.updateDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug,

                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                )
            } catch (error) {
                console.log("Appwrite service :: updatePost :: error", error);
                
            }
        } 
        async deletePost(slug){
            try {
                await this.databases.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug,
                )
                return true;
            } catch (error) {
                console.log("Appwrite service :: deletePost :: error", error);
                return false;
            }
        }
        async getPost(slug){
            try {
                return await this.databases.getDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug,
                )
            } catch (error) {
                console.log("Appwrite service :: getPost :: error", error);
                return false;
                
            }
        }
    }


const service = new Service();
export default service;