import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
  @ViewChild('imageField') imageField: ElementRef;
  @Input() destinationControl: FormControl;
  imageData: ImageData[] = [];

  constructor(private http: HttpClient) { }
  // imageData: any;

  // constructor(private destinationControl: FormControl) { }

  // ngOnInit(): void {
  // }

  onImageSelected() {
    const file = this.imageField.nativeElement.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const b64 = reader.result;
      this.imageData.push({
        uploaded: false,
        data: b64.toString()
      });
    };
    reader.readAsDataURL(file);
  }

  onUploadImage(index: number) {
    const img = this.imageData[index].data;
    this.http
      .post(environment.imageUpload,
        { imageData: img, queryType: 'profile' })
      .subscribe((res: any) => {
        if (res.imageUrl !== undefined) {
          this.imageData[index].url = res.imageUrl;
          this.imageData[index].uploaded = true;
        }
      });
  }

  onSelectImage() {
    const event = new MouseEvent('click', { bubbles: false });
    this.imageField.nativeElement.dispatchEvent(event);
  }

  onInsertImage(index: number) {
    const imgUrl = this.imageData[index].url;
    let val = this.destinationControl.value;
    val += `<img src=${imgUrl} class="ui image">`;
    this.destinationControl.patchValue(val);
  }

  onDeleteImage(index: number) {
    if (this.imageData[index].uploaded) {
      const request = { requestType: 'delete', url: this.imageData[index].url };
      this.http.post(environment.imageUpload, request).subscribe(res => {
        this.imageData.splice(index, 1);
      });
    } else {
      this.imageData.splice(index, 1);
    }
  }
}

interface ImageData {
  data: string;
  uploaded: boolean;
  url?: string;
}
