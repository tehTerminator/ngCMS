import { NgModule } from '@angular/core';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ImageUploaderComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ImageUploaderComponent
    ]
})
export class AdminSharedModule { }