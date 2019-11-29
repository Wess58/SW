import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {INotificationDTO, NotificationDTO} from '../shared/notification/notification-data.model';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {NotificationService} from '../shared/notification/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'safariway-home';

  isContacting = false;
  hasError = false;
  hasSucceeded = false;

  contactForm = this.fb.group({
    name: [''],
    email: [''],
    phone_number: [''],
    company: [''],
    comments: ['']
  });

  constructor(private fb: FormBuilder, protected notificationService: NotificationService) {
  }

  contact(){
    this.isContacting = true;
  }

  sendMail() {
    const notificationDTO = this.getNotificationDTO();
    this.subscribeToSaveResponse(this.notificationService.send(notificationDTO));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.hasSucceeded = true;
  }

  protected onSaveError() {
    this.hasError = true;
  }

  private getNotificationDTO(): INotificationDTO {
    return {
      ...new NotificationDTO(),
      messageType: 'EMAIL',
      subject: 'Safariway Inquiry',
      message: this.createMessage(),
      referenceId: null,
      isHtml: 'true'
    };
  }

  private createMessage(): string {
    return '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '    <title>Safariway Inquiry</title>\n' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n' +
      '</head>' +
      '<body>\n' +
      '    <p>Dear Sales Team,</p>\n' +
      '    <p>Name: ' + this.contactForm.get(['name']).value + '</p>\n' +
      '    <p>Email Address: ' + this.contactForm.get(['email']).value + '</p>\n' +
      '    <p>Phone Number: ' + this.contactForm.get(['phone_number']).value + '</p>\n' +
      '    <p>Company: ' + this.contactForm.get(['company']).value + '</p>\n' +
      '    <p>Product: Safariway' +
      '    <p>Comments: ' + this.contactForm.get(['comments']).value + '</p>\n' +
      '    <p>\n' +
      '        <span>Regards,</span>\n' +
      '        <br />\n' +
      '        <em>Sales Team.</em>\n' +
      '    </p>\n' +
      '</body>' +
      '</html>';
  }
}
