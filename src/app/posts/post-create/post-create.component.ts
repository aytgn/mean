import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  $getPost: Subscription = new Subscription();
  $editPost: Subscription = new Subscription();
  mode = 'create';
  post: Post | null = null;
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  //LIFECYCLE
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (!paramMap.has('postId')) return;
      this.mode = 'edit';
      this.$getPost = this.postsService.$getPost.subscribe((post) => {
        this.post = post;
      });
      const param = paramMap.get('postId');
      this.postsService.getPostById(param);
    });
  }
  ngOnDestroy(): void {
    this.$addPost.unsubscribe();
    this.$getPost.unsubscribe();
    this.$editPost.unsubscribe();
  }
  //METHODS
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) return;
    const title: string = postForm.value.title;
    const content: string = postForm.value.content;
    //if edit mode
    if ((this.mode = 'edit')) {
      if (this.post) {
        this.$editPost = this.postsService
          .editPost(this.post.id, title, content)
          .subscribe(() => {
            postForm.resetForm();
            this.postsService.updatePosts();
            this.router.navigate(['/']);
          });
        return;
      }
    }
    //if create mode
    this.$addPost = this.postsService.addPost(title, content).subscribe(() => {
      postForm.resetForm();
      this.postsService.updatePosts();
      this.router.navigate(['/']);
    });
  }
}
