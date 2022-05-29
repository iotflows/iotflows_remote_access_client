/**
 * Copyright 2021 IoTFlows Inc. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable laconsole.w or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 **/

let tls = require('tls')
let SFTPClient = require('ssh2-sftp-client')

class iotflows_remote_access_client {

  constructor({host, host_port = 443, device_uuid, device_port = 22, device_username, device_password, device_privateKey}) 
  {            
      this.host = host
      this.host_port = host_port
      this.server_name = `${device_uuid}.${host}.ssh`
      this.server_port = device_port
      this.server_username = device_username
      this.server_password = device_password      
      this.server_privateKey = device_privateKey
  }
  
  sftp_with_ssl_proxy() {
    var self = this;
    let options = {    
      host: self.host, 
      port: self.host_port, 
      servername: self.server_name,    
      // Necessary because the server's cert isn't for "localhost".    
      checkServerIdentity: () => { return null } 
    }
    
    return new Promise(function(resolve, reject) {
      let TLSSocketConnection = tls.connect(options, function() {
        if (TLSSocketConnection.authorized) 
        {
          // console.log("Connection authorized by a Certificate Authority.");
          const sftp = new SFTPClient();
          let sftp_options = {
            server_name: self.server_name,
            server_port: self.server_port,
            sock: TLSSocketConnection,
            username: self.server_username,
            password: self.server_password,
            privateKey: self.server_privateKey
          }          
          sftp.connect(sftp_options).then(() => {
            resolve(sftp)
          })
          .catch(err => {          
            // console.log(err, 'catch error');   
            reject(err);
          });
          sftp.on('error', err => {
            reject(err);
          })
        } 
        else {
          // console.log(`Connection not authorized: ${TLSSocketConnection.authorizationError}`)
          reject(`Connection not authorized: ${TLSSocketConnection.authorizationError}`);
        }    
      })
      
      TLSSocketConnection.on('error', err => {
        reject(err);
      })

    });
  }
}
module.exports = iotflows_remote_access_client