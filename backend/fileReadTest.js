function downloadURI(uri, name) {
    const { DownloaderHelper } = require('node-downloader-helper');

    const download = new DownloaderHelper(uri, name);
    download.on('end', () => console.log('Download Completed'))
    download.start();
  }


downloadURI("https://firebasestorage.googleapis.com/v0/b/web-board-9ad8c.appspot.com/o/5%2FHOI_2023_Group%20Activity%201-2.pdf?alt=media&token=a15d9039-3ff7-4b92-98a8-10bfa14b01d1", "./public");