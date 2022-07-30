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
  posts: Post[] = [];
  $getPosts = new Subscription();
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.$getPosts.subscribe((posts) => {
      console.log('change detected');
      this.posts = posts;
      console.log(posts.length);
    });

    this.postsService.updatePosts();
  }
  ngOnDestroy() {
    this.$getPosts.unsubscribe();
  }

  onDeletePost(postId: string) {}
}
