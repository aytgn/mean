import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnDestroy, OnInit {
  $addPost: Subscription = new Subscription();
  private mode = 'create';
  private postId: string | null = null;
  private post: Post | null = null;
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}
  //LIFECYCLE
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (!paramMap.has('postId')) return;
      this.mode = 'edit';
      this.postId = paramMap.get('PostId');
      //GET POST BY ID SERVICE
    });
  }
  ngOnDestroy(): void {
    this.$addPost.unsubscribe();
  }
  //METHODS
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) return;
    const title = postForm.value.title;
    const content = postForm.value.content;
    this.$addPost = this.postsService.addPost(title, content).subscribe(() => {
      postForm.resetForm();
      this.postsService.updatePosts();
    });
  }
}
