import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { VideoSericeService } from '../video-serice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { VideoDTO } from '../upload-video/VideoDTO';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {

  saveVideoDetailsForm : FormGroup;
  title : FormControl = new FormControl('');
  description : FormControl = new FormControl('');
  videostatus : FormControl = new FormControl('');
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: String[] = [];
  selectedFile!: File;
  selectedFileName = '';
  fileSelected = false;
  videoId = '';
  videoUrl!: string;
  thumbUrl!: string;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoSericeService,private _snackBar: MatSnackBar){
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe((data) => {
    this.videoUrl = data.url;
    this.thumbUrl = data.thumbnailUrl
   }
     
    )
    this.saveVideoDetailsForm = new FormGroup({
       title: this.title,
       description: this.description,
       videostatus: this.videostatus
    })
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: String): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: String, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }
  

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

   onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(() => {
        // show an upload success notification.
        this._snackBar.open("Thumbnail Upload Successful", "OK");
      })
   }

   saveVideo(){
    const Videometadata: VideoDTO = {
      "title": this.saveVideoDetailsForm.get("title")?.value,
      "id": this.videoId,
      "tags": this.tags,
      "description": this.saveVideoDetailsForm.get("description")?.value,
      "VideoStatus": this.saveVideoDetailsForm.get("VideoStatus")?.value,
      "thumbnailUrl": this.thumbUrl,
      "userId": '',
      "likes": 0,
      "disLikes": 0,
       "url": '',
       "viewCount": 0
    };
    this.videoService.editVideometaData(Videometadata).subscribe(
      () => {
        // show an upload success notification.
        this._snackBar.open("Video metaData saved Successful", "OK");
      }
    );


   }

}
