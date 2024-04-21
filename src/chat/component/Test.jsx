import React from 'react';

class DownloadButton extends React.Component {
  handleDownload = () => {
    // Specify the file URL
    const fileUrl = "images/Foli.png";
    
    // Create a temporary anchor element
    const tempAnchor = document.createElement("a");
    tempAnchor.href = fileUrl;
    tempAnchor.download = "Foli.png"; // Specify the file name here
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);
  }

  render() {
    return (
      <button onClick={this.handleDownload}>Download File</button>
    );
  }
}

export default DownloadButton;
