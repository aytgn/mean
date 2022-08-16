import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  isLoaded: boolean = false;
  postForm: FormGroup = new FormGroup('');
  imagePreview: string | null = null;
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  //LIFECYCLE
  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      uploadedImage: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (!paramMap.has('postId')) {
        this.isLoaded = true;
        return;
      }
      this.mode = 'edit';
      this.$getPost = this.postsService.$getPost.subscribe((post) => {
        this.post = post;
        this.postForm.patchValue({
          title: this.post?.title,
          content: this.post?.content,
          file: this.post?.file,
        });
        this.isLoaded = true;
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
  onAddPost(postForm: FormGroup) {
    if (postForm.invalid) return;
    const title: string = postForm.value.title;
    const content: string = postForm.value.content;
    const uploadedImage: File = postForm.value.uploadedImage;
    console.log(postForm.value);
    //if edit mode
    if ((this.mode = 'edit')) {
      if (this.post) {
        this.$editPost = this.postsService
          .editPost(this.post.id, title, content)
          .subscribe(() => {
            postForm.setValue({ title: '', content: '' });
            this.postsService.updatePosts();
            this.router.navigate(['/']);
          });
        return;
      }
    }
    //if create mode
    this.$addPost = this.postsService
      .addPost(title, content, uploadedImage)
      .subscribe(() => {
        postForm.setValue({ title: '', content: '', uploadedImage: null });
        this.postsService.updatePosts();
        this.router.navigate(['/']);
      });
  }
  onFilePicked(event: Event) {
    const el = event.target as HTMLInputElement;
    console.dir(el.files);
  }
}
