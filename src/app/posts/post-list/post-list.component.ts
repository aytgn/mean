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
  private $getPosts: Subscription = new Subscription();

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.$getPosts = this.postsService.getPosts().subscribe((data) => {
      console.log(data.message);
      this.posts = data.posts;
    });
  }
  ngOnDestroy() {
    this.$getPosts.unsubscribe();
  }

  onDeletePost(postId: string) {}
}
