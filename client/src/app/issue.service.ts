import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class IssueService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }

  getIssueById(id: number) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  addIssue
    (title: string,
     responsible: string,
     severity: string,
     description: string) {
    const issue = {
      title,
      responsible,
      severity,
      description
    };
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  updateIssue
    (id: string,
     title: string,
     description: string,
     responsible: string,
     severity: string,
     status: string) {
    const issue = {
      title,
      description,
      responsible,
      severity,
      status
    };
    return this.http.put(`${this.uri}/issues/update/${id}`, issue);
  }

  deleteIssue(id: string) {
    console.log(typeof id, id);
    return this.http.delete(`${this.uri}/issues/delete/${id}`);
  }

}
