import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { _throw as ObservableThrowError } from 'rxjs/observable/throw';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ENV } from './env.config';
import { EventModel } from './models/event.model';
import { RsvpModel } from './models/rsvp.model';

@Injectable()
export class ApiService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  private get _authHeader(): string {
    return `Bearer ${this.authService.accessToken}`;
  }

   // GET list of public, future events
  getEvents$(): Observable<EventModel[]> {
    return this.http
      .get<EventModel[]>(`${ENV.BASE_API}events`)
      .pipe(
        catchError((error) => this._handleError(error))
      )
  }

  // GET all events - private and public (admin only)
    getAdminEvents$(): Observable<EventModel[]> {
      return this.http
        .get<EventModel[]>(`${ENV.BASE_API}events/admin`, {
          headers: new HttpHeaders().set('Authorization', this._authHeader)
        })
        .pipe(
          catchError((error) => this._handleError(error))
        );
    }

    // GET an event by ID (login required)
  getEventById$(id: string): Observable<EventModel> {
    return this.http
      .get<EventModel>(`${ENV.BASE_API}event/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

      // GET RSVPs by event ID (login required)
  getRsvpsByEventId$(eventId: string): Observable<RsvpModel[]> {
    return this.http
      .get<RsvpModel[]>(`${ENV.BASE_API}event/${eventId}/rsvps`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.authService.login();
    }
    return ObservableThrowError(errorMsg);
  }

  postRsvp$(rsvp: RsvpModel): Observable<RsvpModel> {
    return this.http
      .post<RsvpModel>(`${ENV.BASE_API}rsvp/new`, rsvp, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing RSVP (login required)
  editRsvp$(id: string, rsvp: RsvpModel): Observable<RsvpModel> {
    return this.http
      .put(`${ENV.BASE_API}rsvp/${id}`, rsvp, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  postEvent$(event: EventModel): Observable<EventModel> {
    return this.http
      .post<EventModel>(`${ENV.BASE_API}event/new`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing event (admin only)
  editEvent$(id: string, event: EventModel): Observable<EventModel> {
    return this.http
      .put<EventModel>(`${ENV.BASE_API}event/${id}`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // DELETE existing event and all associated RSVPs (admin only)
  deleteEvent$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}event/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

}
