import { Component, OnInit } from '@angular/core';
interface Comment {
  text: string;
}

interface Post {
  text: string;
  likes: number;
  comments: Comment[];
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent  {

  posts: Post[] = [];
  newPostText = '';
  newCommentText = '';

  createPost(): void {
    if (this.newPostText) {
      const post: Post = {
        text: this.newPostText,
        likes: 0,
        comments: [],
      };
      this.posts.push(post);
      this.newPostText = '';
    }
  }

  likePost(post: Post): void {
    post.likes++;
  }

  commentPost(post: Post): void {
    // Implement your logic for displaying comments or navigating to a separate comment page.
    console.log('Comments for post:', post.comments);
  }

  addComment(post: Post): void {
    if (this.newCommentText) {
      const comment: Comment = {
        text: this.newCommentText,
      };
      post.comments.push(comment);
      this.newCommentText = '';
    }
  }
}