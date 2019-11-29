import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {INotificationDTO} from './notification-data.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public resourceUrl = 'https://meliora.co.ke/notification/notification.php';

  constructor(protected http: HttpClient) {
  }

  send(notificationDTO: INotificationDTO): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl, notificationDTO, {observe: 'response'});
  }
}
