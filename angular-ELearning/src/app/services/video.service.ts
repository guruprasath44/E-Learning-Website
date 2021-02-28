import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video} from '../common/video';
import { VideoCategory } from '../common/video-category';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  private categoryUrl = "http://localhost:8080/api/v1/book-category";

  constructor(private httpClient: HttpClient) { }

  getVideos(theCategoryId: number): Observable<Video[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.getVideosList(searchUrl);
  }

  getVideosPaginate(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseVideos>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseVideos>(searchUrl);
  }

  getVideoCategories(): Observable<VideoCategory[]>{
    return this.httpClient.get<GetResponseVideoCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCateogry)
    );
  }

  searchVideos(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseVideos>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    //return this.getBooksList(searchUrl);
    return this.httpClient.get<GetResponseVideos>(searchUrl);
  }

  private getVideosList(searchUrl: string): Observable<Video[]> {
    return this.httpClient.get<GetResponseVideos>(searchUrl).pipe(
      map(response => response._embedded.videos)
    );
  }

  get(bookId: number): Observable<Video> {
    const videoDetailsUrl = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Video>(videoDetailsUrl);
  }
}

interface GetResponseVideos{
  _embedded: {
    videos: Video[];
  },
  page: {
    //cureent page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages: number,
    //current page
    number: number
  }
}

interface GetResponseVideoCategory{
  _embedded: {
    bookCateogry: VideoCategory[];
  }
}
