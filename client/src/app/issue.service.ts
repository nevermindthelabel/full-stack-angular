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

  getIssueById(id) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  addIssue(title, responsible, severity, description) {
    const issue = {
      title,
      responsible,
      severity,
      description
    };
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

}
