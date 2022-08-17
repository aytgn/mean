import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoaded = false;
  posts: Post[] = [];
  postImage: any = null;
  $getPosts = new Subscription();
  constructor(public postsService: PostsService) {}
  //LIFECYCLE
  ngOnInit() {
    this.$getPosts = this.postsService.$getPosts.subscribe((posts) => {
      this.posts = posts;
      this.isLoaded = true;
      this.postImage = posts[0].image.data.toString('hex');
      console.log(this.postImage);
    });
    this.postsService.updatePosts();
  }
  ngOnDestroy() {
    this.$getPosts.unsubscribe();
  }
  //METHODS
  onDeletePost(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.updatePosts();
    });
  }
}
