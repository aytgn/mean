import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent {
 enteredContent = ''
 enteredTitle = ''
 newPost={}

 @Output() postCreated= new EventEmitter
  onPostSubmit() {
    this.newPost={title:this.enteredTitle,content:this.enteredContent}
    this.postCreated.emit(this.newPost)
  }
}
