import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ScanStreamService } from './scan-stream.service';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ScanGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients = new Set<string>();

  constructor(
    @Inject(forwardRef(() => ScanStreamService))
    private readonly streamService: ScanStreamService
) {}

  handleConnection(client: Socket) {
    this.clients.add(client.id);
    console.log('WS client connected:', client.id, 'total:', this.clients.size);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    console.log('WS client disconnected:', client.id, 'total:', this.clients.size);

    if (this.clients.size === 0) {
      this.streamService.stop();
    }
  }

  emitScanUpdate(data: any) {
    this.server.emit('scan-update', data);
  }
}
