import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  getPostsOnce(): Observable<{ message: string; posts: Post[] }> {
    return this.getPosts().pipe(first());
  }
  getPosts(): Observable<{ message: string; posts: Post[] }> {
    return this.http
      .get<{ message: string; posts: any[] }>('http://localhost:3000/api/posts')
      .pipe(
        map((res) => {
          const message = res.message;
          const posts = res.posts.map((post) => ({
            id: post._id,
            title: post.title,
            content: post.content,
          }));
          return { message, posts };
        })
      );
  }
  addPost(title: string, content: string) {
    const postToAdd = { title, content };
    return this.http.post('http://localhost:3000/api/posts', postToAdd);
  }
  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }
}
