# JavaScript IoTFlows Remote Access Client

https://iotflows.com

Javascript IoTFlow Remote Access Client for remote SSL SFTP from client side

This application allows your webapp to securely transfer and manage files on your device behind NATs and firewalls. 

Prerequisites:
You need to have:
1) An account in [IoTFlows Console](https://console.iotflows.com)
2) [IoTFlows Remote Access](https://www.npmjs.com/package/@iotflows/iotflows-remote-access) installed on your device
3) Enabled the SSL SSH tunnel in [IoTFlows Console](https://console.iotflows.com)

## Install IoTFlow Remote Access Client

Install the IoTFlows Remote Access Client via: 
`npm install @iotflows/iotflows-remote-access-client`

## Basic Usage

Configure the client:
```javascript
IoTFlowsRemoteAccessClient = require('@iotflows/iotflows-remote-access-client');

let iotflows_remote_access = new IoTFlowsRemoteAccessClient({
  host: 'server names2.devices.iotflows.com',  
  device_uuid: 'dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
  device_username: 'username-of-device', 
  device_password: 'password-of-device'
})
```

Use a sftp command such as list the /etc/ folder:
```javascript
iotflows_remote_access.sftp_with_ssl_proxy()
.then(sftp => {
  sftp.list('/etc/').then(data => {
    console.log(data)
    sftp.end()
  })
  .catch(err => console.log(err))
})
.catch(err => console.log(err))
```

## List of Commands

This package uses the [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client) commands:

```javascript

    list(remoteFilePath: string, pattern?: string | RegExp): Promise<sftp.FileInfo[]>;

    exists(remotePath: string): Promise<false | FileInfoType>;

    stat(remotePath: string): Promise<sftp.FileStats>;

    realPath(remotePath: string): Promise<string>;

    get(
        path: string,
        dst?: string | NodeJS.WritableStream,
        options?: sftp.GetTransferOptions,
    ): Promise<string | NodeJS.WritableStream | Buffer>;

    fastGet(remoteFilePath: string, localPath: string, options?: sftp.FastGetTransferOptions): Promise<string>;

    put(
        input: string | Buffer | NodeJS.ReadableStream,
        remoteFilePath: string,
        options?: sftp.TransferOptions,
    ): Promise<string>;

    fastPut(localPath: string, remoteFilePath: string, options?: sftp.FastPutTransferOptions): Promise<string>;

    cwd(): Promise<string>;

    mkdir(remoteFilePath: string, recursive?: boolean): Promise<string>;

    rmdir(remoteFilePath: string, recursive?: boolean): Promise<string>;

    delete(remoteFilePath: string): Promise<string>;

    rename(remoteSourcePath: string, remoteDestPath: string): Promise<string>;

    chmod(remotePath: string, mode: number | string): Promise<string>;

    append(input: Buffer | NodeJS.ReadableStream, remotePath: string, options?: sftp.TransferOptions): Promise<string>;

    uploadDir(srcDir: string, destDir: string): Promise<string>;

    downloadDir(srcDir: string, destDir: string): Promise<string>;

    end(): Promise<void>;

    on(event: string, callback: (...args: any[]) => void): void;

    removeListener(event: string, callback: (...args: any[]) => void): void;

    posixRename(fromPath: string, toPath: string): Promise<string>;

```

