


async function fetchIPSData( params) {
    return request(
      "GET",
      `https://api.pinata.cloud/pinning/pinFileToIPFS`
     );
  }
