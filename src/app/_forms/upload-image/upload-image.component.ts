import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  @Input() imgUrl!: string | undefined;
  @Input() imgHeight: number = 120;
  @Input() imgWidth: number = 120;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  constructor() {}

  ngOnChanges() {
    if (this.imgUrl) {
      if (this.isValidImageUrl(this.imgUrl)) {
        this.displayImage(this.imgUrl);
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file || !file.type.startsWith('image')) {
      return;
    }
    this.fileSelected.emit(file); // Gửi sự kiện với tệp đã chọn
    const reader = new FileReader();
    reader.onload = () => {
      this.displayImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  isValidImageUrl(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  displayImage(url: string) {
    this.imgUrl = url;
  }
}
