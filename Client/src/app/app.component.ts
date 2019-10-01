import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.connect();
  }

  connect() {
    const divMessages: HTMLDivElement = document.querySelector('#divMessages');
    const tbMessage: HTMLInputElement = document.querySelector('#tbMessage');
    const btnSend: HTMLButtonElement = document.querySelector('#btnSend');
    const username = new Date().getTime();

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44330/hub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    connection.on('messageReceived', (test: string, message: string) => {
      const m = document.createElement('div');

      m.innerHTML = `<div class="message-author">${test}</div><div>${message}</div>`;

      divMessages.appendChild(m);
      divMessages.scrollTop = divMessages.scrollHeight;
    });

    connection.start().catch(err => document.write(err));

    tbMessage.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.code === '13' || e.keyCode === 13) {
        send();
      }
    });

    btnSend.addEventListener('click', send);

    function send() {
      connection
        .send('newMessage', username, tbMessage.value)
        .then(() => (tbMessage.value = ''));
    }
  }
}
