import { Component, OnInit } from '@angular/core';
import { Video } from '../../common/video';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
//import { CartService } from 'src/app/services/cart.service';
//import { CartItem } from 'src/app/common/cart-item';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-book-list',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-list.component.css'],
  providers: [NgbPaginationConfig]
})
export class VideoListComponent implements OnInit {

  videos: Video[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //properties for client side paging

  //pageOfItems: Array<Video>;
  //pageSize: number = 5;

  //new properties for server-side paging
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  constructor(private _bookService: VideoService,
              private _activatedRoute: ActivatedRoute,
             private sanitizer: DomSanitizer,
              config: NgbPaginationConfig) {
                config.boundaryLinks = true;
                config.maxSize = 3;


              }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listVideos();
    })
  }
  getEmbedUrl( item){
    return  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/'+item.imageUrl);
  }

  /*client side paging
  pageClick(pageOfItems: Array<Book>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  } */

  listVideos(){
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      //do search work
      this.handleSearchVideos();
    }else {
      //display books based on category
      this.handleListVideos();
    }
  }

  handleListVideos(){
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }else {
      this.currentCategoryId = 1;
    }

    //setting up the page number to 1
    //if user navigates to other category
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log('current page size', this.currentPage-1);

    this._bookService.getVideosPaginate(this.currentCategoryId,
                                        this.currentPage - 1,
                                        this.pageSize)
                                        .subscribe(this.processResult());
  }

  handleSearchVideos(){
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchVideos(keyword,
                                  this.currentPage - 1,
                                  this.pageSize)
                                  .subscribe(this.processResult());
  }

  //client side paging and server side paging
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listVideos();
  }

  processResult(){
    return data => {
      this.videos = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

  // addToCart(book: Video){
  //   console.log(`book name: ${book.name}, and price: ${book.unitPrice}`);
  //   const cartItem = new CartItem(book);
  //   this._cartService.addToCart(cartItem);
  // }

}
