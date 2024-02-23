import { Component, EventEmitter, Input, input } from '@angular/core';
import {
  UploadFile,
  UploadInput,
  UploadOutput,
  UploaderOptions,
} from 'ngx-uploader';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css',
})
export class UploadImageComponent {
  @Input() imgHeight: number = 120;
  @Input() imgWidth: number = 120;

  imageUrl: string = ''; // URL của hình ảnh

  constructor() {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Lấy tệp đã chọn từ sự kiện

    // Nếu không có file hoặc không phải là hình ảnh, không làm gì cả
    if (!file || !file.type.startsWith('image')) {
      return;
    }

    const reader = new FileReader(); // Sử dụng FileReader để đọc tệp

    reader.onload = () => {
      this.imageUrl = reader.result as string; // Đặt URL của hình ảnh
    };

    reader.readAsDataURL(file); // Đọc dữ liệu của tệp dưới dạng URL
  }
}
