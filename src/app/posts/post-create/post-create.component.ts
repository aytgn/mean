import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  newPost: Post = { title: '', content: '' };

  @Output() postCreated = new EventEmitter<Post>();
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) return;
    //modify newPost
    this.newPost.title = postForm.value.title;
    this.newPost.content = postForm.value.content;
    //emit current copy of newPost obj!
    this.postCreated.emit({ ...this.newPost });
    //reset form
    postForm.resetForm();
  }
}
