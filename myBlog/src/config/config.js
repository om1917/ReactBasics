const config = {
    myBlogURL: String(import.meta.env.VITE_ENDPOINT_URL),
    myBlogProjectId : String(import.meta.env.VITE_PROJECT_ID),
    myBlogDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    myBlogCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    myBlogBucketId: String(import.meta.env.VITE_BUCKET_ID),
}

export default config