import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  public success(message: string, title?: string) {
    this.toastr.success(message, title || "Success!");
  }

  public warning(message: string, title?: string) {
    this.toastr.warning(message, title || "Warning!");
  }

  public error(message: string, title?: string) {
    this.toastr.error(message, title || "Error!");
  }

  public info(message: string, title?: string) {
    this.toastr.info(message, title || "Information!");
  }
}
