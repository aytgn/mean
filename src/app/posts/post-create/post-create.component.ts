import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnDestroy {
  $addPost: Subscription = new Subscription();

  constructor(public postsService: PostsService) {}

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) return;
    const title = postForm.value.title;
    const content = postForm.value.content;

    this.$addPost = this.postsService.addPost(title, content).subscribe(() => {
      postForm.resetForm();
      this.postsService.updatePosts();
    });
  }
  ngOnDestroy(): void {
    this.$addPost.unsubscribe();
  }
}
