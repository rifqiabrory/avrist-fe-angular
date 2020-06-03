import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PreviewComponent } from "./preview.component";

@Injectable({
  providedIn: "root",
})
export class PreviewService {
  constructor(private _service: NgbModal) {}

  preview(
    title: string,
    base64: any,
    btnCloseText: string = "Close",
    dialogSize: "md" | "sm" | "lg" = "md"
  ): Promise<any> {
    const modalRef = this._service.open(PreviewComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.image = base64;
    modalRef.componentInstance.btnCloseText = btnCloseText;

    return modalRef.result;
  }
}
