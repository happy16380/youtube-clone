import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {FileSystemFileEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs/internal/Observable';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDTO } from './upload-video/VideoDTO';

@Injectable({
  providedIn: 'root'
})
export class VideoSericeService {
  

  constructor(private httpClient:HttpClient) { }
  

  uploadVideo(fileEntry:File): Observable<UploadVideoResponse> {
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);
    return this.httpClient.post<UploadVideoResponse>("http://localhost:9001/api/videos",formData);
  }

  uploadThumbnail(fileEntry:File, videoId: string): Observable<String> {
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId', videoId);
    return this.httpClient.post("http://localhost:9001/api/videos/thumbnail",formData,{
      responseType: 'text'
    });
  }

  getVideo(videoId: String): Observable<VideoDTO> {
    return this.httpClient.get<VideoDTO>("http://localhost:9001/api/videos/"+ videoId);
  }

  editVideometaData(videoDTO:VideoDTO): Observable<VideoDTO> {
    return this.httpClient.put<VideoDTO>("http://localhost:9001/api/videos",videoDTO);
  }

}
