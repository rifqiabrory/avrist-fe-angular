import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"],
})
export class PreviewComponent implements OnInit {
  @Input() title: string;
  @Input() image: any;
  @Input() btnCloseText: string;

  constructor(public _modal: NgbActiveModal) {}

  ngOnInit() {}

  onClose() {
    this._modal.close();
  }

  onDownload(image) {
    let a = document.createElement("a");
    let src = `data:image/png;base64,${image}`;
    a.setAttribute("target", "_blank");
    a.target = "src";
    a.href = src;
    a.download = `Img-${Date.now()}.jpeg`;
    a.click();
  }
}
