import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Appointment } from './appointment.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AppointmentService {

    private resourceUrl = SERVER_API_URL + 'api/appointments';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(appointment: Appointment): Observable<Appointment> {
        const copy = this.convert(appointment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(appointment: Appointment): Observable<Appointment> {
        const copy = this.convert(appointment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Appointment> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.startTime = this.dateUtils
            .convertLocalDateFromServer(entity.startTime);
        entity.endTime = this.dateUtils
            .convertLocalDateFromServer(entity.endTime);
    }

    private convert(appointment: Appointment): Appointment {
        const copy: Appointment = Object.assign({}, appointment);
        copy.startTime = this.dateUtils
            .convertLocalDateToServer(appointment.startTime);
        copy.endTime = this.dateUtils
            .convertLocalDateToServer(appointment.endTime);
        return copy;
    }
}
