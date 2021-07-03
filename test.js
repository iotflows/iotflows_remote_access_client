IoTFlowsRemoteAccessClient = require('./iotflows-remote-access-client');

// ssh pi@dev_056ca154c8fbc52eaf32ab0e9ef81f60.s2.devices.iotflows.com.ssh -o ProxyCommand="openssl s_client -quiet -servername dev_056ca154c8fbc52eaf32ab0e9ef81f60.s2.devices.iotflows.com.ssh -connect s2.devices.iotflows.com:443" 
let iotflows_remote_access = new IoTFlowsRemoteAccessClient({
  host: 's2.devices.iotflows.com',
  device_uuid: 'dev_056ca154c8fbc52eaf32ab0e9ef81f60', 
  device_username: 'pi', 
  device_password: 'raspberry'
})

iotflows_remote_access.sftp_with_ssl_proxy()
.then(sftp => {
  sftp.list('/etc/').then(data => {
    console.log(data)
    sftp.end()
  })
  .catch(err => console.log(err))
})
.catch(err => console.log(err))



