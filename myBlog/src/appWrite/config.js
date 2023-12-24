import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(config.myBlogURL)
        this.client.setProject(config.myBlogProjectId);
        //this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.myBlogDatabaseId,
                config.myBlogCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.myBlogDatabaseId,
                config.myBlogCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log(error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.myBlogDatabaseId,
                config.myBlogCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            await this.databases.getDocument(
                config.myBlogDatabaseId,
                config.myBlogCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.myBlogDatabaseId,
                config.myBlogCollectionId,
                queries,
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            await this.bucket.createFile(
                config.myBlogBucketId,
                ID.unique(),
                file
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.myBlogBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.myBlogBucketId,
            fileId
        )
    }
}


const service = new Service();

export default service;