import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoService } from './services/video.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VideoCategoryComponent } from './components/video-category/video-category.component';
import { SearchComponent } from './components/search/search.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
//import { CartStatusComponent } from './components/cart-status/cart-status.component';
//import { CartDetailsComponent } from './components/cart-details/cart-details.component';
//import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { DomSanitizer } from '@angular/platform-browser';
//client side paging
//import { JwPaginationComponent } from 'jw-angular-pagination';


const routes: Routes = [
  //{path: 'checkout', component: CheckoutComponent},
 // {path: 'cart-details', component: CartDetailsComponent},
  {path: 'videos/:id', component: VideoDetailsComponent},
  {path: 'videos', component: VideoListComponent},
  {path: 'search/:keyword', component: VideoListComponent},
  {path: 'category/:id', component: VideoListComponent},
  {path: '', redirectTo: '/videos', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    VideoListComponent,
    PageNotFoundComponent,
    VideoCategoryComponent,
    SearchComponent,
    VideoDetailsComponent,
    //CartStatusComponent,
    //CartDetailsComponent,
   // CheckoutComponent
    //client side paging
    //JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    VideoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
