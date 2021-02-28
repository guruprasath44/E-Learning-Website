import { Component, OnInit } from '@angular/core';
import { Video} from 'src/app/common/video';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
//import { CartItem } from 'src/app/common/cart-item';
//import { CartService } from 'src/app/services/cart.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-book-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {

  video: Video = new Video();

  constructor(private _activatedRoute: ActivatedRoute,
              private _videoService: VideoService,private sanitizer: DomSanitizer
              ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getVideoInfo();
      }
    )
  }
  getEmbedUrl( item){
    return  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/'+item.imageUrl);
  }
  getVideoInfo(){
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');

    this._videoService.get(id).subscribe(
      data => {
        this.video = data;
      }
    );
  }

  // addToCart(){
  //   console.log(`book name: ${this.video.name}, and price: ${this.video.unitPrice}`);
  //   const cartItem = new CartItem(this.video);
  //   this._cartService.addToCart(cartItem);
  // }

}
