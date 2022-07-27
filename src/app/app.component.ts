import { Component, Input } from '@angular/core';
import { post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts:post[] = []

  onPostAdded(newPost:post){
    this.posts.push(newPost)
  }
}
