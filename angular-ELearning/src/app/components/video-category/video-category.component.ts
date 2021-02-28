import { Component, OnInit } from '@angular/core';
import { VideoCategory } from '../../common/video-category';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-book-category',
  templateUrl: './video-category.component.html',
  styleUrls: ['./video-category.component.css']
})
export class VideoCategoryComponent implements OnInit {

  videoCategories: VideoCategory[];

  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this.listVideoCategories();
  }

  listVideoCategories(){
    this._videoService.getVideoCategories().subscribe(
      data => this.videoCategories = data
    );
  }

}
