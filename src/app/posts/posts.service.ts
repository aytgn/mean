import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  $getPosts = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  updatePosts() {
    this.http
      .get<{ message: string; posts: any[] }>('http://localhost:3000/api/posts')
      .pipe(
        first(),
        map((res) => {
          const message = res.message;
          const posts = res.posts.map((post) => ({
            id: post._id,
            title: post.title,
            content: post.content,
          }));
          return { message, posts };
        })
      )
      .subscribe((data) => {
        this.$getPosts.next(data.posts);
      });
  }
  addPost(title: string, content: string) {
    const postToAdd = { title, content };
    return this.http.post('http://localhost:3000/api/posts', postToAdd);
  }
  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }
}
