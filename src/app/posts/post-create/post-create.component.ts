import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  newPost: Post = { title: '', content: '' };

  @Output() postCreated = new EventEmitter<Post>();
  onPostSubmit() {
    this.newPost = { title: this.enteredTitle, content: this.enteredContent };
    this.postCreated.emit(this.newPost);
  }
}
