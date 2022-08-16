import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  $getPosts = new Subject<Post[]>();
  $getPost = new Subject<any>();
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
            file: post.file,
          }));
          return { message, posts };
        })
      )
      .subscribe((data) => {
        this.$getPosts.next(data.posts);
      });
  }
  addPost(title: string, content: string, uploadedImage: File) {
    console.log('uploaded image: ', uploadedImage);
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', uploadedImage, 'image');
    return this.http.post('http://localhost:3000/api/posts', postData);
  }
  deletePost(postId: string) {
    return this.http.delete(`http://localhost:3000/api/posts/${postId}`);
  }
  editPost(postId: string, title: string, content: string) {
    const postToEdit = { title, content };
    return this.http.put(
      `http://localhost:3000/api/posts/${postId}`,
      postToEdit
    );
  }
  getPostById(postId: string | null) {
    if (!postId) return;
    this.http
      .get(`http://localhost:3000/api/posts/${postId}`)
      .pipe(
        first(),
        map((data: any) => {
          const message = data.message;
          const fetchedPost = data.post;
          const post: Post = {
            id: fetchedPost._id,
            title: fetchedPost.title,
            content: fetchedPost.content,
            file: fetchedPost.file,
          };
          return post;
        })
      )
      .subscribe((post) => {
        this.$getPost.next(post);
      });
  }
}
