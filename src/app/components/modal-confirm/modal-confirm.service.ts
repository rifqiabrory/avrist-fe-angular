import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalConfirmComponent } from "./modal-confirm.component";

@Injectable({
  providedIn: "root",
})
export class ModalConfirmService {
  constructor(private _service: NgbModal) {}

  confirm(
    title: string,
    message: string,
    btnOkText: string = "OK",
    btnCancelText: string = "Cancel",
    dialogSize: "md" | "sm" | "lg" = "md"
  ): Promise<any> {
    const modalRef = this._service.open(ModalConfirmComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
