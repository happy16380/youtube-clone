export interface VideoDTO{
    id: string;
    description: string;
    title: string;
    userId: string;
    likes: number;
    disLikes: number;
    tags: Array<String>;
    url: string;
    VideoStatus: string;
    viewCount: number;
    thumbnailUrl: string;
}